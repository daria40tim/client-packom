import axios from "axios"
import { CP_CREATE_FAIL, CP_CREATE_REQUEST, CP_CREATE_SUCCESS, CP_DELETE_CAL_FAIL, CP_DELETE_CAL_REQUEST, CP_DELETE_CAL_SUCCESS, CP_DELETE_CST_FAIL, CP_DELETE_CST_REQUEST, CP_DELETE_CST_SUCCESS, CP_DETAILES_FAIL, CP_DETAILES_REQUEST, CP_DETAILES_SUCCESS, CP_LIST_FAIL, CP_LIST_REQUEST, CP_LIST_SORTEDBY_CP_ID, CP_LIST_SORTEDBY_DATE, CP_LIST_SORTEDBY_ORG, CP_LIST_SORTEDBY_STATUS, CP_LIST_SORTEDBY_TZ_ID, CP_LIST_SORT_FAIL, CP_LIST_SORT_SUCCESS, CP_LIST_SUCCESS, CP_UPDATE_FAIL, CP_UPDATE_REQUEST, CP_UPDATE_SUCCESS, DOWN_CP_DOC_FAIL, DOWN_CP_DOC_REQUEST, DOWN_CP_DOC_SUCCESS, GET_CP_FILTER_DATA_FAIL, GET_CP_FILTER_DATA_REQUEST, GET_CP_FILTER_DATA_SUCCESS } from "../constants/cpConstants"

export const listCPs = () => async(dispatch) => {
    try {

        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        dispatch({type: CP_LIST_REQUEST})
        let auth = "Bearer " + userInfo.token
    
    
        const config = {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": auth
          },
          mode: 'cors'
      }
    
        const { data } = await axios.get('http://80.87.202.222:8000/api/cps/',config)
    
        dispatch({
          type: CP_LIST_SUCCESS,
          payload: data.data
        })
      } catch (error) {
        dispatch({
          type: CP_LIST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
      }
  }



  export const listCPDetails = (id) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  
      dispatch({type: CP_DETAILES_REQUEST})
      
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get(`http://80.87.202.222:8000/api/cps/${id}`, config)
  
      dispatch({
        type: CP_DETAILES_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_DETAILES_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const createCP = (tz_id, pay_cond, end_date, info, cal, cst, date, docs, proj) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: CP_CREATE_REQUEST})
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      await axios.post(`http://80.87.202.222:8000/api/cps/`, {tz_id, pay_cond, end_date, info, cal, cst, date, docs, proj}, config)
  
      dispatch({
        type: CP_CREATE_SUCCESS,
        payload: true
      })
    } catch (error) {
      dispatch({
        type: CP_CREATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const cpUpdate = (cp_id, pay_cond, end_date, info, cal, cst, docs, history) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: CP_UPDATE_REQUEST})
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      await axios.put(`http://80.87.202.222:8000/api/cps/${cp_id}`, {pay_cond, end_date, info, cal, cst, docs, history}, config)
  
      dispatch({
        type: CP_UPDATE_SUCCESS,
        payload: true
      })
    } catch (error) {
      dispatch({
        type: CP_UPDATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const cpDeleteCal = (cp_id) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: CP_DELETE_CAL_REQUEST})
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      await axios.post(`http://80.87.202.222:8000/api/cps/delete_cal`, cp_id, config)
  
      dispatch({
        type: CP_DELETE_CAL_SUCCESS,
        payload: true
      })
    } catch (error) {
      dispatch({
        type: CP_DELETE_CAL_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }
  
  
  export const cpDeleteCst = (cp_id) => async(dispatch) => {
    try {
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: CP_DELETE_CST_REQUEST})
      let auth = "Bearer " + userInfo.token
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      await axios.post(`http://80.87.202.222:8000/api/cps/delete_cst`, cp_id, config)
  
      dispatch({
        type: CP_DELETE_CST_SUCCESS,
        payload: true
      })
    } catch (error) {
      dispatch({
        type: CP_DELETE_CST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const sortCPByDate = (cps, dateFlag) => async(dispatch) => {
    try {
      dispatch({type: CP_LIST_SORTEDBY_DATE})
  
      const data = cps.sort((a, b)=>{
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
        type: CP_LIST_SORT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_LIST_SORT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const sortCPById = (cps, cp_idFlag) => async(dispatch) => {
    try {
      dispatch({type: CP_LIST_SORTEDBY_CP_ID})
  
      const data = cps.sort((a, b)=>{
        if ((a.cp_id > b.cp_id) && cp_idFlag) {
          return -1;
        }
        if ((a.cp_id < b.cp_id) && cp_idFlag) {
          return 1;
        }
        if ((a.cp_id > b.cp_id) && !cp_idFlag) {
          return 1;
        }
        if ((a.cp_id < b.cp_id) && !cp_idFlag) {
          return -1;
        }
        return 0;
      })
  
      dispatch({
        type: CP_LIST_SORT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_LIST_SORT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }



  export const sortCPByTzId = (cps, tz_idFlag) => async(dispatch) => {
    try {
      dispatch({type: CP_LIST_SORTEDBY_TZ_ID})
  
      const data = cps.sort((a, b)=>{
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
        type: CP_LIST_SORT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_LIST_SORT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }


  export const sortCPByOrg = (cps, orgFlag) => async(dispatch) => {
    try {
      dispatch({type: CP_LIST_SORTEDBY_ORG})
  
      const data = cps.sort((a, b)=>{
        if ((a.org > b.org) && orgFlag) {
          return -1;
        }
        if ((a.org < b.org) && orgFlag) {
          return 1;
        }
        if ((a.org > b.org) && !orgFlag) {
          return 1;
        }
        if ((a.org < b.org) && !orgFlag) {
          return -1;
        }
        return 0;
      })
  
      dispatch({
        type: CP_LIST_SORT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_LIST_SORT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const listCpDownDoc = (name, cp_id) => async(dispatch) => {
    try { 
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: DOWN_CP_DOC_REQUEST})
      let auth = "Bearer " + userInfo.token
      const config = {
        headers: {
            "Authorization": auth,
        },
        mode: 'cors', 
        responseType: 'blob'
    }
  
      await axios.get(`http://80.87.202.222:8000/api/cps/doc/${name}/${cp_id}`, config)
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', name); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  
      dispatch({
        type: DOWN_CP_DOC_SUCCESS,
        payload: true
      })
    } catch (error) {
      dispatch({
        type: DOWN_CP_DOC_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const sortCPByStatus = (cps, cp_stFlag) => async(dispatch) => {
    try {
      dispatch({type: CP_LIST_SORTEDBY_STATUS})
  
      const data = cps.sort((a, b)=>{
        if ((a.cp_st > b.cp_st) && cp_stFlag) {
          return -1;
        }
        if ((a.cp_st < b.cp_st) && cp_stFlag) {
          return 1;
        }
        if ((a.cp_st > b.cp_st) && !cp_stFlag) {
          return 1;
        }
        if ((a.cp_st < b.cp_st) && !cp_stFlag) {
          return -1;
        }
        return 0;
      })
  
      dispatch({
        type: CP_LIST_SORT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CP_LIST_SORT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const cpFilterData = () => async(dispatch) => {
    try {
  
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      dispatch({type: GET_CP_FILTER_DATA_REQUEST})
      let auth = "Bearer " + userInfo.token
  
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        mode: 'cors'
    }
  
      const { data } = await axios.get('http://80.87.202.222:8000/api/cps/filter', config)
  
      dispatch({
        type: GET_CP_FILTER_DATA_SUCCESS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: GET_CP_FILTER_DATA_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }