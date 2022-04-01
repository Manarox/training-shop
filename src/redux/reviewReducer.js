//import {loadDataError} from './saga';

const defaultState = {
    isLoading: false,
    isLoadingSuccess: false,
    isError: false,
    isReview: [],
    // isDataProd: [],
};
console.log(defaultState)

const reviewReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'SEND_REVIEW': {
        //state.isLoading = true
        console.log(action.payload)
        //return { ...state };
        return { ...state, isReview: action.payload, isLoading: true};
    }
    case 'SEND_REVIEW_SUCCESS': {
        //state.isLoading = true
        console.log(action.payload)
        //return { ...state };
        return { ...state, isDataProd: action.payload, isLoading: false, isLoadingSuccess: true};
    }
    case 'SEND_REVIEW_ERROR': {
        //state.isLoading = true
        console.log(action.payload)
        //return { ...state };
        return { ...state, isLoading: false, isError: true};
    }
    case 'NEWSUCCESS': {
        //state.isLoading = true
        console.log(action.payload)
        //return { ...state };
        return { ...state, isLoadingSuccess: false};
    }
    case 'SEND_REVIEW_NULL': {
        //state.isLoading = true
        console.log(action.payload)
        //return { ...state };
        return { ...state, isError: false, isLoadingSuccess: false};
    }

    default:
        return state;
}
};

export default reviewReducer;