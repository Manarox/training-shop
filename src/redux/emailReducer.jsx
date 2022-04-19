const defaultState = {
    isLoading: false,
    isLoadingSuccess: false,
    isError: false,
    isEmail: [],

    isLoadingFoot: false,
    isLoadingSuccessFoot: false,
    isErrorFoot: false,
    isEmailFoot: [],
};

const emailReducer = (state = defaultState, action) => {
switch (action.type) {
    case 'SEND_EMAIL': {
        return { ...state, isEmail: action.payload, isLoading: true};
    }
    case 'SEND_EMAIL_SUCCESS': {
        return { ...state, isLoading: false, isLoadingSuccess: true, isError: false};
    }
    case 'SEND_EMAIL__ERROR': {
        return { ...state, isLoading: false, isError: true};
    }
    case 'SEND_EMAIL_NULL': {
        return { ...state, isError: false, isLoadingSuccess: false};
    }

    case 'FOOTER_SEND_EMAIL': {
        return { ...state, isEmailFoot: action.payload, isLoadingFoot: true};
    }
    case 'FOOTER_SEND_EMAIL_SUCCESS': {
        return { ...state, isLoadingFoot: false, isLoadingSuccessFoot: true, isErrorFoot: false};
    }
    case 'FOOTER_SEND_EMAIL__ERROR': {
        return { ...state, isLoadingFoot: false, isErrorFoot: true};
    }
    case 'FOOTER_DATA_NULL': {
        return { ...state, isErrorFoot: false, isLoadingSuccessFoot: false};
    }

    default:
        return state;
}
};

export default emailReducer;