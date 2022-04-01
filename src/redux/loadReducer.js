//import {loadDataError} from './saga';

const defaultState = {
    products: {
        men: [],
        women: [],
    },
    isLoading: true,
    isError: false,
};
console.log(defaultState)

const loadReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'LOAD_DATA': {
        //state.isLoading = true
        //return { ...state };
        return { ...state, isLoading: true };
    }

    case 'LOAD_DATA_SUCCESS': {
        //loadDataError()
        //console.log(state.isLoading)
        //state.isLoading = false
        //state.products = action.payload
        //return { ...state }
        return { ...state, isLoading: false , products: action.payload };
        //return { ...state, ...action.payload, isLoading: false };
    }

    case 'LOAD_DATA_ERROR': {
        //state.isLoading = false
        //state.isError = true
        //return { ...state };
        return { ...state, isLoading: false, isError: true };
    }

    default:
        return state;
}
};

export default loadReducer;