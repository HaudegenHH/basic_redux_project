## Basic project that illustrates and simplifies the Redux flow

- installed packages: redux & react-redux
 
---

- create UI component "CakeContainer"
- create src/redux/cake folder 
- inside create "cakeActions.js" where you define the actionCreator
- its a good practice to make a separated file for the action.type constants
- therefore create cakeTypes.js 
- after the actions the next would be the reducer
- create in the same folder "cakeReducer.js" which takes 2 arguments: state & action and returns a new state.
- next create the store and provide it to the application
  (src/redux/store.js)
- to provide the redux store to the react application, the react-redux lib exports
  a component called: Provider
- so in App.js you import the Provider and wrap the App with it and provider the
  store via prop

Now that all components are set up, you have to figure out how to get hold of the redux state and how do you dispatch an action from within a react component like CakeContainer

- in CakeContainer.js i want to display the number of cakes which is part of the
  redux state, and this is also the component from which i want to dispatch the BUY_CAKE action on a button click.
- to achieve that there are 3 steps
- first you have to define a new fn called "mapStateToProps" (you can name it
  whatever you want but this is the convention). It gets the redux state as parameter, and returns an object. In this simple example i just have that one state property that i am trying to access: the "numOfCakes".
- 2nd: same for the "mapDispatchToProps" function which takes a dispatch fn as a
  parameter and returns an object where the actionCreator fn (buyCake) is dispatched.
- to collect this actionCreator functions at one place you could create an index.js
  in the redux folder and import it from CakeContainer
- for step no3 you need to connect these to functions with the react component
- for that you ll need the connect function from the react-redux library

Now the component and the store are hooked and by clicking the button the numOfCakes is reducing.

## Note

- mapStateToProps: if you want to access the redux state in a component, you define this function. It gets the state as a parameter which can be used to retrieve the state properties you want to update. In this case i map state.numOfCakes to a prop, called numOfCakes which we then can render in the jsx (props.numOfCakes).

- similarily for dispatching actions you have the mapDispatchToState function which gets the dispatch method as a parameter and allows us to map actionCreators to props in the component. In this case i map dispatching buyCake() to a prop, called buyCake which can be called (props.buyCake) on button click.
  
- the connect function finally makes it all possible. It connects a react component like the CakeContainer to the redux store. 
  
That is the most basic pattern you can have with react and redux.

---

## Change to hooks

With this basic redux pattern as a starting point you learnt that..
- you have to define the action creators
- then define the reducer functions
- provide the store and
- connect the components to the store 

In doing so the react components get access to the redux state and are able to dispatch actions to the redux store.

A couple of years back React hooks were introduced.
Hooks basically give function components the ability to use local components state, execute side effects and more..

Since React Redux 7.1 have been added, it now offers a bunch of hook apis as an alternative to the existing connect higher order component!

The Apis allow you to subscribe to the redux store and dispatch actions without having to wrap your components in connect().

**useSelector hook** 
- create HooksCakeContainer.js
- use snippet "rfce" for function component
- for the jsx you just need like before a h2 with the numOfCakes inside
  and a button to dispatch the BUY_CAKE action.
- now that you have the component in place lets get back to the topic of useSelector:
useSelector is a hook that react-redux library provides which acts as a close aquivalent to the mapStateToProps function.
- to get hold of any state that is maintained in the store you use the useSelector hook. 
- it needs a "selector function" being passed in, and the argument that this fn receives is the state, from which you can extrapolate the values that you want; whatever is returned by the selector fn, is then returned by the useSelector hook.

- 2nd: you need to import and utilize the **useDispatch hook**
- it returns a reference to the dispatch fn of the redux store
- it can now be used to dispatch action as needed
- for the button you'd simply create an onclick handler

Its obvious that the usage of hooks is much simpler than with the connect fn.
But there are a few usage warnings when using React Redux with hooks. (it all depends on the nesting of your components and how you write your selector functions)

https://react-redux.js.org/api/hooks#usage-warnings

---

## Adding another product

To prove the scalability of this pattern, lets add another "feature" as product and give the customer the ability to buy icecream.

- that requires a new folder, called iceCream, which is next to the cake folder
- similar to the cake folder, within the iceCream folder, you create 3 files: iceCreamTypes.js, iceCreamActions.js and the iceCreamReducer.js
  
Now that you have the iceCreamReducer to perform state transitions based on the action, the next step is to make the redux store aware of this reducer.

If you take a look at store.js you see that the createStore method (which can only accept one reducer) already gets passed into the cakeReducer.
But with the "combineReducer" fn you can handle scenarios where there are multiple reducers.

Therefore create in the redux folder a "rootReducer.js" 
- within this file you combine all the reducers and export one single reducer that can be passed to  the createStore function.

After setting up the store with the newly created rootReducer you can create a new Component, called "IceCreamContainer.js"

Since with rootReducer you have another property in the state object, you have to now adjust the code a little in the 2 Component Containers: Inside the mapStateToProps you now have to reference the "state.cake.numOfCakes" or "state.iceCream.numOfIceCreams"

Insert the components in App.js and test it out. Thats how you add multiple reducers to the app.

---

## Logger Middleware

- install the package
```sh
npm i redux-logger
```
- import logger in store.js
- import applyMiddleware 
..which is the 2nd parameter giving to createStore method and it takes the logger middleware as parameter

When you open your dev tools in the browser, choose the console tab inside and click now one of the buttons. 
You should see the logger middleware in action, logging: 
an action (eg: BUY_CAKE) together with a timestamp and  
prev state, action and next state objects to the console.

Thats how you apply middleware to your application.

---

## Speaking of devtools...
There is a chrome extension "redux devtools" which is very handy.
To be able to use it, add the extension to your browser and then 
- install redux devtools in your project
```sh
npm i --save redux-devtools-extension
```
- import "composeWithDevTools" in  store.js 
..which is now the 2nd parameter of createStore with applyMiddleware as its argument
```sh
npm start
```  
..and you should see in the browser console that you now have an additional tab for redux in the dev tools (or the same redux panel outside the browser dev tools if clicking the symbol for redux-devtools on the right side of the browsers menu bar).

You can see the state at any time, and when you press one of the buttons in the UI (eg: to buy a cake), you see immediately the changes in the state, and the corresponding action on the left. 

If you then click the action you can see the state at that moment or to be precise, after the action has performed the transition.
very useful for debugging!

Also you will find a button (in the redux devtool panel) for dispatching actions without the need to have an UI component for that. (kinda like postman)

Apart from other useful features there is also a slider:
It basically gives you the option to travel through all the actions and see the state changes, which intern affects the UI.

in short: i highly recommend to use this redux-devtool for your react-redux project!
