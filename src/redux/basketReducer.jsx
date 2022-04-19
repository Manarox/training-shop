let initialState = {
    basket: [],
}

const basketReducer = (state = initialState, action) => {
switch (action.type) {
    case 'actionDelProduct':
        state.basket = state.basket.filter((item) => 
            item.id !== action.payload.id || item.color !== action.payload.color || item.size !== action.payload.size
        )
        return { ...state};

    case 'actionAddProduct':
        return { ...state,
                basket: [...state.basket, {...action.payload}],
            };

    case 'actionAddCounter':
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
        return { ...state};
    
    case 'actionDelCounter':
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
        return { ...state};

    case 'RESET_ITEMS_IN_CART':
        return { ...state, basket: [] };
    default:
        return state
    }
}

export default basketReducer;