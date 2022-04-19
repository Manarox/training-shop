const defaultState = {
    products: {
        men: [],
        women: [],
    },
    isLoading: true,
    isError: false,
};

const loadReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'LOAD_DATA': {
        return { ...state, isLoading: true };
    }
    case 'LOAD_DATA_SUCCESS': {
        return { ...state, isLoading: false , products: action.payload };
    }
    case 'LOAD_DATA_ERROR': {
        return { ...state, isLoading: false, isError: true };
    }

    default:
        return state;
}
};

export default loadReducer;