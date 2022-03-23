let initialState = {
    basket: [],
}
console.log(initialState)

const basketReducer = (state = initialState, action) => {
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
        console.log(state, action.payload)
        //let newArr = state.basket
        //newArr.push(action.payload)
        //state.basket = state.basket.push(action.payload)
        //state.basket = newArr.slice()
        console.log(state)
        //return { ...state }
        return { ...state,
                basket: [...state.basket, {...action.payload}],
            };

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


export default basketReducer;