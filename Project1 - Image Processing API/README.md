# Image Processing API Project

## Overview
### This project fetches and resizing images
---
## Required commands to set up the project:
- npm init -y
- npm i --save-dev typescript
- npm i --save-dev ts-node
- npm i --save-dev @types/node
- npx tsc --init
- npm i --save-dev @types/jasmine
- npm i --save-dev supertest
- npm i --save-dev eslint
- npm i --save-dev prettier eslint-plugin-prettier
- npm i --save-dev nodemon 
- npm i supertest
- npm i express
- npm i jasmine
- npm i jasmine-spec-reporter
- npm i sharp

- npm i --save-dev @types/supertest
- npm i --save-dev @types/supertest
- npm i --save-dev @typescript-eslint/parser
- npm i --save-dev @types/express 
- npm i --save-dev @types/sharp
- npm init @eslint/config
---
## Scripts to add in package.json:
- "start": "nodemon ./src/index.ts"
- "build": "npx tsc",
- "jasmine": "jasmine",
- "test": "npm run build && npm run jasmine",
- "lint": "eslint --ext .js, .ts",
- "lint:fix": "eslint --fix --ext .js, .ts",
- "prettier": "prettier --ignore-path .prettier --config .prettierrc --write \"**/*.+(js|ts|json)\""
---
## changes to tsconfig.json:
- "target": "es2016",
- "lib": ["DOM", "ES6"],
- "outDir": "./JSBuild",
- "noImplicitAny": true
- "exclude": ["node_modules", "./JSBuild", "spec"]

---
## Project Structure:

├── node_modules

├── spec

│      └── support

│          └──── jasmine.json

├── src

│     ├──  tests

│     │     ├── helpers

│     │     │      └── reporter.ts

│     │     └── indexSpec.ts

│     └── index.ts

├── package-lock.json

├── package.json

└── tsconfig.json

---
### check warnings and errors [eslint]: `npm run lint`
### Format the whole src folder typescript files [prettier]: `npm run prettier`
### Build the project: `npm run build`
### Run the tests: `npm run test`
### Run the project: `npm run start`
