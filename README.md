# Next Trip

## Requirement

* Node 14+

## Setps to run project
* Clone this repo
* Go inside cloned folder
* Run `npm install`
* Run `npm start`
* Browser will open and you project is running on `http://localhost:3000`

## Project Architecture
* This project is made on the top of `Create React App`
* `Public` folder contains the public assets like `images`.
* On the root the is .env file which have all the secrat variables
* `Pages` folder inside `src` contain route pages
* `Component` folder inside `src` contain common components
* Component `styles` is managed within the component
* Global `styles` like `variables` and `reset` managed from `index.css` file inside `src`
* No third party liberary used

## Project Overview
This project shows the departure time of bus for a selected stop. You can choose from the different options of route tab or you can directly get the bus deprature by entring stop number from stop tab.

# To run e2e tests 
npx cypress open

# To run the project 
npm run start 

# Observations/TODO 
- Can use autocomplete instead of select for better user experience



