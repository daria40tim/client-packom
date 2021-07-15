import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { decideTender, listTenderDetails } from '../actions/tenderAction';
let data =
    {'date': '14.01.2021',
    'selected_cp': '1', 
    "cp_o_id": "1",
    "tz_o_id": "2",
    "cp_org": "Организация 3",
    "tz_org": "Организация 1", 
    "proj": "ГК 6040", 
    "task_name": "Изготовление серии", 
    "tz_id": '1', 
    "cp_count": "2", 
    "max_cp": '33000.00',
    "min_cp": "25500.00", 
    "selected_sum": "25500.00",
    "term": 3, 
    "docs": ["Пример.pdf", "1.doc"],
    "history":"",
    "info": "",
    "tz_calendars": ["Разработка концепта", "Изготовление серии", "Доставка"],
    "tz_costs": [
        {
            "cost_id": 2,
            "task": "Изготовление серии",
            "metr": "шт.",
            "count": 150,
            "tz_id": 25,
            "cp_id": 0,
            "ppu": "0",
            "sum": "0",
            "info": ""
        },
        {
            "cost_id": 3,
            "task": "Доставка",
            "metr": "рейс",
            "count": 1,
            "tz_id": 25,
            "cp_id": 0,
            "sum": "0",
            "ppu": "0",
            "info": ""
        }
    ],
    "cps":[
        {
            "cp_id": "1",
            "org": "Организация 3",
            "o_id": "1",
            "costs": [
                {
                    "task": "Изготовление серии",
                    "cost_sum": "22500.00"
                },
                {
                    "task": "Доставка",
                    "cost_sum": "3000.00"
                },
            ], 
            "sum": "25500.00",
            "sum_ppu": "170.00", 
            "pay_cond": "30% предоплата",
            "calendars":[1,1,1]
        },
        {
            "org": "Организация 5",
            "cp_id": "2",
            "o_id": "1",
            "costs": [
                {
                    "task": "Изготовление серии",
                    "cost_sum": "28000.00"
                },
                {
                    "task": "Доставка",
                    "cost_sum": "5000.00"
                },
            ], 
            "sum": "33000.00",
            "sum_ppu": "220.00", 
            "pay_cond": "100% постоплата",
            "calendars":[0, 2, 1]
               
        },
    ]
    }
  
    Date.prototype.getWeek = function() {
      var date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      var week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }


const Tec = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const tenderDetails = useSelector(state => state.tenderDetails)
  const {loading, error, tender} = tenderDetails

  const [costs, setCosts] = useState([])
  const [check, setChecked] = useState(0)
  let last = 0


  useEffect(() => {
    dispatch(listTenderDetails(match.params.tender_id))
  }, [dispatch, match])
  
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  useEffect(() => {

  })
  

  const onClickDecide = () => {
    dispatch(decideTender(parseInt(match.params.tender_id),  parseInt(check),  parseInt(tender.tz_id)))
    history.push('/tenders/')
  }

  const onClickDecline = () => {
    dispatch(decideTender(parseInt(match.params.tender_id),  parseInt(check), parseInt(tender.tz_id)))
    history.push('/tenders/')
  } 


    return(
        <div>
          <div>
        <div>
        <table className="table w-50 one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td scope="col" colSpan='2'><h5>Общие данные</h5></td>
            </tr>
            <tr align='justify'>
              <td scope="col">Дата тендера</td>
              <td scope="col">{tender.date}
                  </td>
            </tr>
            <tr align='justify'>
              <td scope="col">Клиент</td>
              <td scope="col">
                  <Link to={`/orgs/link/${userInfo.o_id}`} >
                  {tender.client}
                </Link>
                </td>
            </tr>
            <tr align='justify'>
              <td scope="col">Проект</td>
              <td scope="col">{tender.proj}</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Вид задания</td>
              <td scope="col">{tender.task}</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Номер ТЗ</td>
              <td scope="col">  <Link to={`/techs/link/${tender.tz_id}`} >
                  {tender.tz_id}
                </Link></td>
            </tr>
            <tr align='justify'>
              <td scope="col">Количество собранных КП</td>
              <td scope="col">{tender.cps ? tender.cps.length : 0}</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Максимальное КП</td>
              <td scope="col">{tender.max_cp}</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Минимальное КП</td>
              <td scope="col">{tender.min_cp}</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Принятое КП</td>
              <td scope="col"> 
              {tender.selected_cp != 0 ? <Link to={`/cps/link/${tender.cp_id}`} >
                  {tender.selected_cp}
                </Link> : 'КП не выбрано' }</td>
            </tr>
            <tr align='justify'>
              <td scope="col">Срок реализации проекта</td>
              <td scope="col">{new Date(tender.date).getWeek() + tender.term}</td>
            </tr>
          </tbody>
        </table>
        </div>

         
          <h5 className="text-start">Тендерная таблица</h5> 
          {!tender.cps ? <h5>Коммерческих предложений не поступало</h5>:
          <table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th scope="col"></th>
        <th scope="col">Кол-во</th>
        <th scope="col">Единицы измерения</th>
        {tender.cps ? tender.cps.map((item, i)=>{
        return (<th><Link to={`/cps/link/${item.cp_id}`}>{item.org}</Link></th>)}): <p></p>}
      </tr>
    </thead>
    <tbody>
        <tr colSpan='10000'>
            <td align='justify'><h5>Наименование операций</h5></td>
        </tr>
      
      {tender.tz_costs ?  tender.tz_costs.map((item, is)=>{
        return (<tr>
        <td align='justify'>{item.task}</td>
        <td>{item.count}</td>
        <td>{item.metr}</td>
        {tender.cps ? tender.cps.map((item, i)=>{return (<td>{item.costs[is].cost_sum }</td>)}):<p></p>}

        </tr>)}): <p></p>}
        
        <tr>
            <td align='justify'>Всего</td>
            <td></td>
            <td></td>
            {tender.cps ? tender.cps.map((item, i)=>{
        return (<td>{item.sum}</td>)}):<p></p>}
        </tr>
        <tr>
            <td align='justify'>Условия оплаты</td>
            <td></td>
            <td></td>
            {tender.cps ? tender.cps.map((item, i)=>{return (<td>{item.pay_cond}</td>)}) : <p></p>}
        </tr>
        <tr colSpan='10000'>
            <td align='justify'><h5>График выполнения работ</h5></td>
        </tr>
            {tender.tz_calendars ? tender.tz_calendars.map((item, is)=>{return (
                <tr>
                <td align='justify'>{item}</td>
                <td></td>
                <td></td>
                {tender.cps ? tender.cps.map((item, i)=>{return (<td>{item.calendars[is] + " КН"}</td>)}):<p></p>}
                </tr>)
            }): <p></p>}
        <tr>
            <td align='justify'> <h5>Решение</h5></td>
            <td></td>
            <td></td>
            {tender.selected_cp == 0 ? tender.cps ? tender.cps.map((item, i)=>{return (
            <td>
                <input className="form-check-input" type="radio" name="gridRadios" id={item.cp_id} value={item.cp_id} onChange={(e)=>{setChecked(e.target.value)}}/>
                    </td>)}): <p></p> : <p></p>}
        </tr>
    </tbody>
  </table> }

  {!tender.active ? 'Тендер был отменен':
  tender.selected_cp == 0 ? !tender.cps ?<button type="button" className="btn btn-outline-dark" onClick={onClickDecline}>Отменить тендер</button> : tender.date> Date.now() ? <button type="button" onClick={onClickDecide} className="btn btn-outline-dark">Принять решение досрочно</button>
: <button type="button" className="btn btn-outline-dark" onClick={onClickDecide}>Принять решение</button>: <p></p>}
</div>
</div>
)
  }

  const Tender =withRouter(Tec) 
  export default Tender;