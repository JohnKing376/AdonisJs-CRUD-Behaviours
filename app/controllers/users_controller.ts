import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createPostValidator, updatePostValidator } from '#validators/user_validation'

export default class UsersController {
  // This Method finds all Users in the Database
  async index({ response }: HttpContext) {
    try {
      const AllUsers = User.all()
      response.status(200)
      return AllUsers
    } catch (error) {
      return response.status(400).send('Internal Server Error')
    }
  }
  //This Method creates new users in the database
  async store({ request, response }: HttpContext) {
    // A Validator is what is used in this method
    try {
      const payload = await request.validateUsing(createPostValidator)
      const newUser = await User.create(payload)
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
      const findUser = await User.findOrFail(params.id)
      return response.status(200).send(findUser)
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
      const findUser = await User.findOrFail(params.id)
      const payload = await request.validateUsing(updatePostValidator)
      findUser.name = payload.name
      response.status(201).send(findUser)
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
      const deleteUser = await User.findOrFail(params.id)
      deleteUser.delete()
      response.status(200).send({ message: 'User Deleted' })
    } catch (error) {
      response.status(404).send('Internal Server Error')
    }
  }
}
