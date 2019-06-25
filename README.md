# Text App

Text App is an angular app built to read a [file](http://terriblytinytales.com/test.txt) and count n most frequently occurring words.

You can view a live demo over [here](https://frequency-counter.herokuapp.com/)

## Getting Started

Download [Text App](https://github.com/InderB/textapp/archive/master.zip) zip file and extract

Make sure you have the Angular CLI and Node installed globally. I used Npm to manage the dependencies, so I strongly recommend you to use it. you can install it from [Here](https://github.com/nodesource/distributions), then run npm install to resolve all dependencies (might take a minute).

(Following commands need to be executed inside the textapp folder)

## Installing

Use the node package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install 
```

Good to go! Now run the following command to run the app

```bash
npm start
```
Navigate to `http://localhost:4200`

Note: The run command builds the project. The build artifacts will be stored in the `dist/` directory. It then runs the express server and serves the UI on [local-server](http://localhost:4200)

## Dependencies


## Functionality Overview
TextApp is built to read a hosted file and returns top n most frequently occurring words in that file. Here, n is taken as user input. (You may change the file url in config.js file)

Their are 2 branches in this project. One is the `master` branch and second is `UserInput` branch.
* Master Branch - Because the file to read is constant and is not changing according to user input, the required file is initially loaded in memory on server start and then is served to api requests
* UserInput Branch - File is fetched on each api request and then it calculates top n words

**Back-end**
1. File Reading: npm `https` module is used to fetch file from https server
2. File Conversion: File content is transformed into a Map with key as word and value as frequency of that word in the content. The Map is then sorted in descending order of word frequency
3. On api request, server uses this map and returns top n words from map
4. Before returning response to UI, it converts Map to an array of objects with word and frequency
5. Server returns array of top n most frequent words with their respective frequencies in descending order
(Every conversion is done by using JavaScript's basic functions)

**Front-end**

App contains 1 frequency-component, 1 frequency-service and 1 toast-service
* Frequency component - To read user input and display results
* Frequency service - To request server and return Observable to frequency component
* Toast service - To display action acknowledgement

1. [Bootstrap](https://getbootstrap.com/) Navbar component is used for header and footer with basic css
2. [Angular Material](https://material.angular.io/) Button, Input field(for user input) and Table(for data visualization)
3. [ngx-spinner](https://www.npmjs.com/package/ngx-spinner) for introducing wait till server responds
4. Bootstrap Toast Service to display action acknowledgement


## Making request to the Backend API
Backend apis can be tested from [here](https://documenter.getpostman.com/view/957785/S1a4WmYj
)

## Tests
1. Server unit test: Contains 2 specs to test file conversion and map to array conversion method.

Command to run test 
```bash
jasmine
```
![Test result][server-unit-testing.png]


2. UI unit test: Contains 7 specs testing component and service

Command to run test 
```bash
ng test
```
![Test result][UI-Unit-Testing.png]

## Built With
* [Angular 6](https://angular.io/) - JavaScript framework for front-end app using TypeScript and HTML
* [Bootstrap](https://getbootstrap.com/) - Library for building responsive websites
* [Karma](https://karma-runner.github.io/latest/index.html) and [Jasmine](https://jasmine.github.io/) - JavaScript frameworks for testing
* [Nodejs](https://nodejs.org/en/) - JavaScript framework for back-end using v10 which supports ECMAScript2015(ES6)
* [Express](https://expressjs.com/) - Nodejs Web Framework

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
