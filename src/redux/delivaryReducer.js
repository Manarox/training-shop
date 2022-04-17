const defaultState = {
    isTypeButtonLoad: 'Item in Cart',
    isTypeDeliveryLoad: 'pickup from post offices',
    isDeliveryInfo: [],
    isLoadingCountry: [],
    isLoadingCountryError: "",
    isLoadingStoreAddress: [],
    isLoadingStoreAddressError: "",
    isTypePaymentLoad: 'visa',
    isDataRequest: "",
};
console.log('delivaryReducer')
 
const delivaryReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'CHANGE_TYPE_BUTTON': {
        return { ...state, isTypeButtonLoad: action.payload};
    }
    case 'CHANGE_TYPE_DELIVERY_CHOSE': {
        return { ...state, isTypeDeliveryLoad: action.payload};
    }
    case 'CHANGE_TYPE_PAYMENT_CHOSE': {
        return { ...state, isTypePaymentLoad: action.payload};
    }
    case 'RESET_VALUES': {
        return { ...state,
                isTypeButtonLoad: 'Item in Cart',
                isTypeDeliveryLoad: 'pickup from post offices',
                isLoadingStoreAddress: [],
                isTypePaymentLoad: 'visa',
                isDataRequest: "",             
            };
    }
    case 'SEND_DELIVERY_FORM': {
        return { ...state, isDeliveryInfo: action.payload};
    }
    case 'LOAD_COUNTRY_SUCCESS': {
        return { ...state, isLoadingCountry: action.payload };
    }
    case 'LOAD_COUNTRY_ERROR': {
        return { ...state, isLoadingCountryError: true };
    }


    case 'LOAD_STORE_ADDRESS_SUCCESS': {
        return { ...state, isLoadingStoreAddress: action.payload };
    }
    case 'LOAD_STORE_ADDRESS_ERROR': {
        return { ...state, isLoadingStoreAddressError: true };
    }

    case 'LOAD_BASKET_SUCCESS': {
        return { ...state, isDataRequest: action.payload };
    }
    case 'LOAD_BASKET_ERROR': {
        return { ...state, isDataRequest: "error" };
    }

    default:
        return state;
}
};

export default delivaryReducer;