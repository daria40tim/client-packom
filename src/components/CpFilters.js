import React, {useEffect, useState } from 'react';
import {Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from "react-input-mask";
import { cpFilterData, listCPs } from '../actions/cpAction';

const status_cp = [
  { name: 'Активно', id: 1}, 
  { name: 'Архив', id: 2},
  { name: 'Отклонено', id: 3}, 
  { name: 'Принято', id: 4},    
]

const  CpFilters = () => {
  const [orgs, setOrgs] = useState([])
  const [tz_ids, setTzIds] = useState([])
  const [projs, setProjs] = useState([])
  const [cp_sts, setCp_sts] = useState([])
  const [s_date, setSDate] = useState('')
  const [e_date, setEDate] = useState('')


  const dispatch = useDispatch()
  
  const filterData = useSelector(state => state.cpFilterData)

  useEffect(() => {dispatch(cpFilterData())}, [dispatch])

  const {data} = filterData

  const onClick = (e) => {
    dispatch(listCPs(s_date, e_date, orgs, projs, tz_ids, cp_sts))
  }
  const onClickClean = (e) => {
    const elements = document.getElementsByName("check")
    elements.forEach(element => {
      element.checked = false
    });
    setSDate('')
    setEDate('')
    setOrgs([])
    setProjs([])
    setTzIds([])
    setCp_sts([])
  }

  const onChangeClient =(e) => {
    if(e.target.checked){
      orgs.push(parseInt(e.target.value))
      }
    else{
      const index = orgs.indexOf(e.target.value);
        if (index > -1) {
          orgs.splice(index, 1);
        }
    }
  }
  const onChangeProjs =(e) => {
    if(e.target.checked){
      projs.push(parseInt(e.target.value))
      }
    else{
      const index = projs.indexOf(e.target.value);
        if (index > -1) {
          projs.splice(index, 1);
        }
    }
  }
  const onChangeTzIds =(e) => {
    if(e.target.checked){
      tz_ids.push(parseInt(e.target.value))
      }
    else{
      const index = tz_ids.indexOf(e.target.value);
        if (index > -1) {
          tz_ids.splice(index, 1);
        }
    }
  }
  const onChangeCPSTS =(e) => {
    if(e.target.checked){
      cp_sts.push(parseInt(e.target.value))
      }
    else{
      const index = cp_sts.indexOf(e.target.value);
        if (index > -1) {
          cp_sts.splice(index, 1);
        }
    }
  }

    return( 
      <div className="filter">
        <div className='enter'>
        <button type="button" className="btn btn-outline-dark" onClick={onClick}>Применить</button>
        <button type="button" className="btn btn-outline-dark" onClick={onClickClean}>Очистить</button>
        </div>
<div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
        Статус КП
      </button>
    </h2>
    {status_cp ? status_cp.map((item) => {
      return(
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeCPSTS}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Номер ТЗ
      </button>
    </h2>
    {data.tz_ids ? data.tz_ids.map((item) => {
      return(
        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeTzIds}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
        Поставщик
      </button>
    </h2>
    {data.orgs ? data.orgs.map((item) => {
      return(
        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFour">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeClient}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
        Проект
      </button>
    </h2>
    {data.projs ? data.projs.map((item) => {
      return(
        <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFive">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeProjs}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingSix">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
        Дата КП
      </button>
    </h2>
        <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingSix">
      <div className="accordion-body names">
      <label>С</label>
      <InputMask value={s_date} onChange={(e)=>setSDate(e.target.value)} mask="9999-99-99" className='cr_input' alwaysShowMask='true'></InputMask>
      <label>По</label>
      <InputMask value={e_date} onChange={(e)=>setEDate(e.target.value)} mask="9999-99-99" className='cr_input' alwaysShowMask='true'></InputMask>
      </div>
    </div>
    </div>
</div>
    </div>
)
  }

  export default CpFilters