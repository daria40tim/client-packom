import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { listTechs, sortTechsByClient, sortTechsByDate, sortTechsByStatus, sortTechsByTzId, sortTechsByEndDate, sortTechsByTenderSt, sortTechsByCpSt } from '../actions/tzAction';
import '../index.css'
import Filters from './Filters';
import Loader from './Loader';
import Message from './Message';
import TechFilters from './TechFilters';



const  Techs = () =>  {

  const onClickDate = () => {
    dispatch(sortTechsByDate(data, dateFlag))
    setDateFlag(!dateFlag)
  }

  const onClickClient = () => {
    dispatch(sortTechsByClient(data, clientFlag))
    setClientFlag(!clientFlag)
  }

  const onClickId = () => {
    dispatch(sortTechsByTzId(data, tz_idFlag))
    setTzIdFlag(!tz_idFlag)
  }
  
  const onClickEndDate = () => {
    dispatch(sortTechsByEndDate(data, end_dateFlag))
    setEndDateFlag(!end_dateFlag)
  }

  const onClickTZStat = () => {
    dispatch(sortTechsByStatus(data, statusFlag))
    setStatusFlag(!statusFlag)
  }
  const onClickTenderSt = () => {
    dispatch(sortTechsByTenderSt(data, tender_stFlag))
    setTenderStFlag(!tender_stFlag)
  }
  const onClickCpSt = () => {
    dispatch(sortTechsByCpSt(data, cp_stFlag))
    setCpStFlag(!cp_stFlag)
  }
  

  const history = useHistory()
  const onClickTZ = () => {
    history.push(`/techs/create`)
  }

  const dispatch = useDispatch()

  const tzList = useSelector(state => state.tzList)
  const [tz_idFlag, setTzIdFlag] = useState(true)
  const [dateFlag, setDateFlag] = useState(true)
  const [end_dateFlag, setEndDateFlag] = useState(true)
  const [statusFlag, setStatusFlag] = useState(true)
  const [cp_stFlag, setCpStFlag] = useState(true)
  const [tender_stFlag, setTenderStFlag] = useState(true)
  const [clientFlag, setClientFlag] = useState(true)
  
  
  useEffect(() => {dispatch(listTechs())}, [dispatch])
  const {loading, error, data} = tzList
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null




    return(
      <div>
         {loading ? (
        <div ><Loader/>
        </div>
        ) : error ? <Message variant='danger'>{error}</Message> :
        <table className="table main_table">
        <tr>
          <td valign="top" align="justify">
            <div>
            <TechFilters></TechFilters>
            </div>
</td>



<td align='justify' valign="top">
      <div className='list'> 
      {userInfo.group_id === "1" || userInfo.group_id === "3" ? 
  <button type="button" className="btn btn-outline-dark m-2" onClick={onClickTZ}>
    Добавить ТЗ
    </button> :''} 
    <table className="table main_t">
    <thead>
      <tr className="org_head">
        <th scope="col">
          <label>Номер ТЗ</label>
          <button onClick={onClickId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tz_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">
          <label>Дата ТЗ</label>
          <button onClick={onClickDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Клиент</label>
          <button onClick={onClickClient} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={clientFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Дата завершения</label>
          <button onClick={onClickEndDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={end_dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
            <label>Статус ТЗ</label>
            <button onClick={onClickTZStat} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={statusFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
            </th>
            <th scope="col">
            <label>Статус КП</label>
            <button onClick={onClickCpSt} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={cp_stFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
            </th>
        <th scope="col">
        <label>Статус тендера</label>
            <button onClick={onClickTenderSt} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tender_stFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
        </th>
        <th scope="col">Проект</th>
        <th scope="col">Группа упаковки</th>
        <th scope="col">Тип упаковки</th>
        <th scope="col">Вид упаковки</th>
        <th scope="col">Вид задания</th>
        <th scope="col">Кол-во КП</th>
        
      </tr>
    </thead>
    <tbody>
      {data ? data.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/techs/link/${item.tz_id}`} >
            {item.tz_id}
          </Link>
        </td>
        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
        <td>{item.client}</td>
        <td>{new Date(item.end_date).toISOString().slice(0, 10)}</td>
        <td>{item.tz_st}</td>
        <td>{item.cp_st}</td>
        <td>{item.tender_st}</td>
        <td>{item.proj}</td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task}</td>
        <td>{item.count}</td>
        
      </tr>)}):<h5>Нет ТЗ</h5>}
    </tbody>
  </table> 
</div>
</td>
</tr>
</table>}
</div>
)
  }

export default Techs;