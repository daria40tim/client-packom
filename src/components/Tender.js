import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { decideTender, listTenderDetails } from '../actions/tenderAction';
  
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
  const { tender} = tenderDetails

  const [check, setChecked] = useState(0)
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
        <div  className='one_item'>
          <div>
        <div className='table-responsive'>
        <table className="table w-50" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'><h2>Общие данные</h2></td>
            </tr>
            <tr align='justify'>
              <td>Дата тендера</td>
              <td>{tender.date ? tender.date.slice(0,10) :''}
                  </td>
            </tr>
            <tr align='justify'>
              <td>Клиент</td>
              <td>
                  <Link to={`/orgs/link/${userInfo.o_id}`} >
                  {tender.client}
                </Link>
                </td>
            </tr>
            <tr align='justify'>
              <td>Проект</td>
              <td>{tender.proj}</td>
            </tr>
            <tr align='justify'>
              <td>Вид задания</td>
              <td>{tender.task}</td>
            </tr>
            <tr align='justify'>
              <td>Номер ТЗ</td>
              <td>  <Link to={`/techs/link/${tender.tz_id}`} >
                  {tender.tz_id}
                </Link></td>
            </tr>
            <tr align='justify'>
              <td>Количество собранных КП</td>
              <td>{tender.cps ? tender.cps.length : 0}</td>
            </tr>
            <tr align='justify'>
              <td>Максимальное КП</td>
              <td>{tender.max_cp}</td>
            </tr>
            <tr align='justify'>
              <td>Минимальное КП</td>
              <td>{tender.min_cp}</td>
            </tr>
            <tr align='justify'>
              <td>Принятое КП</td>
              <td> 
              {tender.selected_cp !== 0 ? <Link to={`/cps/link/${tender.cp_id}`} >
                  {tender.selected_cp}
                </Link> : 'КП не выбрано' }</td>
            </tr>
          </tbody>
        </table>
        </div>

         
          <h5 className="text-start">Тендерная таблица</h5> 
          {!tender.cps ? <h5>Коммерческих предложений не поступало</h5>:
          <table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th></th>
        <th>Кол-во</th>
        <th>Единицы измерения</th>
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
            {tender.selected_cp === 0 ? tender.cps ? tender.cps.map((item, i)=>{return (
            <td>
                <input className="form-check-input" type="radio" name="gridRadios" id={item.cp_id} value={item.cp_id} onChange={(e)=>{setChecked(e.target.value)}}/>
                    </td>)}): <p></p> : <p></p>}
        </tr>
    </tbody>
  </table> }

<div className="enter">
  {!tender.active ? 'Тендер был отменен':
  tender.selected_cp === 0 ? !tender.cps ?<button type="button" className="btn btn-outline-dark" onClick={onClickDecline}><h5>Отменить тендер</h5></button> : tender.date> Date.now() ? <button type="button" onClick={onClickDecide} className="btn btn-outline-dark">Принять решение досрочно</button>
: <button type="button" className="btn btn-outline-dark" onClick={onClickDecide}><h5>Принять решение</h5></button>: <p></p>}
</div>
</div>
</div>
)
  }

  const Tender =withRouter(Tec) 
  export default Tender;