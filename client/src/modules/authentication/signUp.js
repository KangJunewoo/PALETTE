import axios from 'axios';

// FIXME: url 나중에 고치기
function signUpAPI(firstName, lastName, email, password) {
    return axios.post('http://127.0.0.1:5000/signup');
}

const initialState = {
    isFetching: false,
    isSuccess: false
}

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
const SET_SIGN_UP_STATUS = 'SET_SIGN_UP_STATUS';

export const signUpRequest = () => ({
    type: SIGN_UP_REQUEST,
});

export const signUpSuccess = (response) => ({
    type: SIGN_UP_SUCCESS,
    response
});

export const signUpFailure = () => ({
    type: SIGN_UP_FAILURE,
});

export const setSignUpStatus = (isSuccess) => ({
    type: SET_SIGN_UP_STATUS,
    isSuccess
})



export const signUp = (firstName, lastName, email, password) => dispatch => {
    dispatch(signUpRequest());
    return signUpAPI(firstName, lastName, email, password).then(response => {
        console.log(response);
        dispatch(signUpSuccess(response));
        return response;
    }).catch(error => {
        alert('Sign up failed. Please check your form.');
        dispatch(signUpFailure());
        throw(error);
    })
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccess: true
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        case SET_SIGN_UP_STATUS:
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        default:
            return initialState;
    }
}