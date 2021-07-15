import axios from "axios"
import { SELECT_ALL_FAIL, SELECT_ALL_REQUEST, SELECT_ALL_SUCCESS, SELECT_COUNTRY_FAIL, SELECT_COUNTRY_REQUEST, SELECT_COUNTRY_SUCCESS, SELECT_LOGIN_FAIL, SELECT_LOGIN_REQUEST, SELECT_LOGIN_SUCCESS, SELECT_SPECS_FAIL, SELECT_SPECS_REQUEST, SELECT_SPECS_SUCCESS } from "../constants/selectConstants"

export const listSelect = () => async(dispatch) => {
    try {
  
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: SELECT_ALL_REQUEST})
      let auth = "Bearer " + userInfo.token
  
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get('http://127.0.0.1:8000/api/techs/select', config)
  
      dispatch({
        type: SELECT_ALL_SUCCESS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: SELECT_ALL_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const listSpecs = () => async(dispatch) => {
    try {
  
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: SELECT_SPECS_REQUEST})
      let auth = "Bearer " + userInfo.token
  
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get('http://127.0.0.1:8000/api/orgs/select', config)
  
      dispatch({
        type: SELECT_SPECS_SUCCESS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: SELECT_SPECS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const listCountry = () => async(dispatch) => {
    try {

      dispatch({type: SELECT_COUNTRY_REQUEST})
  
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get('http://127.0.0.1:8000/auth/countries', config)
  
      dispatch({
        type: SELECT_COUNTRY_SUCCESS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: SELECT_COUNTRY_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const selectLogin = () => async(dispatch) => {
    try {
      dispatch({type: SELECT_LOGIN_REQUEST})
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }
  
      const {data} = await axios.get(`http://127.0.0.1:8000/auth/login`, config)
  
      dispatch({
        type: SELECT_LOGIN_SUCCESS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: SELECT_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }