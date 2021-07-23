import React, {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {listOrg, sortOrgsByCountry, sortOrgsByGroup, sortOrgsByName, sortOrgsBySpec} from '../actions/orgAction'
import Link from 'react-router-dom/Link';
import Loader from './Loader';
import Message from './Message';
import Filters from './Filters';

const Orgs = () => {
  const dispatch = useDispatch()

  const orgList = useSelector(state => state.orgList)
  
  useEffect(() => {dispatch(listOrg([], [], [], []))}, [dispatch])
  const {loading, error, orgs} = orgList 

  const [nameFlag, setNameFlag] = useState(true)
  const [countryFlag, setCountryFlag] = useState(true)
  const [specFlag, setSpecFlag] = useState(true)
  const [groupFlag, setGroupFlag] = useState(true)


  let onClickName = () => {
    dispatch(sortOrgsByName(orgs, nameFlag))
    setNameFlag(!nameFlag)
  }

  let onClickCountry = () => {
    dispatch(sortOrgsByCountry(orgs, countryFlag))
    setCountryFlag(!countryFlag)
  }

  let onClickSpec = () => {
    dispatch(sortOrgsBySpec(orgs, specFlag))
    setSpecFlag(!specFlag)
  }
  
  let onClickGroup = () => {
    dispatch(sortOrgsByGroup(orgs, groupFlag))
    setGroupFlag(!groupFlag)
  }

    return(
      <div>
        {loading ? (
        <div ><Loader/>
        </div>
        ) : error ? <Message variant='danger'>{error}</Message> :
         <table className="table main_table">
          <tr className='filter-cell'>
            <td valign="top" align="justify">
              <div>
              <Filters></Filters>
              </div>
</td>


<td align='justify' valign="top">
        <div className="table-responsive list">
    <table className="table ">
    <thead>
      <tr className="org_head">
        <th scope="col">
          <label>Наименование</label>
          <button onClick={onClickName} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={nameFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">
          <label>Группа</label>
          <button onClick={onClickGroup} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={groupFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Специализация</label>
          <button onClick={onClickSpec} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={specFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Страна</label>
          <button onClick={onClickCountry} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={countryFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">Сайт</th>
        <th scope="col">Телефон</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
   <tbody>
   {orgs ? orgs.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/orgs/link/${item.o_id}`} >
            {item.name}
          </Link>
        </td>
        <td>{item.group}</td>
        <td>{item.spec}</td>
        <td>{item.country}</td>
        <td>{item.site}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
      </tr>)}):'Ничего не найдено'}
    </tbody>
  </table> 
  </div>
</td>
</tr>
</table>

}
</div>
)
  }

export default Orgs;