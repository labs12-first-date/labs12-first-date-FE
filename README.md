|                                                      ![Gill](https://img.shields.io/badge/Gill-Abada-orange.svg)                                                      |                                                       ![James](https://img.shields.io/badge/James-Basile-brightgreen.svg)                                                       |                                                      ![Joel](https://img.shields.io/badge/Joel-Bartlett-red.svg)                                                       |                                                       ![Jonas](https://img.shields.io/badge/Jonas-Walden-yellow.svg)                                                       |                                                      ![Steve](https://img.shields.io/badge/Steve-Alverson-blue.svg)                                                      |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" /> | <img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" /> | <img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" /> | <img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" /> | <img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" /> |
|                                [<img src="https://github.com/favicon.ico" width="35"> ](https://github.com/gabada)                                |                            [<img src="https://github.com/favicon.ico" width="35"> ](https://github.com/jbasile6)                             |                          [<img src="https://github.com/favicon.ico" width="35"> ](https://github.com/murbar)                           |                          [<img src="https://github.com/favicon.ico" width="35"> ](https://github.com/UnknownMonk)                           |                           [<img src="https://github.com/favicon.ico" width="35"> ](https://github.com/VaderSteve76)  
<br>

## Project Overview ![UnBlush](https://img.shields.io/badge/Un-Blush-brightgreen.svg)
UnBlush is the first dating app for people of all or no genders with STD(s). UnBlush is an online-dating application available on Web and iOS. With 1 in three people in the US contracting an STD before the age of 25, STDs are much more common than the average person would think. Our dating app allows users to disclose their condition(s) and list the condition(s) that they are open to a potential match having. By allowing users to disclose this taboo information upfront, the stigma of having an STD and fear of judgement is removed and you can focus on actually getting to know your matches. Finally an app that is aimed at taking the stigma out of being **positive!!**

#### You can find the project at [**UnBlush**](https://awk-dating.firebaseapp.com)

#### Our project is also on IOS [**IOS UnBlush**](https://github.com/labs12-first-date/labs12-first-date-iOS)

## Key Features ![](https://img.shields.io/badge/-Features-blue.svg)
    * Sign up via email or Google Account
    * Upload image to Profile
    * Add bio information
    * Check off which STD(s) the user has
    * Check off which STD(s) the user is open to a partner having
    * Match recommendations based off user's disclosed/"open to" STD(s), age, gender, and distance
    * Swipe yes/no on other users' profiles resulting in a match if a yes is reciprocated
    * In-App chat once users are matched

##  Tech Stack ![Tech](https://img.shields.io/badge/Tech-Stack-grey.svg)
### Front end built using: 
![React](https://img.shields.io/badge/React-JS-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-DB-orange.svg)
![Node](https://img.shields.io/badge/Node-JS-green.svg)
![Stripe](https://img.shields.io/badge/Stripe-API-blue.svg)
![ZipCode](https://img.shields.io/badge/ZipCode-API-yellow.svg)

    * React w/ React Hooks
    * Firebase/Cloud Firestore, Firebase Functions
    * Node.js
    * Stripe 
    * ZipCodeAPI.com

### Back end built using:
![Firebase](https://img.shields.io/badge/Firebase-DB-orange.svg)
![Node](https://img.shields.io/badge/Node-JS-green.svg)

    * Firestore/Cloud Firestore noSQL database Firebase Functions
    * Node.js

# APIs ![API](https://img.shields.io/badge/-API-brightgreen.svg)
## Firebase Authentication
![Firebase](https://img.shields.io/badge/Firebase-DB-orange.svg)

	Authentication for users was accomplished by using the built-in auth feature in firebase
	A simple login function that includes firebase.auth().signInWithEmailAndPassword(email, password);
	And a simple logout function that includes firebase.auth().signOut();
	There are no endpoints to point to but a list of functions as this is a noSQL database 
	
	Documentation - https://firebase.google.com/docs


## Stripe API
![Stripe](https://img.shields.io/badge/Stripe-API-blue.svg)

	We used Stripe API for our payment system, a sample function would look like so:
	
	const stripe = require('stripe')('INSERT_YOUR_API-KEY');
	(async () => {const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com',
    	});
    })();
    
    The only necessary endpoint is to point your <StripeProvider apiKey="YOUR-API-KEY"/> to your API key
    
    Documentation - https://stripe.com/docs


## ZipCodeAPI
![ZipCode](https://img.shields.io/badge/ZipCode-API-yellow.svg)

	We used ZipCodeAPI.com to be able to match our users by the distance they choose in their profile settings
	The only endpoint you need for this API is 
	const endPoint = 'https://www.zipcodeapi.com/rest/<YOUR-API-KEY>/radius.json/<USER-ZIPCODE>/<USER-DISTANCE>/mile';
	
	Documentation - https://www.zipcodeapi.com/API

# NPM Packages 
![Node](https://img.shields.io/badge/Node-JS-green.svg)

	All packages used to create this application:
		* @types/react-stripe-elements
		* @types/stripe
		* axios
		* firebase
		* moment
		* prop-types
		* react    
		* react-dom
		* react-dom-confetti
		* react-firebase-file-uploader
		* react-firebaseui
		* react-firestore
		* react-icons
		* react-responsive-navbar
		* react-router
		* react-router-dom
		* react-scripts
		* react-select
		* react-spinners
		* react-spring
		* react-stripe-elements
		* react-sweet-progress
		* react-toastify
		* react-with-gesture
		* stripe
		* styled-components
		* typescript

## Other Scripts
![Scripts](https://img.shields.io/badge/Server-Scripts-brightgreen.svg)

	"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  	}
  	
# Licensing
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

[MIT](https://opensource.org/licenses/MIT)

# Contributing ![Contribute](https://img.shields.io/badge/-Contributing-brightgreen.svg)

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
![BUGS](https://img.shields.io/badge/BUG-Reporting-red.svg)

    * If you are having an issue with the existing project code, please submit a bug report under the following guidelines:
    * Check first to see if your issue has already been reported.
    * Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
    * Create a live example of the problem.
    * Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.
## Feature Requests ![Feature](https://img.shields.io/badge/-Features-brightgreen.svg)
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.
## Pull Requests ![PR](https://img.shields.io/badge/-Pull%20Requests-brightgreen.svg)
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.
### Pull Request Guidelines ![PR](https://img.shields.io/badge/-PR%20Guidelines-brightgreen.svg)
    * Ensure any install or build dependencies are removed before the end of the layer when doing a build.
    * Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations and container parameters.
    * Ensure that your code conforms to our existing code conventions and test coverage.
    * Include the relevant issue number, if applicable.
    * You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
### Attribution ![Attribution](https://img.shields.io/badge/-Attribution-lightgrey.svg)
These contribution guidelines have been adapted from [Good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
