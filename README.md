# AdonisJS CRUD Behavioirs

This is a lightweight NodeJs framework used to create, read, update,and delete Users.

# Installation

Install the required Node.js/dependencies packages using npm:

```bash
npm install
```

# Running Migration

Set up the database by running the migration with:

```bash
 node ace migration:run
```

**NOTE: I USED SQLITE FOR THIS VERY PROJECT... INCASE YOU ARE USING ANY OTHER DATABASE. PLEASE TAKE A LOOK AT THE .ENV EXAMPLE FILE TO MAKE YOUR CHANGES**

## To Drop all pre-existing tables and run them again

We would run:

```bash
    node ace migration:fresh
```

## Using Redis

Although this is not a proper way to demonstrate the power of the Redis database.
But this also helps one see the usefulness of Caching.

**NOTE: BECAUSE WINDOWS IS NOT OFFICIALLY SUPPORTED ON WINDOWS. WE NEED TO DOWNLOAD A PRECOMPLIED VERSION FROM Microsoft Open Touch**

1. To run all the redis server we use `.\redis-server.exe`
2. We can run the redis cli by running: `.\redis-cli.exe`
3. You can Flush the Redis DB by running: `FLUSHALL`

# Example of how Redis helps reduce response time

1. When we first try to get All_Users. The server checks if the redis database has the information All_Users to return our data but if doesn't
   have that information it routes to own database to withdraw the information required.

How does this help?...

**In case you are dealing with a large sum of data the response time could take longer hence that could reduce the quality of the user experience when this data takes longer to load..**

Here is a little example.
This is before our Redis Database has cached that data. Please take note of the response time...

![Img 1](My_img/Screenshot%202024-06-14%20151454.png)

It takes about 190ms to load that data...

The next time the user loads that data... Because the User has loaded that data before it is temporarily stored in redis db and hence reducing the response time and loads the data quicker

![Img_2](My_img/Screenshot%202024-06-14%20151604.png)

it is a wonder that it just takes 23ms to load that data.

# Starting the Server

You can simply start up the server by running `npm run dev`

# Using the CRUD OPERATIONS

**_I have setup a few details... especially when creating users._**

```
{
  "name": string,
  "surname": string,
  "attendance": boolean
}
```
