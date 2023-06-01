import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { buyCake } from '../redux/cake/cakeActions';

function HooksCakeContainer() {
    // so called "selector function" is passed in
    // it receives the state as argument (similar to mapStateToProps)
    // and should return a value (in this case numOfCakes)
    // and the useSelector returns whatever is returned by the selector fn
    const numOfCakes = useSelector(state => state.numOfCakes)
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Number of Cakes - { numOfCakes }</h2>
            <button onClick={() => dispatch(buyCake())}>Buy a cake</button>
        </div>
    )
}

export default HooksCakeContainer;