const defaultState = {
    products: {
        men: [],
        women: [],
    },
    isLoading: false,
    isError: false,
};
console.log(defaultState)

const loadReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'LOAD_DATA': {
        state.isLoading = true
        return { ...state };
    }

    case 'LOAD_DATA_SUCCESS': {
        console.log(state.isLoading)
        state.isLoading = false
        state.products = action.payload
        return { ...state }

        //return { ...state, ...action.payload, isLoading: false };
    }

    case 'LOAD_DATA_ERROR': {
        state.isLoading = false
        state.isError = true
        return { ...state };
    }

    default:
        return state;
}
};

export default loadReducer;