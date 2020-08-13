const SET_AUTH = 'AUTH/SET_AUTH'

const initialState = {
    authorized: false,
    authId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                authorized: action.authorized,
                authId: action.authId
            }
        }
        default:
            return state
    }
}

export const setAuth = (auth) => ({
    type: SET_AUTH,
    authId: auth.authId,
    authorized: auth.authorized
})


export default authReducer