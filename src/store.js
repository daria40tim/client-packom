import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {orgAddReducer, orgDeleteTrusted, orgDownDocReducer, orgListReducer, orgReducer, orgUpdateReducer, selectOrgFilterDataReducer} from './reducers/orgReducer'
import {userLoginReducer, userRegisterReducer} from './reducers/userRedusers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { selectTechFilterDataReducer, tzCreateReducer, tzDeleteCalReducer, tzDeleteCstReducer, tzDownDocReducer, tzListReducer, tzListSortedReducer, tzReducer } from './reducers/tzReducer'
import { selectCountriesReducer, selectListReducer, selectLoginReducer, selectSpecsReducer } from './reducers/selectReducer'
import { cpCreateReducer, cpDeleteCalReducer, cpDeleteCstReducer, cpDownDocReducer, cpListReducer, cpReducer } from './reducers/cpReducers'
import { fullCostsReducer, tenderDecideReducer, tenderListReducer, tenderListSortedReducer, tenderReducer } from './reducers/tenderReducer'


const reducer = combineReducers({
    orgList: orgListReducer,
    orgDetails: orgReducer,
    userLogin: userLoginReducer,
    orgUpdate: orgUpdateReducer, 
    userRegister: userRegisterReducer,
    addOrg: orgAddReducer,
    tzList: tzListReducer,
    tzDetails: tzReducer,
    selectList: selectListReducer,
    tzCreate: tzCreateReducer,
    calDelete: tzDeleteCalReducer,
    cstDelete: tzDeleteCstReducer,
    cpList: cpListReducer,
    cpDetails: cpReducer,
    cpCreate: cpCreateReducer,
    cpCalDelete: cpDeleteCalReducer, 
    cpCstDelete: cpDeleteCstReducer,
    tenderList: tenderListReducer,
    tenderDetails: tenderReducer,
    fullCosts: fullCostsReducer,  
    decideTender: tenderDecideReducer, 
    tzListSorted: tzListSortedReducer,
    specsList: selectSpecsReducer, 
    orgDocDownload: orgDownDocReducer,
    cpDocDownload: cpDownDocReducer,
    tzDocDownload: tzDownDocReducer,
    countryList: selectCountriesReducer,
    loginDoubled: selectLoginReducer,
    delTrusted: orgDeleteTrusted,
    orgFilterData: selectOrgFilterDataReducer,
    tenderListSorted: tenderListSortedReducer,
    techFilterData: selectTechFilterDataReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
    userLogin: {userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store