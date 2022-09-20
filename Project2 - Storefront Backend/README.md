# Storefron Backend Project

## Overview

### This project is an E-Commerce backend application that provides authentication, showing and creating orders

---

## Instructions:

- Connect and create database: `db-migrate up`
- Server user port 3000 and db port 5432

## Required commands to set up the project:

- npm init -y
- npm i --save-dev typescript
- npm i --save-dev ts-node
- npx tsc --init
- npm i express
- npm i dotenv
- npm i pg
- npm i -g db-migrate
- npm i --save-dev supertest
- npm i --save-dev eslint
- npm i --save-dev prettier eslint-plugin-prettier
- npm i --save-dev nodemon
- npm i --save-dev jasmine
- npm init @eslint/config
- npm add db-migrate db-migrate-pg
- npm i --save-dev jasmine-spec-reporter
- npm i --save-dev @types/node
- npm i --save-dev @types/supertest
- npm i --save-dev @typescript-eslint/parser
- npm i --save-dev @types/express
- npm i --save-dev @types/jasmine

### Or Just run `npm i`

---

## Routes:

- Authenticate routes: [post] `/register`, [post] `/login`
- User routes: [get] `/users`, [get] `/users:id`, [post] `/users`, [delete] `/users`, [put] `/users/update`
- Product routes: [get] `/products`, [get] `/products/:id`, [post] `/products`, [delete] `/products/:id`, [update] `/products/:id`
- Order routes: [get] `/orders`, [get] `/orders/:id`, [post] `orders`, [delete] `orders/:id`, [update] `orders/:id`
- Cart routes: [get] `/cart/orders`, [get] `/cart/orders/:id/products`, [post] `/cart/order`, [get] `/cart/products`, [put] `/cart/product/increment`, [put] `/cart/product/decrement`, [delete] `/cart/products`, [delete] `/cart/product`

---

## ENV variables

`POSTGRES_HOST=127.0.0.1`

`POSTGRES_DB=db`

`POSTGRES_TEST_DB=db_test`

`POSTGRES_USER=postgres`

`POSTGRES_PASSWORD=postgres`

`ENV=dev`

`BCRYPT_PASSWORD=P@$$w0rd!`

`SALT_ROUNDS=10`

`TOKEN_SECRET=EgFWD@Udacity`

---

## Database creation:

### Create users table

`CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, username VARCHAR NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, role VARCHAR NOT NULL );`

### Create products table

`CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER );`

### Create orders table

`CREATE TABLE IF NOT EXISTS orders ( id SERIAL PRIMARY KEY, status VARCHAR, user_id INTEGER REFERENCES users(id) );`

### Create order_products table

`CREATE TABLE IF NOT EXISTS order_products ( id SERIAL PRIMARY KEY, quantity INTEGER, product_id INTEGER REFERENCES products(id), order_id INTEGER REFERENCES orders(id) );`

---

## Scripts to add in package.json:

- "start": "nodemon ./src/index.ts"
- "build": "npx tsc",
- "jasmine": "jasmine",
- "test": "npm run build && npm run jasmine",
- "lint": "eslint --ext .js, .ts",
- "lint:fix": "eslint --fix --ext .js, .ts",
- "prettier": "prettier --ignore-path .prettier --config .prettierrc --write \"\*_/_.+(js|ts|json)\""

---

## changes to tsconfig.json:

- "target": "es2016",
- "lib": ["DOM", "ES6"],
- "outDir": "./build",
- "noImplicitAny": true
- "exclude": ["node_modules", "./JSBuild", "spec"]

---

Install npm dependencies: `npm i`

[optional] Format the whole src folder typescript files: `npm run prettier`

[optional] Check warnings and errors [eslint]: `npm run lint`

[optional] Build the project: `npm run build`

[optional] Run the tests: `npm run test`

Run the project: `npm run start` >> `Server listening on http://localhost:3000`

You can access the images API from : `http://localhost:3000/api/images`

You can test image resizing given the image name, width and height as query parameters through: `http://localhost:3000/api/images?filename=image1&width=300&height=300`
