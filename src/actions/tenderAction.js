import axios from "axios"
import { FULLCOSTS_FAIL, FULLCOSTS_REQUEST, FULLCOSTS_SUCCESS, TENDER_DECIDE_FAIL, TENDER_DECIDE_REQUEST, TENDER_DECIDE_SUCCESS, TENDER_FAIL, TENDER_LIST_FAIL, TENDER_LIST_REQUEST, TENDER_LIST_SORTEDBY_DATE, TENDER_LIST_SORTEDBY_STATUS, TENDER_LIST_SORTEDBY_TENDER_ID, TENDER_LIST_SORTEDBY_TZ_ID, TENDER_LIST_SORT_FAIL, TENDER_LIST_SORT_SUCCESS, TENDER_LIST_SUCCESS, TENDER_REQUEST, TENDER_SUCCESS } from "../constants/tenderConstants"

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

export const sortTendersByTenderId = (tenders, tender_idFlag) => async(dispatch) => {
  try {
    dispatch({type: TENDER_LIST_SORTEDBY_TENDER_ID})

    const data = tenders.sort((a, b)=>{
      if ((a.tender_id > b.tender_id) && tender_idFlag) {
        return -1;
      }
      if ((a.tender_id < b.tender_id) && tender_idFlag) {
        return 1;
      }
      if ((a.tender_id > b.tender_id) && !tender_idFlag) {
        return 1;
      }
      if ((a.tender_id < b.tender_id) && !tender_idFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TENDER_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TENDER_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortTendersByTZId = (tenders, tz_idFlag) => async(dispatch) => {
  try {
    dispatch({type: TENDER_LIST_SORTEDBY_TZ_ID})

    const data = tenders.sort((a, b)=>{
      if ((a.tz_id > b.tz_id) && tz_idFlag) {
        return -1;
      }
      if ((a.tz_id < b.tz_id) && tz_idFlag) {
        return 1;
      }
      if ((a.tz_id > b.tz_id) && !tz_idFlag) {
        return 1;
      }
      if ((a.tz_id < b.tz_id) && !tz_idFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TENDER_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TENDER_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortTendersByDate = (tenders, dateFlag) => async(dispatch) => {
  try {
    dispatch({type: TENDER_LIST_SORTEDBY_DATE})

    const data = tenders.sort((a, b)=>{
      if ((Date.parse(a.date) > Date.parse(b.date) ) && dateFlag) {
        return -1;
      }
      if ((Date.parse(a.date)  < Date.parse(b.date)) && dateFlag) {
        return 1;
      }
      if ((Date.parse(a.date)  > Date.parse(b.date)) && !dateFlag) {
        return 1;
      }
      if ((Date.parse(a.date)  < Date.parse(b.date)) && !dateFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TENDER_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TENDER_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortTendersByStatus = (tenders, tender_stFlag) => async(dispatch) => {
  try {
    dispatch({type: TENDER_LIST_SORTEDBY_STATUS})

    const data = tenders.sort((a, b)=>{
      if ((a.tender_st > b.tender_st) && tender_stFlag) {
        return -1;
      }
      if ((a.tender_st < b.tender_st) && tender_stFlag) {
        return 1;
      }
      if ((a.tender_st > b.tender_st) && !tender_stFlag) {
        return 1;
      }
      if ((a.tender_st < b.tender_st) && !tender_stFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TENDER_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TENDER_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}