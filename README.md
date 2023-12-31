# Basic Express MongoDB Server

This is a simple server that uses Express and MongoDB to create a REST API.

It uses a simple authentication with password encryption / salting.

## Description

This server is a simple REST API that uses Express and MongoDB to create a database of users and items.  This is a stub
for a more complex server that can be used in other projects.

## Getting Started

### Dependencies

* Node.js
* MongoDB
* Express
* Mongoose
* Body-Parser
* Nodemon

### Installing

* Clone the repository
* Assign MongoDB connection string to the `mongoDbUri` variable in `src/index.ts`
* Run `yarn` to install dependencies
* Run `npm link typescript` to link typescript to the project
* Run `npx ts-node src/index.ts` to start the server

**Note: Use the enclosed Postman collection to test the server.**

### Create a User

* Signup a new User by sending a POST request to `http://localhost:3000/signup` with the following JSON body:
```
{
    "email": "test@test.com",
    "password": "1234"
}
```

**Note: The email must be unique.  If the email already exists in the database, the server will return a 422 error.**

### Test the User

* Test the User by sending a POST request to `http://localhost:3000/signin` with the following JSON body:
```
{
    "email": "test@test.com,
    "password": "1234"
}
```

* The server will return a JSON Web Token (JWT) that can be used to access the protected routes.
* Copy the JWT and add it to the Authorization header of the request as a `Bearer Token`.
* The protected routes are:
    * `http://localhost:3000/signin`
    * `http://localhost:3000/items`
    * `http://localhost:3000/item`
 
### Create an Item

* Create an Item by sending a POST request to `http://localhost:3000/items` with the following JSON body:
```
{
    "name": "test item",
    "description": "A great item",
    "image": "image.jgp"
}
```

* The server will return the created Item.
* The Item will be associated with the User that created it.

### Get All Items

* Get all Items by sending a GET request to `http://localhost:3000/items`.
* The server will return all Items associated with the User that created them.

### Get an Item

* Get an Item by sending a GET request to `http://localhost:3000/items/:id`.
* The server will return the Item if it is associated with the User that created it.

## Summary

This is meant to serve as boilerplate for a more complex server that can be used in other projects.  Feel free to use
or modify this code as you see fit.
