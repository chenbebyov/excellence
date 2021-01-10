import {addUser, getUser} from '../../services/user.service';
import {setMessage} from './message.action';
export const SET_USER = 'SET USER'
export const LOGOUT = 'LOGOUT'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const createUser = (user) => {
    return (dispatch) => {
        addUser(user).then(response => {
            if(response.data.success){
                dispatch(setUser(response.data.user));
            }
        })
    }
}

export const enterUser = (email, password) => (dispatch) => {
    return getUser(email, password).then(response => {
        if (response.success) {
            response.data.role = 'User';
            dispatch(setUser(response.data));
            return Promise.resolve();
        }
    }).catch(error => {
         // const message = (response.error)
            dispatch(setMessage(error.response.data.error));
            return Promise.reject();
    })
}

