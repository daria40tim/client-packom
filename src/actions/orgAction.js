import { ORG_FAIL, ORG_LIST_FAIL, ORG_LIST_REQUEST, ORG_LIST_SORTEDBY_NAME, ORG_LIST_SUCCESS, ORG_REQUEST, ORG_SUCCESS, ORG_UPDATE_REQUEST, ORG_UPDATE_FAIL, ORG_UPDATE_SUCCESS, ADD_ORG_REQUEST, ADD_ORG_SUCCESS, ADD_ORG_FAIL, ORG_LIST_SORTEDBY_SPEC, ORG_LIST_SORTEDBY_COUNTRY, ORG_LIST_SORTEDBY_GROUP, ADD_ORG_DOC_REQUEST, ADD_ORG_DOC_SUCCESS, ADD_ORG_DOC_FAIL, DOWN_ORG_DOC_REQUEST, DOWN_ORG_DOC_SUCCESS, DOWN_ORG_DOC_FAIL, DEL_TRUSTED_ORG_REQUEST, DEL_TRUSTED_ORG_SUCCESS, DEL_TRUSTED_ORG_FAIL, GET_ORG_FILTER_DATA_REQUEST, GET_ORG_FILTER_DATA_SUCCESS, GET_ORG_FILTER_DATA_FAIL } from '../constants/orgConstants'
import axios from 'axios'

export const listOrg = (names, groups, specs, countries) => async(dispatch) => {
  try {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: ORG_LIST_REQUEST})
    let auth = "Bearer " + userInfo.token


    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.post('http://80.87.202.222:8000/api/orgs/job/', {names, groups, specs, countries}, config)

    dispatch({
      type: ORG_LIST_SUCCESS,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: ORG_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
 

export const listOrgDetails = (id) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    dispatch({type: ORG_REQUEST})
    
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.get(`http://80.87.202.222:8000/api/orgs/${id}`, config)

    dispatch({
      type: ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const sortOrgsByName = (orgs, nameFlag) => async(dispatch) => {
  try {
    dispatch({type: ORG_LIST_SORTEDBY_NAME})

    const data = orgs.sort((a, b)=>{
      if ((a.name > b.name) && nameFlag) {
        return -1;
      }
      if ((a.name < b.name) && nameFlag) {
        return 1;
      }
      if ((a.name > b.name) && !nameFlag) {
        return 1;
      }
      if ((a.name < b.name) && !nameFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listOrgDetailsUpdate = (adress, phone, email, site, spec, password, info, history) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: ORG_UPDATE_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.put(`http://80.87.202.222:8000/api/orgs/`, {adress, phone, email, site, spec, password, info, history}, config)

    dispatch({
      type: ORG_UPDATE_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: ORG_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listOrgAdd = (id) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: ADD_ORG_REQUEST})
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    await axios.put(`http://80.87.202.222:8000/api/orgs/${id}`,{}, config)

    dispatch({
      type: ADD_ORG_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: ADD_ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortOrgsByCountry = (orgs, countryFlag) => async(dispatch) => {
  try {
    dispatch({type: ORG_LIST_SORTEDBY_COUNTRY})

    const data = orgs.sort((a, b)=>{
      if ((a.country > b.country) && countryFlag) {
        return -1;
      }
      if ((a.country < b.country) && countryFlag) {
        return 1;
      }
      if ((a.country > b.country) && !countryFlag) {
        return 1;
      }
      if ((a.country < b.country) && !countryFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortOrgsBySpec = (orgs, specFlag) => async(dispatch) => {
  try {
    dispatch({type: ORG_LIST_SORTEDBY_SPEC})

    const data = orgs.sort((a, b)=>{
      if ((a.spec > b.spec) && specFlag) {
        return -1;
      }
      if ((a.spec < b.spec) && specFlag) {
        return 1;
      }
      if ((a.spec > b.spec) && !specFlag) {
        return 1;
      }
      if ((a.spec < b.spec) && !specFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const sortOrgsByGroup = (orgs, groupFlag) => async(dispatch) => {
  try {
    dispatch({type: ORG_LIST_SORTEDBY_GROUP})

    const data = orgs.sort((a, b)=>{
      if ((a.group > b.group) && groupFlag) {
        return -1;
      }
      if ((a.group < b.group) && groupFlag) {
        return 1;
      }
      if ((a.group > b.group) && !groupFlag) {
        return 1;
      }
      if ((a.group < b.group) && !groupFlag) {
        return -1;
      }
      return 0;
    })

    dispatch({
      type: ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listOrgAddDoc = (data) => async(dispatch) => {
  try { 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: ADD_ORG_DOC_REQUEST})
    let auth = "Bearer " + userInfo.token
    const config = {
      headers: {
          "Authorization": auth,
          ...data.getHeaders()
      },
      mode: 'cors'
  }

    await axios.post(`http://80.87.202.222:8000/api/orgs/docs`,{data: data}, config)

    dispatch({
      type: ADD_ORG_DOC_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: ADD_ORG_DOC_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listOrgDownDoc = (name, o_id) => async(dispatch) => {
  try { 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: DOWN_ORG_DOC_REQUEST})
    let auth = "Bearer " + userInfo.token
    const config = {
      headers: {
          "Authorization": auth,
      },
      mode: 'cors', 
      responseType: 'blob'
  }

    await axios.get(`http://80.87.202.222:8000/api/orgs/doc/${name}/${o_id}`, config)
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
      type: DOWN_ORG_DOC_SUCCESS,
      payload: true
    })
  } catch (error) {
    dispatch({
      type: DOWN_ORG_DOC_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteTrusted = (id) => async(dispatch) => {
  try {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    dispatch({type: DEL_TRUSTED_ORG_REQUEST})
    
    let auth = "Bearer " + userInfo.token

    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.get(`http://80.87.202.222:8000/api/orgs/delete/${id}`, config)

    dispatch({
      type: DEL_TRUSTED_ORG_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: DEL_TRUSTED_ORG_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const orgFilterData = () => async(dispatch) => {
  try {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    dispatch({type: GET_ORG_FILTER_DATA_REQUEST})
    let auth = "Bearer " + userInfo.token


    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      mode: 'cors'
  }

    const { data } = await axios.get('http://80.87.202.222:8000/api/orgs/filter', config)

    dispatch({
      type: GET_ORG_FILTER_DATA_SUCCESS,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: GET_ORG_FILTER_DATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}