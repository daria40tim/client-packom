import { SELECT_ALL_FAIL, SELECT_ALL_REQUEST, SELECT_ALL_SUCCESS, SELECT_COUNTRY_FAIL, SELECT_COUNTRY_REQUEST, SELECT_COUNTRY_SUCCESS, SELECT_LOGIN_FAIL, SELECT_LOGIN_REQUEST, SELECT_LOGIN_SUCCESS, SELECT_SPECS_FAIL, SELECT_SPECS_REQUEST, SELECT_SPECS_SUCCESS, SELECT_PAY_CONDS_FAIL, SELECT_PAY_CONDS_REQUEST, SELECT_PAY_CONDS_SUCCESS } from "../constants/selectConstants"

export const selectListReducer = (state = {data: {metrics: [], groups : [], kinds: [], types: [], pay_conds: [], task_names: [], tasks: []}}, action) => {
    switch (action.type) {
        case SELECT_ALL_REQUEST:
            return {loading: true, ...state}
        case SELECT_ALL_SUCCESS:
            return {loading: false, data: action.payload}
        case SELECT_ALL_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const selectSpecsReducer = (state = {data: {specs: []}}, action) => {
    switch (action.type) {
        case SELECT_SPECS_REQUEST:
            return {loading: true, ...state}
        case SELECT_SPECS_SUCCESS:
            return {loading: false, data: action.payload}
        case SELECT_SPECS_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const selectCountriesReducer = (state = {data: {countries: []}}, action) => {
    switch (action.type) {
        case SELECT_COUNTRY_REQUEST:
            return {loading: true, ...state}
        case SELECT_COUNTRY_SUCCESS:
            return {loading: false, data: action.payload}
        case SELECT_COUNTRY_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const selectLoginReducer = (state = {data: {countries: []}}, action) => {
    switch (action.type) {
        case SELECT_LOGIN_REQUEST:
            return {loading: true, ...state}
        case SELECT_LOGIN_SUCCESS:
            return {loading: false, res: action.payload}
        case SELECT_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const selectPayCondsReducer = (state = {data: {countries: []}}, action) => {
    switch (action.type) {
        case SELECT_PAY_CONDS_REQUEST:
            return {loading: true, ...state}
        case SELECT_PAY_CONDS_SUCCESS:
            return {loading: false, data: action.payload}
        case SELECT_PAY_CONDS_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}