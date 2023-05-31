## Basic project that illustrates and simplifies the Redux flow

- installed packages: redux & react-redux
 
---

- create UI component "CakeContainer"
- create src/redux/cake folder 
- inside create "cakeActions.js" where you define the actionCreator
- its a good practice to make a separated file for the action.type constants
- therefore create cakeTypes.js 
- after the actions the next would be the reducer
- create in the same folder "cakeReducer.js" which takes 2 arguments: state &   
  action and returns a new state.
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

### note

- mapStateToProps: if you want to access the redux state in a component, you define this function. It gets the state as a parameter which can be used to retrieve the state properties you want to update. In this case i map state.numOfCakes to a prop, called numOfCakes which we then can render in the jsx (props.numOfCakes).

- similarily for dispatching actions you have the mapDispatchToState function which gets the dispatch method as a parameter and allows us to map actionCreators to props in the component. In this case i map dispatching buyCake() to a prop, called buyCake which can be called (props.buyCake) on button click.
  
- the connect function finally makes it all possible. It connects a react component like the CakeContainer to the redux store. 
  
That is the most basic pattern you can have with react and redux.