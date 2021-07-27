import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { listCPs, sortCPByDate, sortCPById, sortCPByOrg, sortCPByStatus, sortCPByTzId } from '../actions/cpAction';
import CpFilters from './CpFilters';
import Loader from './Loader';
import Message from './Message';

const C = () => {
 

  const dispatch = useDispatch()
 

  const cpList = useSelector(state => state.cpList)
  const {loading, error, cps} = cpList
  useEffect(() => {dispatch(listCPs())}, [dispatch])

  
  const onClickDate = () => {
    dispatch(sortCPByDate(cps, dateFlag))
    setDateFlag(!dateFlag)
  }

  const onClickCPId = () => {
    dispatch(sortCPById(cps, cp_idFlag))
    setCpIdFlag(!cp_idFlag)
  }

  const onClickTZId = () => {
    dispatch(sortCPByTzId(cps, tz_idFlag))
    setTzIdFlag(!tz_idFlag)
  }

  const onClickOrg = () => {
    dispatch(sortCPByOrg(cps, o_idFlag))
    setOrgFlag(!o_idFlag)
  }
  const onClickStatus = () => {
    dispatch(sortCPByStatus(cps, cp_stFlag))
    setStatusFlag(!cp_stFlag)
  }

  
  const [tz_idFlag, setTzIdFlag] = useState(true)
  const [dateFlag, setDateFlag] = useState(true)
  const [cp_idFlag, setCpIdFlag] = useState(true)
  const [o_idFlag, setOrgFlag] = useState(true)
  const [cp_stFlag, setStatusFlag] = useState(true)

    return(
      <div>
        {loading ? (
        <div ><Loader/>
        </div>
        ) : error ? <Message variant='danger'>{error}</Message> :
        <table className="table main_table">
        <tr>
            <td valign="top" align="justify">
     <CpFilters></CpFilters>


</td>
<td align='justify' valign="top">
      <div className='list'>
    <table className="table main_t">
    <thead>
      <tr className="org_head">
      <th>
          <label>Номер КП</label>
          <button onClick={onClickCPId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={cp_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th>
          <label>Дата КП</label>
          <button onClick={onClickDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th>
        <label>Статус КП</label>
          <button onClick={onClickStatus} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={cp_stFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th>
          <label>Номер ТЗ</label>
          <button onClick={onClickTZId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tz_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th>
          <p>Проект</p>
          </th>
        <th>
            <label>Поставщик</label>
            <button onClick={onClickOrg} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={o_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
            </th>
        <th>Группа упаковки</th>
        <th>Тип упаковки</th>
        <th>Вид упаковки</th>
        <th>Вид задания</th>
      </tr>
    </thead>
    <tbody>
      {cps ? cps.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/cps/link/${item.cp_id}`} >
            {item.cp_id}
          </Link>
        </td>
        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
        <td>{item.cp_st}</td>
        <td>
          <Link to={`/techs/link/${item.tz_id}`}>
          {item.tz_id}
          </Link>
          </td>
        <td>{item.proj}</td>
        <td>
          <Link to={`/orgs/link/${item.o_id}`}>
          {item.o_id}
          </Link></td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task_name}</td>
      </tr>)}) : "Предложений нет"}
    </tbody>
  </table> 
 
</div>
 </td>
 </tr>
</table>}
</div>
)
}

const CP =withRouter(C) 
export default CP;