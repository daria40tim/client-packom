import { CP_CREATE_FAIL, CP_CREATE_REQUEST, CP_CREATE_SUCCESS, CP_DELETE_CAL_FAIL, CP_DELETE_CAL_REQUEST, CP_DELETE_CAL_SUCCESS, CP_DELETE_CST_FAIL, CP_DELETE_CST_REQUEST, CP_DELETE_CST_SUCCESS, CP_DETAILES_FAIL, CP_DETAILES_REQUEST, CP_DETAILES_SUCCESS, CP_LIST_FAIL, CP_LIST_REQUEST, CP_LIST_SORTEDBY_CP_ID, CP_LIST_SORTEDBY_DATE, CP_LIST_SORTEDBY_ORG, CP_LIST_SORTEDBY_STATUS, CP_LIST_SORTEDBY_TZ_ID, CP_LIST_SORT_FAIL, CP_LIST_SUCCESS, CP_UPDATE_FAIL, CP_UPDATE_REQUEST, CP_UPDATE_SUCCESS, DOWN_CP_DOC_FAIL, DOWN_CP_DOC_REQUEST, DOWN_CP_DOC_SUCCESS } from "../constants/cpConstants"


export const cpListReducer = (state = {cps: []}, action) => {
    switch (action.type) {
        case CP_LIST_REQUEST:
            return {loading: true, cps: []}
        case CP_LIST_SUCCESS:
            return {loading: false, cps: action.payload}
        case CP_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const cpReducer = (state = {cp: { calendars:[], docs:[], costs:[], tz_calendars:[], tz_costs:[], cp_docs:[]}}, action) => {
    switch (action.type) {
        case CP_DETAILES_REQUEST:
            return {loading: true, ...state}
        case CP_DETAILES_SUCCESS:
            return {loading: false, cp: action.payload}
        case CP_DETAILES_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}


export const cpCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CP_CREATE_REQUEST:
            return {loading: true }
        case CP_CREATE_SUCCESS:
            return {loading: false, success: action.payload}
        case CP_CREATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const cpUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CP_UPDATE_REQUEST:
            return {loading: true }
        case CP_UPDATE_SUCCESS:
            return {loading: false, success: action.payload}
        case CP_UPDATE_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const cpDeleteCalReducer = (state = {}, action) => {
    switch (action.type) {
        case CP_DELETE_CAL_REQUEST:
            return {loading: true }
        case CP_DELETE_CAL_SUCCESS:
            return {loading: false, success: action.payload}
        case CP_DELETE_CAL_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}


export const cpDeleteCstReducer = (state = {}, action) => {
    switch (action.type) {
        case CP_DELETE_CST_REQUEST:
            return {loading: true }
        case CP_DELETE_CST_SUCCESS:
            return {loading: false, success: action.payload}
        case CP_DELETE_CST_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const cpDownDocReducer = (state = {}, action) => {
    switch (action.type) {
        case DOWN_CP_DOC_REQUEST:
            return {loading: true }
        case DOWN_CP_DOC_SUCCESS:
            return {loading: false, success: action.payload}
        case DOWN_CP_DOC_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: 
            return state
    }
}

export const cpListSortedReducer = (state = {cps:[]}, action) => {
    switch (action.type) {
        case CP_LIST_SORTEDBY_CP_ID:
            return {loading: false, cps: action.payload}
        case CP_LIST_SORTEDBY_DATE:
            return {loading: false, cps: action.payload}
        case CP_LIST_SORTEDBY_STATUS:
            return {loading: false, cps: action.payload}
        case CP_LIST_SORTEDBY_TZ_ID:
            return {loading: false, cps: action.payload}
        case CP_LIST_SORTEDBY_ORG:
            return {loading: false, cps: action.payload}
        case CP_LIST_SORT_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}