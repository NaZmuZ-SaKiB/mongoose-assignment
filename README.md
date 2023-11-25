# Node Express Mongoose Server With TypeScript

This is a **Node JS** backend server built using **Express Js**. Here I have used **Mongoose** as ODM Library. Also I have used **Zod** package to validate input data and show customized error messages on validation errors. All the codes in this project are written in **TypeScript**. I have utilized **Eslint** for better linting and **Prettier** for better code formating to make code readable.

## Run the project in your local mechine

### Requirements

- Node Js (Make sure you have node js installed on your mechine).
- MongoDB Compass (optional: if you want to use mongodb localy).

### Installation

1. Clone this repo:

   - `git clone https://github.com/NaZmuZ-SaKiB/mongoose-assignment.git`

2. Install necessary dependencies:
   - `cd mongoose-assignment`
   - `npm install` or `yarn`
3. Create a `.env` file in current directory and add following properties:
   - `NODE_ENV`=development
   - `PORT`= (any port number you want)
   - `DATABASE_URL`= (your database url for connection)
   - `BCRYPT_SALT_ROUNDS`=12
4. Run the development Server using following command:

   - `npm run dev` or `yarn dev`

5. To build the project run following command:

   - `npm run build` or `yarn build`

6. To run the built project run following command:
   - `npm run start` or `yarn start`

### Endpoints List

- **POST /api/users/** : Create a new user. [Data Structure of a user](#sample-data-structure-of-a-user)

- **GET /api/users** : Get the list of all users.
- **GET /api/users/:userId** : Get a single user by userId.
- **GET /api/users/:userId/orders** : Get the list of all orders of a single user by userId.
- **GET /api/users/:userId/orders/total-price** : Get the total price of all orders of a single user by userId.

- **PUT /api/users/:userId** : Update a user's information by userId.
- **PUT /api/users/:userId/orders** : Create a new order for a user by userId.

- **DELETE /api/users/:userId** : Completely delete a user document from database by userId.

### Deployment

1. Build the project first.
2. Install Vercel CLI:

   - `npm i -g vercel` or `yarn global add vercel`

3. Log in to vercel:

   - `vercel login`

4. For first time deploy run `vercel` command and select your preferred options.
5. For next deploys:
   - Build the project
   - Run : `vercel --prod`

### Sample Data structure of a user

```JSON
{
    "userId": "number",
    "username": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "password": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    },
    "orders": { //Optional Field
        "productName": "string",
        "price": "number",
        "quantity": "number"
    }
}
```
