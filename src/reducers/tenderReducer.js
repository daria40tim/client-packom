import { TENDER_LIST_FAIL, TENDER_LIST_REQUEST, TENDER_LIST_SUCCESS, TENDER_REQUEST,TENDER_SUCCESS,TENDER_FAIL, FULLCOSTS_REQUEST, FULLCOSTS_SUCCESS, FULLCOSTS_FAIL, TENDER_DECIDE_REQUEST, TENDER_DECIDE_SUCCESS, TENDER_DECIDE_FAIL } from "../constants/tenderConstants"

export const tenderListReducer = (state = {tenders: []}, action) => {
    switch (action.type) {
        case TENDER_LIST_REQUEST:
            return {loading: true, tenders: []}
        case TENDER_LIST_SUCCESS:
            return {loading: false, tenders: action.payload}
        case TENDER_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const tenderReducer = (state = {tender: {}}, action) => {
    switch (action.type) {
        case TENDER_REQUEST:
            return {loading: true, ...state}
        case TENDER_SUCCESS:
            return {loading: false, tender: action.payload}
        case TENDER_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const fullCostsReducer = (state = {fcosts: []}, action) => {
    switch (action.type) {
        case FULLCOSTS_REQUEST:
            return { fcosts: []}
        case FULLCOSTS_SUCCESS:
            return {fcosts: action.payload}
        case FULLCOSTS_FAIL:
            return {error: action.payload}
        default: 
            return state
    }
}

export const tenderDecideReducer = (state = {tender: {}}, action) => {
    switch (action.type) {
        case TENDER_DECIDE_REQUEST:
            return {loading: true, ...state}
        case TENDER_DECIDE_SUCCESS:
            return {loading: false, tender: action.payload}
        case TENDER_DECIDE_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}