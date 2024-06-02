# AdonisJS CRUD Behavioirs
This is a lightweight NodeJs framework used to create, read, update,and delete Users.

# Installation
Install the required Node.js/dependencies packages using npm:

```bash
npm install
```

# Running Migration
Set up the database by running the migration with:

``` bash
 node ace migration:run
```
note: i used sqlite for this very project. any other database would have lead to you changing some details in the .env file

## To Drop all pre-existing tables and run them again
We would run:

``` bash
    node ace migration:fresh
```


# Starting the Server
You can simply start up the server by running `npm run dev`

# Using the CRUD OPERATIONS
I have setup a few details... especially when creating users.

--- You can Create Users by ---
{
  "name": string,
  "surname": string,
  "attendance": boolean   
}

The rest are in the User Controllers