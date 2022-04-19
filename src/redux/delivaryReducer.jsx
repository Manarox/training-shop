const defaultState = {
    typeButtonLoad: 'Item in Cart',
    typeDeliveryLoad: 'pickup from post offices',
    deliveryInfo: [],
    loadingCountry: [],
    loadingCountryError: "",
    loadingStoreAddress: [],
    loadingStoreAddressError: "",
    typePaymentLoad: 'visa',
    loadingDataRequest: "",
};
console.log('delivaryReducer')
 
const delivaryReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'CHANGE_TYPE_BUTTON': {
        return { ...state, typeButtonLoad: action.payload};
    }
    case 'CHANGE_TYPE_DELIVERY_CHOSE': {
        return { ...state, typeDeliveryLoad: action.payload};
    }
    case 'CHANGE_TYPE_PAYMENT_CHOSE': {
        return { ...state, typePaymentLoad: action.payload};
    }
    case 'RESET_VALUES': {
        return { ...state,
                typeButtonLoad: 'Item in Cart',
                typeDeliveryLoad: 'pickup from post offices',
                loadingStoreAddress: [],
                typePaymentLoad: 'visa',
                loadingDataRequest: "",             
            };
    }
    case 'SEND_DELIVERY_FORM': {
        return { ...state, deliveryInfo: action.payload};
    }
    case 'LOAD_COUNTRY_SUCCESS': {
        return { ...state, loadingCountry: action.payload };
    }
    case 'LOAD_COUNTRY_ERROR': {
        return { ...state, loadingCountryError: true };
    }


    case 'LOAD_STORE_ADDRESS_SUCCESS': {
        return { ...state, loadingStoreAddress: action.payload };
    }
    case 'LOAD_STORE_ADDRESS_ERROR': {
        return { ...state, loadingStoreAddressError: true };
    }

    case 'LOAD_BASKET_SUCCESS': {
        return { ...state, loadingDataRequest: action.payload };
    }
    case 'LOAD_BASKET_ERROR': {
        return { ...state, loadingDataRequest: "error" };
    }

    default:
        return state;
}
};

export default delivaryReducer;