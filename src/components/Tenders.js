import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { listTenders } from '../actions/tenderAction';
import Filters from './Filters';
import Message from './Message';


const Tender = () => {

    const dispatch = useDispatch()

    const tenderList = useSelector(state => state.tenderList)
    
    
  
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
          <p>Номер решения</p>
          </th>
        <th scope="col">
          <p>Номер ТЗ</p>
          </th>
          <th scope="col">
          <p>Дата решения</p>
          </th>
          <th scope="col">
          <p>Проект</p>
          </th>
        <th scope="col">Группа упаковки</th>
        <th scope="col">Тип упаковки</th>
        <th scope="col">Вид упаковки</th>
        <th scope="col">Вид задания</th>
        <th scope="col">
          <p>Статус тендера</p>
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
        <td>{item.date}</td>
        <td>{item.proj}</td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task}</td>
        <td>{item.selected_cp !== 0 ? 'Принято' : item.tz_st === 4 ? 'Отменено' : Date.parse(item.end_date) - Date.now() > 0 ? "Ожидает решение" :  'Сбор КП'}</td>
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