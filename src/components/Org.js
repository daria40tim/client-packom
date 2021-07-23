import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {listOrgDetails, listOrgAdd, listOrgDownDoc, deleteTrusted} from '../actions/orgAction'
import Loader from './Loader';
import Message from './Message';

const Or = ({match}) => {
  const dispatch = useDispatch()

  const orgDetails = useSelector(state => state.orgDetails)
  const {loading, error, org} = orgDetails

  useEffect(() => {
    dispatch(listOrgDetails(match.params.o_id))
  }, [dispatch, match])

  
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const onClick = (e) => {
    dispatch(listOrgAdd(match.params.o_id))
    alert('Организация была добавлена в список доверенных')
    e.target.innerHTML = 'Добавлено'
    e.target.disabled = true
  }

  const onClickDownload = (e) => {
    console.log(e.target.id)
    dispatch(listOrgDownDoc(org.docs[e.target.id], parseInt(match.params.o_id)))
  }

  const onClickDelete = (e) => {
    dispatch(deleteTrusted(parseInt(match.params.o_id)))
    alert('Организация была удалена из списка доверенных')
    e.target.innerHTML = 'Удалено'
    e.target.disabled = true
  }


  //render() {
    return(
        <div className='one_item'>
          {loading ? <Loader/>: error ? <Message variant="danger">{error}</Message> :
          <div>
        <div>
        <table className="table w-50" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'>Общие данные</td>
            </tr>
            <tr>
              <td>Название</td>
              <td>{org.name}</td>
            </tr>
            <tr>
              <td>Группа</td>
              <td>{org.group}</td>
            </tr>
            <tr>
              <td>Страна</td>
              <td>{org.country}</td>
            </tr>
            <tr>
              <td>Адрес</td>
              <td>{org.adress}</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>{org.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{org.email}</td>
            </tr>
            <tr>
              <td>Сайт</td>
              <td>{org.site}</td>
            </tr>
            <tr>
              <td>Статус</td>
              <td>Активна</td>
            </tr>
            {userInfo.group_id ==="2" || userInfo.group_id ==="3" ?<tr>
              <td>Специализация</td>
              <td>{org.specs?org.specs.map((item) => {
                return(<p>{item}</p>)
              }):''}</td>
            </tr>:<p></p>}
          </tbody>
        </table>
        </div>
        {userInfo.o_id === match.params.o_id ? <button type="button" className="btn btn-outline-dark">
          <Link className="nav-link " to={`/orgs/upd/${userInfo.o_id}`}>Изменить данные</Link>
          </button>
        : org.group === 'Клиент' ? <div></div> 
        : org.trusted !== null && org.trusted.includes(org.o_id) ? 
        <button type="button" className="btn btn-outline-dark" onClick={onClickDelete}>Удалить из списка поставщиков</button>
        : userInfo.group_id!==2 && (org.trusted===null || !org.trusted.includes(match.params.o_id))?
         <button type="button" className="btn btn-outline-dark" onClick={onClick}>Добавить в список поставщиков</button>
        : <div></div>
        }
          <h5 id="name" className="text-start">Документация</h5>
          {org.docs ? org.docs.map((item, i)=>{
        return (
          <button className="btn" onClick={onClickDownload} id={i}>{item}</button>
       )}) : <p className="text-start">Документов нет</p>}

          <h5 className="text-start">О компании</h5>
          <p className="text-start">{org.info}</p>
          {userInfo.o_id === match.params.o_id && userInfo.group_id!==2 ? <div>
          <h5 className="text-start">Список поставщиков</h5>
          <table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th>Наименование</th>
        <th>Группа</th>
        <th>Специализация</th>
        <th>Страна</th>
        <th>Сайт</th>
        <th>Телефон</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {org.orgs ? org.orgs.map((item, i)=>{
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
      </tr>)}) : <tr></tr>}
    </tbody>
  </table> 
  </div>: ''}
  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area'  rows="5">{org.history}</textarea>
</div>
}
</div>
)
  }

const Org =withRouter(Or) 
export default Org;