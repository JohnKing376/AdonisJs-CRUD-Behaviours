import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createPostValidator, updatePostValidator } from '#validators/user_validation'
import redis from '@adonisjs/redis/services/main'

export default class UsersController {
  // This Method finds all Users in the Database
  async index({ response }: HttpContext) {
    try {
      // Redis Checking
      const dataCache = 'All_Users'
      // console.log('Checking Redis for Users')
      const cachedUsers = await redis.get(dataCache)
      // console.log(cachedUsers)
      if (cachedUsers) {
        // console.log('Outputting Users')
        response.status(200)
        return response.json(JSON.parse(cachedUsers))
      } else {
        // console.log('Fetching users from the database')
        const AllUsers = await User.all()
        // console.log(AllUsers)
        await redis.set(dataCache, JSON.stringify(AllUsers))
        response.status(200)
        return response.json(AllUsers)
      }
    } catch (error) {
      return response.status(500).send('Internal Server Error')
    }
  }
  //This Method creates new users in the database
  async store({ request, response }: HttpContext) {
    // A Validator is what is used in this method
    try {
      const payload = await request.validateUsing(createPostValidator)
      const newUser = await User.create(payload)
      const dataCache = `All_Users_${newUser.id}`
      await redis.set(dataCache, JSON.stringify(newUser), 'EX', 3600)
      return response.status(201).send(newUser)
    } catch (error) {
      if (error.messages) {
        // This is to return the Validation Error Messages
        return response.status(422).send(error.messages)
      }
      return response.status(500).send('Internal Server Error')
    }
  }
  //   This method Finds user by id
  async show({ response, params }: HttpContext) {
    try {
      const userId = params.id
      const cachedData = `All_Users_${userId}`
      const cachedUser = await redis.get(cachedData)
      if (cachedUser) {
        return response.status(200).json(JSON.parse(cachedUser))
      } else {
        const findUser = await User.findOrFail(userId)
        await redis.set(cachedData, JSON.stringify(findUser), 'EX', 3600)
        return response.status(200).send(findUser)
      }
    } catch (error) {
      // If the Row/id isn't found return User not found
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send('User Not Found')
      }
      return response.status(500).send('Internal Server Error')
    }
  }
  // This method Updates only the name of the User found by id
  async update({ params, request, response }: HttpContext) {
    try {
      const userId = params.id
      const findUser = await User.findOrFail(userId)
      const payload = await request.validateUsing(updatePostValidator)
      findUser.name = payload.name
      await findUser.save()
      const dataCache = `All_Users_${userId}`
      await redis.del(dataCache)
      const cachedUsers = 'All_Users'
      await redis.del(cachedUsers)
      return response.status(201).send(findUser)
    } catch (error) {
      if (error.messages) {
        // This is to return the Validation Error Messages
        return response.status(422).send(error.messages)
      }
      return response.status(500).send('Internal Server Error')
    }
  }
  // This method deletes the user by id
  async destroy({ params, response }: HttpContext) {
    try {
      const userId = params.id
      const deleteUser = await User.findOrFail(userId)
      await deleteUser.delete()
      console.log('Users Del')
      const cachedUser = `All_Users_${userId}`
      await redis.del(cachedUser)
      console.log('User Deleted')
      response.status(200).send({ message: 'User Deleted' })
    } catch (error) {
      response.status(404).send('Internal Server Error')
    }
  }
}
