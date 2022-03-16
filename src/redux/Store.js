import { createStore } from 'redux';

let initialState = {
    quantity: 0,
    basket: []
  }
  
  const rootReducer = (state = initialState, action) => {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case 'ACTION_CHANGE_FIRST_NAME':
            return { ...state, firstName: action.payload};
        case 'actionAddProduct':
            state.basket.push(action.payload)
            console.log(state.basket)
            return { ...state, quantity: state.basket.length };
        default:
            return state
        }
   }

  
  const store = createStore(rootReducer)
//   store.dispatch(actionChangeSecondName)
  console.log({store})
  console.log(store.getState())

export {store};