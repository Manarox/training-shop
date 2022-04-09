const defaultState = {
    isLoading: false,
    isLoadingSuccess: false,
    isError: false,
    isReview: [],
};

const reviewReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'SEND_REVIEW': {
        return { ...state, isReview: action.payload, isLoading: true};
    }
    case 'SEND_REVIEW_SUCCESS': {
        return { ...state, isDataProd: action.payload, isLoading: false, isLoadingSuccess: true, isError: false};
    }
    case 'SEND_REVIEW_ERROR': {
        return { ...state, isLoading: false, isError: true};
    }
    case 'NEWSUCCESS': {
        return { ...state, isLoadingSuccess: false};
    }
    case 'SEND_REVIEW_NULL': {
        return { ...state, isError: false, isLoadingSuccess: false};
    }

    default:
        return state;
}
};

export default reviewReducer;