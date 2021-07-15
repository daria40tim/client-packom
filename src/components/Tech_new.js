import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listSelect } from '../actions/selectAction';
import { createTZ, uploadFile } from '../actions/tzAction';

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

const Tec_new = () => {
  /*constructor(props) {
    super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick = (e) => {
     console.log("1")
    }*/

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    const [proj, setProj] = useState('')
    const [group, setGroup] = useState('')
    const [type, setType] = useState('')
    const [kind, setKind] = useState('')
    const [task, setTask] = useState('')
    const [pay_cond, setPay_cond] = useState('')
    const [end_date, setEnd_date] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [info, setInfo] = useState('')
    const [taskCost, setTaskCost] = useState('')
    const [taskCal, setTaskCal] = useState('')
    const [metr, setMetr] = useState('')
    const [doc, setDoc] = useState('')
    const [count, setCount] = useState(0)
    const [period, setPeriod] = useState(0)
    const [cal, setCal] = useState([])
    const [cst, setCst] = useState([])
    const [docs, setDocs] = useState([])
    const [last, setLast] = useState(0)
    const date = new Date().toISOString().slice(0, 10)


    const dispatch = useDispatch()
    const history = useHistory()
    const selectList = useSelector(state => state.selectList)

    useEffect(() => {dispatch(listSelect())}, [dispatch])
    const {loading, error, data} = selectList

    const onClickCost = () => {
      let costs = [...cst]
      costs.push({
        task: taskCost, 
        metr: metr, 
        count: parseInt(count)
      })
      setCst(costs)

    }
    const onClickCalendars = () => {
      setLast(parseInt(last) + parseInt(period))
      let calendars = [...cal]
      calendars.push({
        task_name: taskCal, 
        period: parseInt(period), 
        term: parseInt(new Date(end_date).getWeek()) + parseInt(period) + parseInt(last)
      })
      setCal(calendars)
    }

    const onClickAccept = () => {
      dispatch(createTZ(proj, group, type, kind, task, pay_cond, end_date, privacy.toString(), info, cal, cst, date, docs))
      history.push('/tech/')
    }

    const onClickDocs= () => {
      let d = [...docs]
      d.push(doc)
      setDocs(d)
      console.log(docs.length)
    }

   
     
    return(
        <div>
          <div>
        <h4 id="name" className="text-center">Общие данные</h4>
        <h5>Общие данные</h5>
        <div>
        <table className="table w-50 h-1000 one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td scope="col" colSpan='2'><h5>Общие данные</h5></td>
            </tr>
            <tr>
              <td scope="col">Клиент</td>
              <td scope="col">{userInfo.name}</td>
            </tr>
            <tr>
              <td scope="col">Проект</td>
              <td scope="col">
                  <input className='cr_input' name='proj' value={proj} onChange={(e)=>setProj(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Группа упаковки</td>
              <td scope="col">
                <label>Выберите из списка</label>
                {data.groups ? 
              <select className="form-select cr_input" name="dir" id="selector" value={group} onChange={(e)=>setGroup(e.target.value)} placeholder='Не выбрано'>
                {data.groups.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
                <label>Или введите собственное значение</label>
              <input className='cr_input' name='group' value={group} onChange={(e)=>setGroup(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Тип упаковки</td>
              <td scope="col">
              <label>Выберите из списка</label>
                {data.types ? 
              <select className="form-select cr_input" name="dir" id="selector" value={type} onChange={(e)=>setType(e.target.value)} placeholder='Не выбрано'>
                {data.types.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
                <label>Или введите собственное значение</label>
              <input className='cr_input' name='type' value={type} onChange={(e)=>setType(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Вид упаковки</td>
              <td scope="col">
              <label>Выберите из списка</label>
                {data.kinds ? 
              <select className="form-select cr_input" name="dir" id="selector" value={kind} onChange={(e)=>setKind(e.target.value)} placeholder='Не выбрано'>
                {data.kinds.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
                <label>Или введите собственное значение</label>
              <input className='cr_input' name='kind' value={kind} onChange={(e)=>setKind(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Вид задания</td>
              <td scope="col">
              <input className='cr_input' name='task' value={task} onChange={(e)=>setTask(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Условия оплаты</td>
              <td scope="col">
              <label>Выберите из списка</label>
                {data.pay_conds ? 
              <select className="form-select cr_input" name="dir" id="selector" value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)} placeholder='Не выбрано'>
                {data.pay_conds.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
                <label>Или введите собственное значение</label>
              <input className='cr_input' name='pay_cond' value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)}></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Дата начала сбора КП</td>
              <td scope="col">{date}</td>
            </tr>
            <tr>
              <td scope="col">Дата завершения сбора КП</td>
              <td scope="col">
              <input className='cr_input' name='end_date' value={end_date} onChange={(e)=>setEnd_date(e.target.value)} placeholder="ГГГГ-ММ-ДД"></input>
                  </td>
            </tr>
            <tr>
              <td scope="col">Доступ к данным ТЗ</td>
              <td scope="col">
              
              <select className="form-select cr_input" name="dir" id="selector" value={privacy} onChange={(e)=>setPrivacy(e.target.value)} placeholder='Не выбрано'>
              
              <option value={true}>Закрыт</option>
              <option value={false}>Открыт</option>
              </select>
                  </td>
            </tr>
            <tr>
              <td scope="col">Статус ТЗ</td>
              <td scope="col">{'Активно'}</td>
            </tr>
          </tbody>
        </table>
        </div>
          <h5 id="name" className="text-start">Документация</h5>
          <h5>Добавление документов возможно из панели редактирования ТЗ.</h5>

          <h5 className="text-start">Описание работ</h5>
          <textarea className='cr_input' name='adress' value={info} onChange={(e)=>setInfo(e.target.value)}></textarea>

          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="table w-25" id="cost_table">
    <thead>
      <tr className="org_head">
        <th scope="col">Наименование работ</th>
        <th scope="col">Единицы измерения</th>
        <th scope="col">Кол-во</th>
      </tr>
    </thead>
    <tbody>
    {cst ? cst.map((item)=>{
        return(
          <tr>
            <td>{item.task}</td>
            <td>{item.metr}</td>
            <td>{item.count}</td>
          </tr>
        )}) : <a></a>
      }
      <tr>
        <td>
        {data.tasks ? 
              <select className="form-select cr_input" name="dir" id="selector" value={taskCost} onChange={(e)=>setTaskCost(e.target.value)} placeholder='Не выбрано'>
                {data.tasks.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
              <input className='cr_input' name='task_name' value={taskCost} onChange={(e)=>setTaskCost(e.target.value)}></input>
        </td>
        <td>
        {data.metrics ? 
              <select className="form-select cr_input" name="dir" id="selector" value={metr} onChange={(e)=>setMetr(e.target.value)} placeholder='Не выбрано'>
                {data.metrics.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
              <input className='cr_input' name='task_name' value={metr} onChange={(e)=>setMetr(e.target.value)}></input>
        </td>
        <td><input className='cr_input' name='pay_cond' value={count} onChange={(e)=>setCount(e.target.value)}></input></td>
      </tr>
      <tr>
        <td colSpan="3"><button type="button" className="btn btn-outline-dark" onClick={onClickCost}>Добавить</button></td>
      </tr>
    </tbody>
    </table>


  <h5 className="text-start">График выполнения работ</h5>
  <table className="table w-25" id="cal_table">
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
    {cal ? cal.map((item)=>{
        return(
          <tr>
            <td>{item.task_name}</td>
            <td>{item.period}</td>
            <td>{item.term}</td>
          </tr>
        )}) : <a></a>
      }
    <tr>
        <td>
                {data.task_names ? 
              <select className="form-select cr_input" name="dir" id="selector" value={taskCal} onChange={(e)=>setTaskCal(e.target.value)} placeholder='Не выбрано'>
                {data.task_names.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
              <input className='cr_input' name='task_name' value={taskCal} onChange={(e)=>setTaskCal(e.target.value)}></input>
        </td>
        <td><input className='cr_input' name='pay_cond' value={period} onChange={(e)=>setPeriod(e.target.value)}></input></td>
        <td>{parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last)}</td>
      </tr>
      <tr>
        <td colSpan="3"><button type="button" className="btn btn-outline-dark" onClick={onClickCalendars}>Добавить</button></td>
      </tr>
    </tbody>
</table>
</div>
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}>Подтвердить</button>
</div>
)
  }
  const Tech_new =withRouter(Tec_new) 
  export default Tech_new;
  /* <div>
          {docs ? docs.map((item)=>{ return(
          <p>{item}</p>)
          }) : <p></p>}
         </div>
          <input className='cr_input' value={doc} onChange={(e)=>setDoc(e.target.value)}></input>
          <button type="button" className="btn btn-outline-dark" onClick={onClickDocs}>Добавить</button>*/