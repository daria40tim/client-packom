import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listTechDetails, listTzDownDoc } from '../actions/tzAction';
import Loader from './Loader';
import Message from './Message';
/*let data = 
    {'date': '12.01.2021', 
    'org': 'Организация 8', 
    "o_id": '1',
    'tz_id': '4368', 
    'end_date': '26.01.2021', 
    'proj': 'ГК 6040', 
    'group': 'Гофрокороб', 
    'kind': 'Стандартная', 
    'type': 'Одноразовая', 
    'task': 'Изготовление серии', 
    'tz_st': 'Активно', 
    'tender_st': 'Не проведен', 
    'count': '', 
    'cp_st': 'Не подано',
    'pay_cond': '100% постоплата',
    'private': 'Общий', 
    'info': `Требуется изготовить и доставить 150 гофрокоробов. Изготавливаемая упаковка должна отвечать требованиям технической документации (см. вложение). Дополнительно необходимо нанести маркировку с 4-х сторон`,
    "docs": ["Пример.pdf", "1.doc"],
    "costs": [
        {
            "task": "Изготовление серии",
            "metr": "шт.",
            "count": 150
        },
        {
            "task": "Доставка",
            "metr": "рейс",
            "count": 1
        }
    ], 
    "calendars":[
        {
            "name": "Разработка концепта",
            "period": 1,
            "term": 7
        },
        {
            "name": "Изготовление серии",
            "period": 2,
            "term": 9
        },
        {
            "name": "Доставка",
            "period": 1,
            "term": 10
        }
    ], 
    "history": "" 
    }*/

const Tec = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const tzDetails = useSelector(state => state.tzDetails)
  const {loading, error, tech} = tzDetails
  const tzList = useSelector(state => state.tzList)
  const data = tzList

  const [cal, setCal] = useState([])
  const [cps, setCps] = useState([])
  const [date, setDate] = useState('')
  const [end_date, setEndDate] = useState('')
  let last = 0


  useEffect(() => {
    dispatch(listTechDetails(match.params.tz_id))
  }, [dispatch, match])

  useEffect(() => {
    //let d = tech.date.toISOString().slice(0, 10)
    setCal(tech.cal)
    setCps(data.cps)
    //setDate(d)
    //setEndDate(new Date(tech.end_date).toISOString().slice(0, 10))
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
        <div>
          <div>
        <div>
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : 
        <table className="table w-50 one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td scope="col" colSpan='2'><h5>Общие данные</h5></td>
            </tr>
            <tr>
              <td scope="col">Клиент</td>
              <td scope="col">
              <Link to={`/orgs/link/${tech.o_id}`} >
                  {tech.client}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td scope="col">Проект</td>
              <td scope="col">{tech.proj}</td>
            </tr>
            <tr>
              <td scope="col">Группа упаковки</td>
              <td scope="col">{tech.group}</td>
            </tr>
            <tr>
              <td scope="col">Тип упаковки</td>
              <td scope="col">{tech.type}</td>
            </tr>
            <tr>
              <td scope="col">Вид упаковки</td>
              <td scope="col">{tech.kind}</td>
            </tr>
            <tr>
              <td scope="col">Вид задания</td>
              <td scope="col">{tech.task}</td>
            </tr>
            <tr>
              <td scope="col">Условия оплаты</td>
              <td scope="col">{tech.pay_cond}</td>
            </tr>
            <tr>
              <td scope="col">Дата начала сбора КП</td>
              <td scope="col">{tech.date ? tech.date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td scope="col">Дата завершения сбора КП</td>
              <td scope="col">{tech.end_date ? tech.end_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td scope="col">Доступ к данным ТЗ</td>
              <td scope="col">{ tech.privacy=='true' ? "Для доверенных поставщиков" : "Открыт"}</td>
            </tr>
            <tr>
              <td scope="col">Статус ТЗ</td>
              <td scope="col">{Date.parse(tech.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
          </tbody>
        </table>}
        </div>
          <h5 id="name" className="text-start">Документация</h5>
          {tech.docs ? tech.docs.map((item, i)=>{
        return (
          <button className="btn" onClick={onClickDownload} id={i}>{item}</button>
       )}) : <p className="text-start">Документов нет</p>}
          
          {Date.parse(tech.end_date)> Date.now() ? userInfo.o_id == tech.o_id ? 
          <button type="button" className="btn btn-outline-dark" onClick={onClickUpdate}>Изменить</button> :
          userInfo.group_id == 2 || userInfo.group_id == 3?
          <button type="button" className="btn btn-outline-dark" onClick={onClickAdd}>Предложить КП</button> : <p></p>
          :<p>ТЗ больше не активно</p>}

          <h5 className="text-start">Описание работ</h5>
          <p className="text-start">{tech.info}</p>

          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="table w-25" id="org_table">
    <thead>
      <tr className="org_head">
        <th scope="col">Наименование работ</th>
        <th scope="col">Единицы измерения</th>
        <th scope="col">Кол-во</th>
      </tr>
    </thead>
    <tbody>
      {tech.cst ? tech.cst.map((item, i)=>{
        return (
      <tr>
        <td>{item.task}</td>
        <td>{item.metr}</td>
        <td>{item.count}</td>
      </tr>)}): <p>Заказчик не добавил этапы работ</p>}
    </tbody>
  </table> 


  <h5 className="text-start">График выполнения работ</h5>
          <table className="table w-25" id="org_table">
    <thead>
      <tr className="org_head">
        <th scope="col">Наименование работ</th>
        <th scope="col" colSpan="2">Требования клиента</th>
      </tr>
      <tr className="org_head">
        <th scope="col"></th>
        <th scope="col">Период, КН</th>
        <th scope="col">Срок</th>
      </tr>
    </thead>
    <tbody>
      {cal ? cal.map((item, i)=>{ last = last + item.period
        return (
      <tr>
        <td>{item.task_name}</td>
        <td>{item.period}</td>
        <td>{new Date(tech.end_date).getWeek() + last}</td>
      </tr>)}): <p>Заказчик не добавил календарный план</p>}
    </tbody>
  </table>

  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area' value={tech.history} rows="5"></textarea>
</div>
</div>
)
  }

  const Tech =withRouter(Tec) 
  export default Tech;