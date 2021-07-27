import {TZ_LIST_FAIL, TZ_LIST_SUCCESS, TZ_LIST_SORT_SUCCESS, TZ_LIST_SORTEDBY_TZ_ID, TZ_LIST_SORTEDBY_STATUS, TZ_LIST_REQUEST, TZ_DETAILS_REQUEST, TZ_DETAILS_SUCCESS, TZ_DETAILS_FAIL, TZ_CREATE_REQUEST, TZ_CREATE_SUCCESS, TZ_CREATE_FAIL, TZ_DELETE_CAL_REQUEST, TZ_DELETE_CAL_SUCCESS, TZ_DELETE_CAL_FAIL, TZ_DELETE_CST_REQUEST, TZ_DELETE_CST_SUCCESS, TZ_DELETE_CST_FAIL, TZ_UPDATE_REQUEST, TZ_UPDATE_SUCCESS, TZ_UPDATE_FAIL, TZ_LIST_SORTEDBY_CLIENT, TZ_LIST_SORT_FAIL, TZ_LIST_SORTEDBY_DATE, TZ_LIST_SORTEDBY_END_DATE, TZ_FILE_UPLOAD_REQUEST, TZ_FILE_UPLOAD_SUCCESS, TZ_FILE_UPLOAD_FAIL, DOWN_TZ_DOC_REQUEST, DOWN_TZ_DOC_SUCCESS, DOWN_TZ_DOC_FAIL, TZ_LIST_SORTEDBY_CP_ST, TZ_LIST_SORTEDBY_TENDER_ST, GET_TECH_FILTER_DATA_REQUEST, GET_TECH_FILTER_DATA_SUCCESS, GET_TECH_FILTER_DATA_FAIL } from '../constants/tzConstants'
import axios from 'axios'

export const listTechs = (s_date, e_date, clients, projs, tz_sts, tender_sts, cp_sts) => async(dispatch) => {
  try {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_LIST_REQUEST})
    let auth = "Bearer " + userInfo.token


    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.post('http://80.87.202.222:8000/api/techs/job/', {s_date, e_date, clients, projs, tz_sts, tender_sts, cp_sts} ,config)

    dispatch({
      type: TZ_LIST_SUCCESS,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listTechDetails = (id) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    dispatch({type: TZ_DETAILS_REQUEST})
    
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.get(`http://80.87.202.222:8000/api/techs/${id}`, config)

    dispatch({
      type: TZ_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createTZ = (proj, group, type, kind, task, pay_cond, end_date, privacy, info, cal, cst, date, docs) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_CREATE_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/techs/`, {proj, group, type, kind, task, pay_cond, end_date, privacy, info, cal, cst, date, docs}, config)

    dispatch({
      type: TZ_CREATE_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TZ_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteCal = (tz_id, task_name, history) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_DELETE_CAL_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/techs/delete_cal`, {tz_id, task_name, history}, config)

    dispatch({
      type: TZ_DELETE_CAL_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TZ_DELETE_CAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const deleteCst = (tz_id, task, history) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_DELETE_CST_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/techs/delete_cst`, {tz_id, task, history}, config)

    dispatch({
      type: TZ_DELETE_CST_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TZ_DELETE_CST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const tzUpdate = (tz_id, proj, group, type, kind, task, pay_cond, end_date, info, cal, cst, history) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_UPDATE_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/techs/${tz_id}`, {proj, group, type, kind, task, pay_cond, end_date, info, cal, cst, history}, config)

    dispatch({
      type: TZ_UPDATE_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TZ_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const sortTechsByClient = (techs, clientFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_CLIENT})

    const data = techs.sort((a, b)=>{
      if ((a.client > b.client) && clientFlag) {
        return -1;
      }
      if ((a.client < b.client) && clientFlag) {
        return 1;
      }
      if ((a.client > b.client) && !clientFlag) {
        return 1;
      }
      if ((a.client < b.client) && !clientFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const sortTechsByDate = (techs, dateFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_DATE})

    const data = techs.sort((a, b)=>{
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
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const sortTechsByEndDate = (techs, end_dateFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_END_DATE})

    const data = techs.sort((a, b)=>{
      if ((Date.parse(a.end_date) > Date.parse(b.end_date) ) && end_dateFlag) {
        return -1;
      }
      if ((Date.parse(a.end_date)  < Date.parse(b.end_date)) && end_dateFlag) {
        return 1;
      }
      if ((Date.parse(a.end_date)  > Date.parse(b.end_date)) && !end_dateFlag) {
        return 1;
      }
      if ((Date.parse(a.end_date)  < Date.parse(b.end_date)) && !end_dateFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const sortTechsByStatus = (techs, statusFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_STATUS})

    const data = techs.sort((a, b)=>{
      if ((Date.parse(a.end_date) > Date.parse(b.end_date) ) && statusFlag) {
        return -1;
      }
      if ((Date.parse(a.end_date)  < Date.parse(b.end_date)) && statusFlag) {
        return 1;
      }
      if ((Date.parse(a.end_date)  > Date.parse(b.end_date)) && !statusFlag) {
        return 1;
      }
      if ((Date.parse(a.end_date)  < Date.parse(b.end_date)) && !statusFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const sortTechsByTzId = (techs, tz_idFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_TZ_ID})

    const data = techs.sort((a, b)=>{
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
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const uploadFile = (formData) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: TZ_FILE_UPLOAD_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/techs/docs`, {formData}, config)

    dispatch({
      type: TZ_FILE_UPLOAD_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: TZ_FILE_UPLOAD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listTzDownDoc = (name, tz_id) => async(dispatch) => {
  try { 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: DOWN_TZ_DOC_REQUEST})
    let auth = "Bearer " + userInfo.token
    const config = {
      headers: {
          "Authorization": auth,
      },
      mode: 'cors', 
      responseType: 'blob'
  }

    await axios.get(`http://80.87.202.222:8000/api/techs/doc/${name}/${tz_id}`, config)
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
      type: DOWN_TZ_DOC_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: DOWN_TZ_DOC_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortTechsByCpSt = (techs, cp_stFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_CP_ST})

    const data = techs.sort((a, b)=>{
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
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortTechsByTenderSt = (techs, tender_stFlag) => async(dispatch) => {
  try {
    dispatch({type: TZ_LIST_SORTEDBY_TENDER_ST})

    const data = techs.sort((a, b)=>{
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
      type: TZ_LIST_SORT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TZ_LIST_SORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const techFilterData = () => async(dispatch) => {
  try {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: GET_TECH_FILTER_DATA_REQUEST})
    let auth = "Bearer " + userInfo.token


    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.get('http://80.87.202.222:8000/api/techs/filter', config)

    dispatch({
      type: GET_TECH_FILTER_DATA_SUCCESS,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: GET_TECH_FILTER_DATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}