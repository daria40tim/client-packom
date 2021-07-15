import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
                "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT",
            },
            mode: 'cors'
        }

        const {data} = await axios.post(
            'http://127.0.0.1:8000/auth/sign-in', 
            {email, password},
            config
            )

        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))



    } catch (error) {
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (email, name, password, group_id, countries) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
                "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT",
            },
            mode: 'cors'
        }

        const {data} = await axios.post(
            'http://127.0.0.1:8000/auth/sign-up', 
            {email, name, password, group_id, countries},
            config
            )

        dispatch({
            type: USER_REGISTER_SUCCESS, 
            payload: data
        })



    } catch (error) {
        
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}