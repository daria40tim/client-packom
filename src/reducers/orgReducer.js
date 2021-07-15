import {ORG_LIST_FAIL, ORG_LIST_SUCCESS, ORG_LIST_REQUEST, ORG_FAIL, ORG_REQUEST, ORG_SUCCESS, ORG_LIST_SORTEDBY_NAME, ORG_LIST_SORTEDBY_GROUP, ORG_LIST_SORT_FAIL, ORG_LIST_SORTEDBY_SPEC, ORG_LIST_SORTEDBY_COUNTRY, ORG_UPDATE_REQUEST, ORG_UPDATE_SUCCESS, ORG_UPDATE_FAIL, ADD_ORG_REQUEST, ADD_ORG_SUCCESS, ADD_ORG_FAIL, ADD_ORG_DOC_REQUEST, ADD_ORG_DOC_SUCCESS, ADD_ORG_DOC_FAIL, DOWN_ORG_DOC_REQUEST, DOWN_ORG_DOC_SUCCESS, DOWN_ORG_DOC_FAIL, DEL_TRUSTED_ORG_REQUEST, DEL_TRUSTED_ORG_SUCCESS, DEL_TRUSTED_ORG_FAIL, GET_ORG_FILTER_DATA_REQUEST, GET_ORG_FILTER_DATA_SUCCESS, GET_ORG_FILTER_DATA_FAIL} from '../constants/orgConstants'

export const orgListReducer = (state = {orgs: []}, action) => {
    switch (action.type) {
        case ORG_LIST_REQUEST:
            return {loading: true, orgs: []}
        case ORG_LIST_SUCCESS:
            return {loading: false, orgs: action.payload}
        case ORG_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const orgReducer = (state = {org: { orgs:[], docs:[], specs:[],}}, action) => {
    switch (action.type) {
        case ORG_REQUEST:
            return {loading: true, ...state}
        case ORG_SUCCESS:
            return {loading: false, org: action.payload}
        case ORG_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const orgListSortedReducer = (state = {orgs:[]}, action) => {
    switch (action.type) {
        case ORG_LIST_SORTEDBY_NAME:
            return {loading: false, orgs: action.payload}
        case ORG_LIST_SORTEDBY_GROUP:
            return {loading: false, orgs: action.payload}
        case ORG_LIST_SORTEDBY_SPEC:
            return {loading: false, orgs: action.payload}
        case ORG_LIST_SORTEDBY_COUNTRY:
            return {loading: false, orgs: action.payload}
        case ORG_LIST_SORT_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const orgUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORG_UPDATE_REQUEST:
            return {loading: true }
        case ORG_UPDATE_SUCCESS:
            return {loading: false, success: action.payload}
        case ORG_UPDATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const orgAddReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ORG_REQUEST:
            return {loading: true }
        case ADD_ORG_SUCCESS:
            return {loading: false, success: action.payload}
        case ADD_ORG_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const orgAddDocReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ORG_DOC_REQUEST:
            return {loading: true }
        case ADD_ORG_DOC_SUCCESS:
            return {loading: false, success: action.payload}
        case ADD_ORG_DOC_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const orgDownDocReducer = (state = {}, action) => {
    switch (action.type) {
        case DOWN_ORG_DOC_REQUEST:
            return {loading: true }
        case DOWN_ORG_DOC_SUCCESS:
            return {loading: false, success: action.payload}
        case DOWN_ORG_DOC_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const orgDeleteTrusted = (state = {}, action) => {
    switch (action.type) {
        case DEL_TRUSTED_ORG_REQUEST:
            return {loading: true }
        case DEL_TRUSTED_ORG_SUCCESS:
            return {loading: false, success: true}
        case DEL_TRUSTED_ORG_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const selectOrgFilterDataReducer = (state = {data: {names: [], specs : [], countries: []}}, action) => {
    switch (action.type) {
        case GET_ORG_FILTER_DATA_REQUEST:
            return {loading: true, ...state}
        case GET_ORG_FILTER_DATA_SUCCESS:
            return {loading: false, data: action.payload}
        case GET_ORG_FILTER_DATA_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}