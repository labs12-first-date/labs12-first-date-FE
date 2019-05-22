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


## ZipCodeAPI.com 
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
		* axiosfirebase
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
