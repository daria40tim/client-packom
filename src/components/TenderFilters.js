import React, {useEffect, useState } from 'react';
import {Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from "react-input-mask";
import { cpFilterData, listCPs } from '../actions/cpAction';
import { listTenders, tenderFilterData } from '../actions/tenderAction';

const status_cp = [
  { name: 'Сбор КП', id: 1}, 
  { name: 'Ожидает решения', id: 2},
  { name: 'Архив', id: 3}, 
  { name: 'Отменен', id: 4},    
]

const  TenderFilters = () => {
  const [tz_ids, setTzIds] = useState([])
  const [projs, setProjs] = useState([])
  const [tender_sts, setTender_sts] = useState([])
  const [s_date, setSDate] = useState('')
  const [e_date, setEDate] = useState('')


  const dispatch = useDispatch()
  
  const filterData = useSelector(state => state.tenderFilterData)

  useEffect(() => {dispatch(tenderFilterData())}, [dispatch])

  const {data} = filterData

  const onClick = (e) => {
    dispatch(listTenders(s_date, e_date, projs, tz_ids, tender_sts))
  }
  const onClickClean = (e) => {
    const elements = document.getElementsByName("check")
    elements.forEach(element => {
      element.checked = false
    });
    setSDate('')
    setEDate('')
    setProjs([])
    setTzIds([])
    setTender_sts([])
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
  const onChangeTenderSTS =(e) => {
    if(e.target.checked){
      tender_sts.push(parseInt(e.target.value))
      }
    else{
      const index = tender_sts.indexOf(e.target.value);
        if (index > -1) {
          tender_sts.splice(index, 1);
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
        Статус тендера
      </button>
    </h2>
    {status_cp ? status_cp.map((item) => {
      return(
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeTenderSTS}></Form.Check>
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
        Дата решения
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

  export default TenderFilters