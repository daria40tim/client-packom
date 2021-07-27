import React, {useEffect, useState } from 'react';
import {Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from "react-input-mask";
import { listTechs, techFilterData } from '../actions/tzAction';

const status_cp = [
  { name: 'Не подано', id: 1}, 
  { name: 'Подано', id: 2},
  { name: 'Отклонено', id: 3}, 
  { name: 'Принято', id: 4},  
  { name: '-', id: 5},  
]

const status_tz = [
  { name: 'Активно', id: 1}, 
  { name: 'Архив', id: 2},
]

const status_tender = [
  { name: 'Сбор КП', id: 1}, 
  { name: 'Ожидает решения', id: 2},
  { name: 'Принято', id: 3}, 
  { name: 'Отменено', id: 4},  
]

const  TechFilters = () => {
  const [clients, setClients] = useState([])
  const [projs, setProjs] = useState([])
  const [tz_sts, setTz_sts] = useState([])
  const [tender_sts, setTender_sts] = useState([])
  const [cp_sts, setCp_sts] = useState([])
  const [s_date, setSDate] = useState('')
  const [e_date, setEDate] = useState('')


  const dispatch = useDispatch()
  
  const filterData = useSelector(state => state.techFilterData)

  useEffect(() => {dispatch(techFilterData())}, [dispatch])

  const {data} = filterData

  const onClick = (e) => {
    dispatch(listTechs(s_date, e_date, clients, projs, tz_sts, tender_sts, cp_sts))
  }
  const onClickClean = (e) => {
    const elements = document.getElementsByName("check")
    elements.forEach(element => {
      element.checked = false
    });
    setSDate('')
    setEDate('')
    setClients([])
    setProjs([])
    setTz_sts([])
    setTender_sts([])
    setCp_sts([])
  }

  const onChangeClient =(e) => {
    if(e.target.checked){
      clients.push(parseInt(e.target.value))
      }
    else{
      const index = clients.indexOf(e.target.value);
        if (index > -1) {
          clients.splice(index, 1);
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
  const onChangeTZSTS =(e) => {
    if(e.target.checked){
      tz_sts.push(parseInt(e.target.value))
      }
    else{
      const index = tz_sts.indexOf(e.target.value);
        if (index > -1) {
          tz_sts.splice(index, 1);
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
        Статус тендера
      </button>
    </h2>
    {status_tender ? status_tender.map((item) => {
      return(
        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeTenderSTS}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Статус ТЗ
      </button>
    </h2>
    {status_tz ? status_tz.map((item) => {
      return(
        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
      <div className="accordion-body names">
      <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeTZSTS}></Form.Check>
      </div>
    </div>
      )
    }):<p></p>}
    </div>
    <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
        Клиент
      </button>
    </h2>
    {data.clients ? data.clients.map((item) => {
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
        Дата создания
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

  export default TechFilters