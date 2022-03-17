import { createStore } from 'redux';

let initialState = {
    quantity: 0,
    basket: []
  }
  
  const rootReducer = (state = initialState, action) => {
    // console.log(state)
    // console.log(action)
    switch (action.type) {
        case 'actionDelProduct':
            console.log(state)
                state.basket = state.basket.filter((item) => 
                item.id !== action.payload.id || item.color !== action.payload.color || item.size !== action.payload.size
            )
            console.log(state)
            return { ...state};

        case 'actionAddProduct':
            let newArr = state.basket
            newArr.push(action.payload)
            // newArr.push(action.payload)
            // state.basket = state.basket.push(action.payload)
            state.basket = newArr.slice()
            console.log(state)
            return { ...state};

        default:
            return state
        }
   }

  
  const store = createStore(rootReducer)
//   store.dispatch(actionChangeSecondName)
  console.log({store})
  console.log(store.getState())

export {store};