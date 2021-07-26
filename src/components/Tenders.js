import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { listTenders, sortTendersByDate, sortTendersByStatus, sortTendersByTenderId, sortTendersByTZId } from '../actions/tenderAction';
import Filters from './Filters';
import Message from './Message';


const Tender = () => {

    const dispatch = useDispatch()

    const tenderList = useSelector(state => state.tenderList)
    const [tz_idFlag, setTzIdFlag] = useState(true)
    const [dateFlag, setDateFlag] = useState(true)
    const [tender_idFlag, setTenderIdFlag] = useState(true)
    const [tender_stFlag, setStatusFlag] = useState(true)

    const onClickTenderId = (e) => {
      dispatch(sortTendersByTenderId(tenders, tender_idFlag))
      setTenderIdFlag(!tender_idFlag)
    }
    const onClickTZId = (e) => {
      dispatch(sortTendersByTZId(tenders, tz_idFlag))
      setTzIdFlag(!tz_idFlag)
    }
    const onClickDate = (e) => {
      dispatch(sortTendersByDate(tenders, dateFlag))
      setDateFlag(!dateFlag)
    }
    const onClickStatus = (e) => {
      dispatch(sortTendersByStatus(tenders, tender_stFlag))
      setStatusFlag(!tender_stFlag)
    }
    
  
    useEffect(() => {dispatch(listTenders())}, [dispatch])
    const {tenders} = tenderList

    return(
      <div>
         <table className="table main_table">
          <tr>
            <td valign="top" align="justify">
      <Filters></Filters>
</td>


<td align='justify' valign="top">
      <div className='list'>
    <table className="table main_t">
    <thead>
      <tr className="org_head">
        <th scope="col">
        <label>Номер решения</label>
          <button onClick={onClickTenderId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tender_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">
        <label>Номер ТЗ</label>
          <button onClick={onClickTZId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tz_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Дата решения</label>
          <button onClick={onClickDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <p>Проект</p>
          </th>
        <th scope="col">Группа упаковки</th>
        <th scope="col">Тип упаковки</th>
        <th scope="col">Вид упаковки</th>
        <th scope="col">Вид задания</th>
        <th scope="col">
        <label>Статус тендера</label>
          <button onClick={onClickStatus} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tender_stFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
      </tr>
    </thead>
    <tbody>
      {tenders ? tenders.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/tenders/link/${item.tender_id}`} >
            {item.tender_id}
          </Link>
        </td>
        <td><Link to={`/techs/link/${item.tz_id}`} >
            {item.tz_id}
          </Link></td>
        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
        <td>{item.proj}</td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task}</td>
        <td>{item.tender_st}</td>
      </tr>)}): <Message>У вас еще нет тендерных решений</Message>}
    </tbody>
  </table> 
</div>
</td>
</tr>
</table>
</div>
)
  }

  const Tenders =withRouter(Tender) 
  export default Tenders;




  /*<div className="filter">
      <form class="form-inline">




      <p>Дата решения</p>
      <div>
      <p>C</p>
  <input className="form-text-input" type="text"/>
  </div>
  <div>
  <p>По</p>
  <input className="form-text-input" type="text"/>
  </div>
<div>
  <p>Номер решения</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.tender_id}>{item.tender_id}</option>
      )})}
      </select>
</div>

<div>
      <p>Номер ТЗ</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.tz_id}>{item.tz_id}</option>
      )})}
      </select>
      </div>

      <p>Проект</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.proj}>{item.proj}</option>
      )})}
      </select>

  

  <p>Статус тендера</p>
  <div>
  <div>

          
      {stats.map((item, i)=>{
      return (
        <div className="form-check">
        <input className="form-check-input" type="checkbox" value={item.status}  id={i}/>
        <label className="form-check-label">
          {item}
        </label>
        </div>
        
      )})}

      </div>

  </div>

    <button type="button" className="btn btn-outline-dark" onClick={this.onClick}>Применить</button>
</form>
</div>*/