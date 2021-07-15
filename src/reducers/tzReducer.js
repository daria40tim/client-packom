import { DOWN_TZ_DOC_FAIL, DOWN_TZ_DOC_REQUEST, DOWN_TZ_DOC_SUCCESS, TZ_CREATE_FAIL, TZ_CREATE_REQUEST, TZ_CREATE_SUCCESS, TZ_DELETE_CAL_FAIL, TZ_DELETE_CAL_REQUEST, TZ_DELETE_CAL_SUCCESS, TZ_DELETE_CST_FAIL, TZ_DELETE_CST_REQUEST, TZ_DELETE_CST_SUCCESS, TZ_DETAILS_FAIL, TZ_DETAILS_REQUEST, TZ_DETAILS_SUCCESS, TZ_FILE_UPLOAD_FAIL, TZ_FILE_UPLOAD_REQUEST, TZ_FILE_UPLOAD_SUCCESS, TZ_LIST_FAIL, TZ_LIST_REQUEST, TZ_LIST_SORTEDBY_CLIENT, TZ_LIST_SORTEDBY_DATE, TZ_LIST_SORTEDBY_END_DATE, TZ_LIST_SORTEDBY_STATUS, TZ_LIST_SORTEDBY_TZ_ID, TZ_LIST_SORT_FAIL, TZ_LIST_SUCCESS, TZ_UPDATE_FAIL, TZ_UPDATE_REQUEST, TZ_UPDATE_SUCCESS } from '../constants/tzConstants'

export const tzListReducer = (state = {data: {techs: [], cps: []}}, action) => {
    switch (action.type) {
        case TZ_LIST_REQUEST:
            return {loading: true, ...state}
        case TZ_LIST_SUCCESS:
            return {loading: false, data: action.payload}
        case TZ_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}



export const tzReducer = (state = {tech: { calendars:[], docs:[], costs:[]}}, action) => {
    switch (action.type) {
        case TZ_DETAILS_REQUEST:
            return {loading: true, ...state}
        case TZ_DETAILS_SUCCESS:
            return {loading: false, tech: action.payload}
        case TZ_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const tzCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TZ_CREATE_REQUEST:
            return {loading: true }
        case TZ_CREATE_SUCCESS:
            return {loading: false, success: action.payload}
        case TZ_CREATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const tzDeleteCalReducer = (state = {}, action) => {
    switch (action.type) {
        case TZ_DELETE_CAL_REQUEST:
            return {loading: true }
        case TZ_DELETE_CAL_SUCCESS:
            return {loading: false, success: action.payload}
        case TZ_DELETE_CAL_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}


export const tzDeleteCstReducer = (state = {}, action) => {
    switch (action.type) {
        case TZ_DELETE_CST_REQUEST:
            return {loading: true }
        case TZ_DELETE_CST_SUCCESS:
            return {loading: false, success: action.payload}
        case TZ_DELETE_CST_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}


export const tzUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case TZ_UPDATE_REQUEST:
            return {loading: true }
        case TZ_UPDATE_SUCCESS:
            return {loading: false, success: action.payload}
        case TZ_UPDATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}


export const tzListSortedReducer = (state = {techs:[]}, action) => {
    switch (action.type) {
        case TZ_LIST_SORTEDBY_CLIENT:
            return {loading: false, techs: action.payload}
        case TZ_LIST_SORTEDBY_DATE:
            return {loading: false, techs: action.payload}
        case TZ_LIST_SORTEDBY_END_DATE:
            return {loading: false, techs: action.payload}
        case TZ_LIST_SORTEDBY_TZ_ID:
            return {loading: false, techs: action.payload}
        case TZ_LIST_SORTEDBY_STATUS:
            return {loading: false, techs: action.payload}
        case TZ_LIST_SORT_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const tzUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case TZ_FILE_UPLOAD_REQUEST:
            return {loading: true }
        case TZ_FILE_UPLOAD_SUCCESS:
            return {loading: false, success: action.payload}
        case TZ_FILE_UPLOAD_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const tzDownDocReducer = (state = {}, action) => {
    switch (action.type) {
        case DOWN_TZ_DOC_REQUEST:
            return {loading: true }
        case DOWN_TZ_DOC_SUCCESS:
            return {loading: false, success: action.payload}
        case DOWN_TZ_DOC_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}