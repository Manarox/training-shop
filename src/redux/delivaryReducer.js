const defaultState = {
    isTypeButtonLoad: 'Item in Cart',
    isTypeDeliveryLoad: 'pickup from post offices',
    isDeliveryInfo: [],
};
 
const delivaryReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'CHANGE_TYPE_BUTTON': {
        return { ...state, isTypeButtonLoad: action.payload};
    }
    case 'CHANGE_TYPE_DELIVERY_CHOSE': {
        return { ...state, isTypeDeliveryLoad: action.payload};
    }
    case 'RESET_VALUES': {
        return { ...state,
                isTypeButtonLoad: 'Item in Cart',
                isTypeDeliveryLoad: 'pickup from post offices',
            };
    }
    case 'SEND_DELIVERY_FORM': {
        return { ...state, isDeliveryInfo: action.payload};
    }

    default:
        return state;
}
};

export default delivaryReducer;