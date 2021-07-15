import axios from "axios"
import { FULLCOSTS_FAIL, FULLCOSTS_REQUEST, FULLCOSTS_SUCCESS, TENDER_DECIDE_FAIL, TENDER_DECIDE_REQUEST, TENDER_DECIDE_SUCCESS, TENDER_FAIL, TENDER_LIST_FAIL, TENDER_LIST_REQUEST, TENDER_LIST_SUCCESS, TENDER_REQUEST, TENDER_SUCCESS } from "../constants/tenderConstants"

export const listTenders = () => async(dispatch) => {
    try {

        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        dispatch({type: TENDER_LIST_REQUEST})
        let auth = "Bearer " + userInfo.token
    
    
        const config = {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": auth
          },
          mode: 'cors'
      }
    
        const { data } = await axios.get('http://127.0.0.1:8000/api/tenders/',config)
    
        dispatch({
          type: TENDER_LIST_SUCCESS,
          payload: data.data
        })
      } catch (error) {
        dispatch({
          type: TENDER_LIST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
      }
  }


  export const listTenderDetails = (id) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  
      dispatch({type: TENDER_REQUEST})
      
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get(`http://127.0.0.1:8000/api/tenders/${id}`, config)
  
      dispatch({
        type: TENDER_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: TENDER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }



  export const listFullCosts = (tz_id) => async(dispatch) => {
    try {

        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        dispatch({type: FULLCOSTS_REQUEST})
        let auth = "Bearer " + userInfo.token
    
    
        const config = {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": auth
          },
          mode: 'cors'
      }
    
        const { data } = await axios.get('http://127.0.0.1:8000/api/tenders/min',tz_id, config)
    
        dispatch({
          type: FULLCOSTS_SUCCESS,
          payload: data.data
        })
      } catch (error) {
        dispatch({
          type: FULLCOSTS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
      }
  }



export const decideTender = (tender_id, selected_cp, tz_id) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TENDER_DECIDE_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.put(`http://127.0.0.1:8000/api/tenders/decide`, {tender_id,selected_cp, tz_id}, config)

    dispatch({
      type: TENDER_DECIDE_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TENDER_DECIDE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}