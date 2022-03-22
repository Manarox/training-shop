import { createStore , applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

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

        case 'actionAddCounter':
            //console.log(state.basket)
            let newArr2 = state.basket
            newArr2.forEach(order => {
                if (
                    order.id === action.payload.id
                    && order.color === action.payload.color
                    && order.size === action.payload.size
                ) {
                    if (order.counter >= 1) {
                        order.counter = order.counter + 1;
                        order.price = +(order.price + order.oldprice).toFixed(2);
                    }
                }
            })
            state.basket = newArr2.slice()
            //console.log(state)
            return { ...state};
        
        case 'actionDelCounter':
            //console.log(state.basket)
            let newArr3 = state.basket
            newArr3.forEach(order => {
                if (
                    order.id === action.payload.id
                    && order.color === action.payload.color
                    && order.size === action.payload.size
                ) {
                    if (order.counter > 1) {
                        order.counter = order.counter - 1;
                        order.price = +(order.price - order.oldprice).toFixed(2);
                    }
                }
            })
            state.basket = newArr3.slice()
            //console.log(state)
            return { ...state};

        default:
            return state
        }
   }

  
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))
//   store.dispatch(actionChangeSecondName)
  //console.log({store})
  console.log(store.getState())

export {store};