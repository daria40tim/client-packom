import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listTechDetails, listTzDownDoc } from '../actions/tzAction';
import Loader from './Loader';
import Message from './Message';
import pencil from '../pic/pencil.svg'

const Tec = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const tzDetails = useSelector(state => state.tzDetails)
  const {loading, error, tech} = tzDetails
  const tzList = useSelector(state => state.tzList)
  const data = tzList

  const [cal, setCal] = useState([])
  const [cps, setCps] = useState([])
  let last = 0


  useEffect(() => {
    dispatch(listTechDetails(match.params.tz_id))
  }, [dispatch, match])

  useEffect(() => {
    setCal(tech.cal)
    setCps(data.cps)
})

  
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

    let onClickAdd = (e) => {
      history.push(`/cps/create/${match.params.tz_id}`)
    }
    let onClickUpdate = (e) => {
      history.push(`/techs/upd/${match.params.tz_id}`)
     }

     const onClickDownload = (e) => {
      console.log(e.target.id)
      dispatch(listTzDownDoc(tech.docs[e.target.id], parseInt(match.params.tz_id)))
    }
  
    
    return(
        <div  className='one_item'>
          <div>
        
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : 
        <div className='table-responsive'>
          {Date.parse(tech.end_date)> Date.now() ? userInfo.o_id === tech.o_id ? 
          <button type="button" className="btn btn-outline-dark m-2" onClick={onClickUpdate}>
            <img src={pencil} alt='Изменить' width='25'></img>
            </button> :
          userInfo.group_id === 2 || userInfo.group_id === 3?
          <button type="button" className="btn btn-outline-dark" onClick={onClickAdd}>Предложить КП</button> : <p></p>
          :'ТЗ больше не активно'}
        <h2>Общие данные</h2>
        <table className='table'>
          <tbody>
            <tr>
              <td>

              
        <table className="table w-100" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>Клиент</td>
              <td>
              <Link to={`/orgs/link/${tech.o_id}`} >{tech.client}</Link></td>
            </tr>
            <tr>
              <td>Проект</td>
              <td>{tech.proj}</td>
            </tr>
            <tr>
              <td>Группа упаковки</td>
              <td>{tech.group}</td>
            </tr>
            <tr>
              <td>Тип упаковки</td>
              <td>{tech.type}</td>
            </tr>
            <tr>
              <td>Вид упаковки</td>
              <td>{tech.kind}</td>
            </tr>
            <tr>
              <td>Вид задания</td>
              <td>{tech.task}</td>
            </tr>
            <tr>
              <td>Условия оплаты</td>
              <td>{tech.pay_cond}</td>
            </tr>
            <tr>
              <td>Дата начала сбора КП</td>
              <td>{tech.date ? tech.date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td>Дата завершения сбора КП</td>
              <td>{tech.end_date ? tech.end_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>{ tech.privacy==='true' ? "Для доверенных поставщиков" : "Открыт"}</td>
            </tr>
            <tr>
              <td>Статус ТЗ</td>
              <td>{Date.parse(tech.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td>Документация</td>
            <td>
                {tech.docs ? tech.docs.map((item, i)=>{
              return (
                <button className="btn" onClick={onClickDownload} id={i}>{item}</button>
            )}) : <p className="text-start">Документов нет</p>}
            </td>
            </tr>
          </tbody>
        </table>
        </td>
        <td>
        <h5 className="text-start">Разбивка стоимости</h5>
          <table className="table w-100" id="org_table">
            <thead>
              <tr className="org_head">
                <th>Наименование работ</th>
                <th>Единицы измерения</th>
                <th>Кол-во</th>
              </tr>
            </thead>
            <tbody>
              {tech.cst ? tech.cst.map((item, i)=>{
                return (
              <tr>
                <td>{item.task}</td>
                <td>{item.metr}</td>
                <td>{item.count}</td>
              </tr>)}): <tr><td>'Заказчик не добавил этапы работ'</td></tr>}
            </tbody>
          </table> 

          <h5 className="text-start">График выполнения работ</h5>
          <table className="table w-100" id="org_table">
            <thead>
              <tr className="org_head">
                <th>Наименование работ</th>
                <th colSpan="2">Требования клиента</th>
              </tr>
              <tr className="org_head">
                <th></th>
                <th>Период, КН</th>
                <th>Срок</th>
              </tr>
            </thead>
            <tbody>
              {cal ? cal.map((item, i)=>{ last = last + item.period
                return (
              <tr>
                <td>{item.task_name}</td>
                <td>{item.period}</td>
                <td>{new Date(tech.end_date).getWeek() + last}</td>
              </tr>)}):<tr><td>'Заказчик не добавил календарный план'</td></tr>}
            </tbody>
          </table>
        </td>
        </tr>
        <tr>
          <td colSpan='2'>
          <h5 className="text-start">Описание работ</h5>
          <p className="text-start">{tech.info}</p>
  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area' value={tech.history} rows="5"></textarea>
          </td>
        </tr>
          </tbody>
        </table> 
        </div>}
        </div>
</div>
)
  }

  const Tech =withRouter(Tec) 
  export default Tech;