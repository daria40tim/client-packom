import React, {useEffect, useState } from 'react';
import {  Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, withRouter} from 'react-router-dom';
import { listSelect } from '../actions/selectAction';
import { createTZ } from '../actions/tzAction';
import InputMask from "react-input-mask";
import check from '../pic/check.svg'
import x from  '../pic/x.svg'
import plus from  '../pic/plus.svg'
import save from  '../pic/save.svg'



Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

const Tec_new = () => {

  let la = 0

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
    const [count, setCount] = useState('')
    const [period, setPeriod] = useState('')
    const [cal, setCal] = useState([])
    const [cst, setCst] = useState([])
    const [docs] = useState([])
    const [last, setLast] = useState(0)
    const date = new Date().toISOString().slice(0, 10)


    const dispatch = useDispatch()
    const history = useHistory()
    const selectList = useSelector(state => state.selectList)

    useEffect(() => {dispatch(listSelect())}, [dispatch])
    const {data} = selectList

    const onClickCost = () => {
      if (taskCost === '') {
        alert('Наименование работ не может быть пустым')
        return
      }
      if (metr === '') {
        alert('Заполните поле единиц измерения')
        return
      }
      if (count === '') {
        alert('Заполните поле количества')
        return
      }
      let costs = [...cst]
      costs.push({
        task: taskCost, 
        metr: metr, 
        count: parseInt(count),
        active: true,
      })
      setCst(costs)
      setTaskCost('')
      setMetr('')
      setCount('')

    }

    const onClickCostAccDelete = (e) => {
      if(cst[e.target.id].active){
        cst[e.target.id].active = false
        e.target.src = plus
        console.log(cst[e.target.id].active)
      } else {
        cst[e.target.id].active = true
        e.target.src = x
        console.log(cst[e.target.id].active)
      }
    }

    const onClickCalAccDelete = (e) => {
      if(cal[e.target.id].active){
        cal[e.target.id].active = false
        e.target.src = plus
        
      } else {
        cal[e.target.id].active = true
        e.target.src = x
      }
    }

    const onClickCalendars = () => {
      setLast(parseInt(last) + parseInt(period))

      if (taskCal===''){
        alert('Наименование работ не может быть пустым')
        return
      }
      if (period===''){
        alert('Введите длительность работ в календарных неделях')
        return
      }
      let calendars = [...cal]

      let t = parseInt(new Date(end_date).getWeek()) + parseInt(period) + parseInt(last)
      if (t > 52){
        t = t - 52
      }
      calendars.push({
        task_name: taskCal, 
        period: parseInt(period), 
        term: t, 
        active: true
      })
      setCal(calendars)
      setTaskCal('')
      setPeriod('')
    }

    const onClickAccept = () => {
      if (proj === ''){
        alert('Заполните поле названия проекта')
        return
      }
      else if (group === ''){
        alert('Заполните поле группы упаковки')
        return
      }
      else if (type === ''){
        alert('Заполните поле типа упаковки')
        return
      }
      else if (kind === ''){
        alert('Заполните поле вида упаковки')
        return
      }
      else if (task === ''){
        alert('Заполните поле вида задания')
        return
      }
      else if (pay_cond === ''){
        alert('Заполните поле условия оплаты')
        return
      }
      else if (end_date === ''){
        alert('Заполните поле даты окончания сбора КП')
        return
      }
      else if (new Date(end_date) <= new Date()){
        alert('Поле даты окончания сбора КП заполнено неверно')
        return
      }
      else if (info === ''){
        alert('Заполните поле описания работ')
        return
      }
      else if (cal.length === 0){
        alert('Календарный план не может быть пустым')
        return
      }
      else if (cst.length === 0){
        alert('Разбивка стоимости не может быть пуста')
        return
      }
      if (taskCal !== '' && period !== '') {
        let calendars = [...cal]

        let t = parseInt(new Date(end_date).getWeek()) + parseInt(period) + parseInt(last)
        if (t > 52){
          t = t - 52
        }
        calendars.push({
          task_name: taskCal, 
          period: parseInt(period), 
          term: t, 
          active: true
        })
        setCal(calendars)

      }
      if (taskCost !== '' && metr !== '' && count !== ''){
        let costs = [...cst]
        costs.push({
          task: taskCost, 
          metr: metr, 
          count: parseInt(count),
          active: true,
        })
        setCst(costs)
      }

      dispatch(createTZ(proj, group, type, kind, task, pay_cond, end_date, privacy.toString(), info, cal, cst, date, docs))
      history.push('/tech/')
    }

    const onClickDecline = (e) => { 
      alert('Все введенные данные будут стерты')
      setProj('')
      setGroup('')
      setType('')
      setKind('')
      setTask('')
      setPay_cond('')
      setEnd_date('')
      setPrivacy(false)
      setInfo('')
      setTaskCost('')
      setTaskCal('')
      setMetr('')
      setCount('')
      setPeriod('')
      setCal([])
      setCst([])
      setLast(0)
    } 

    const endDateOnChange = (e) => { 
      setEnd_date(e.target.value)
    } 

   
     
    return(
        <div className='one_item'>
          <div>
        <div className='table-responsive'>
        <table className="table w-50 h-1000 one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'><h2>Общие данные</h2></td>
            </tr>
            <tr>
              <td colSpan='2'><h5>Все поля являются обязательными</h5></td>
            </tr>
            <tr>
              <td>Клиент</td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td>Проект</td>
              <td>
              <Form.Control className='cr_input'  value={proj} onChange={(e)=>setProj(e.target.value)}/>
                  </td>
            </tr>
            <tr>
              <td>Группа упаковки</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={group} onChange={(e)=>setGroup(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={group}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.groups ? data.groups.map((item, i) => { return(
                    <Dropdown.Item key={'gr'+i} value={item} onSelect={(e)=>setGroup(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
                  </td>
            </tr>
            <tr>
              <td>Тип упаковки</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={type} onChange={(e)=>setType(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={type}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.types ? data.types.map((item, i) => { return(
                    <Dropdown.Item key={'ty'+i} value={item} onSelect={(e)=>setType(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
                  </td>
            </tr>
            <tr>
              <td>Вид упаковки</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={kind} onChange={(e)=>setKind(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={kind}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.kinds ? data.kinds.map((item, i) => { return(
                    <Dropdown.Item key={'ki'+i} value={item} onSelect={(e)=>setKind(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
                  </td>
            </tr>
            <tr>
              <td>Вид задания</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={task} onChange={(e)=>setTask(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={task}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.task_kinds ? data.task_kinds.map((item, i) => { return(
                    <Dropdown.Item key={'tki'+i} value={item} onSelect={(e)=>setTask(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
                  </td>
            </tr>
            <tr>
              <td>Условия оплаты</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={pay_cond}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.pay_conds ? data.pay_conds.map((item, i) => { return(
                    <Dropdown.Item key={'pc'+i} value={item} onSelect={(e)=>setPay_cond(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
                  </td>
            </tr>
            <tr>
              <td>Дата начала сбора КП</td>
              <td>{date}</td>
            </tr>
            <tr>
              <td>Дата завершения сбора КП</td>
              <td>
                <InputMask mask="9999-99-99" value={end_date} onChange={endDateOnChange} className='cr_input' alwaysShowMask='true' />
                  </td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>
              
              <select className="form-select cr_input" id="selector" value={privacy} onChange={(e)=>setPrivacy(e.target.value)} placeholder='Не выбрано'>
              
              <option value={true}>Закрыт</option>
              <option value={false}>Открыт</option>
              </select>
                  </td>
            </tr>
            <tr>
              <td>Статус ТЗ</td>
              <td>{'Активно'}</td>
            </tr>
          </tbody>
        </table>
        </div>
          <h5 id="name" className="text-start">Документация</h5>
          <p>Добавление документов возможно из панели редактирования ТЗ.</p>

          <h5 className="text-start">Описание работ</h5>
          <textarea className='cr_input' value={info} onChange={(e)=>setInfo(e.target.value)}></textarea>

          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="table w-50" id="cost_table">
    <thead>
      <tr className="org_head">
        <th>Наименование работ</th>
        <th>Единицы измерения</th>
        <th>Кол-во</th>
      </tr>
    </thead>
    <tbody>
    {cst ? cst.map((item, i)=>{
        return(
          <tr key={'q'+i} >
            <td key={'qq'+i}>{item.task}</td>
            <td key={'qqq'+i}>{item.metr}</td>
            <td key={'qqqq'+i}>{item.count}</td>
            <td key={'qqqqq'+i}>
              <Button key={'qqqqqq'+i} variant='light' className="main_button btn btn-outline-dark" onClick={onClickCostAccDelete}>
                <img id={i} key={'qqqqqqq'+i} src={x} alt="Accept" width="32" height="32"/>
              </Button>
              </td>
          </tr>
        )}) : 'Список пуст'
      }
      <tr>
        <td>
        <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='cr_input'  value={taskCost} onChange={(e)=>setTaskCost(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={taskCost}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.tasks ? data.tasks.map((item, i) => { return(
                    <Dropdown.Item key={'w'+i} value={item} onSelect={(e)=>setTaskCost(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
        </td>
        <td>
        <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='cr_input'  value={metr} onChange={(e)=>setMetr(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={metr}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.metrics ? data.metrics.map((item, i) => { return(
                    <Dropdown.Item key={'e'+i} value={item} onSelect={(e)=>setMetr(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
        </td>
        <td><InputMask mask='999999999999' maskChar={null} className='cr_input' value={count} onChange={(e)=>setCount(e.target.value)}></InputMask></td>
      <td colSpan="3">
        <button type="button" className="main_button btn btn-outline-dark" onClick={onClickCost}>
          <img src={check} alt="Accept" width="32" height="32"/>
        </button>
        </td>
      </tr>
        
    </tbody>
    </table>


  <h5 className="text-start">График выполнения работ</h5>
  <table className="table w-50" id="cal_table">
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
    {cal ? cal.map((item, i)=>{
      la = la + item.period
        return(
          <tr key={'z'+i}>
            <td key={'zz'+i}>{item.task_name}</td>
            <td key={'zzz'+i}>{item.period}</td>
            <td key={'zzzz'+i}>{new Date(end_date).getWeek() + la}</td>
            <td key={'zzzzz'+i}>
              <Button key={'zzzzzq'+i} variant='light' className="main_button btn btn-outline-dark" onClick={onClickCalAccDelete}>
                <img id={i} key={'zzzzzqq'+i} src={x} alt="Accept" width="32" height="32"/>
              </Button>
              </td>
          </tr>
        )}) : ''
      }
    <tr>
        <td>
        <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='cr_input'  value={taskCal} onChange={(e)=>setTaskCal(e.target.value)}/>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" drop='end' value={taskCal}/>

                <Dropdown.Menu align={{ lg: 'end' }}>
                  {data.task_names ? data.task_names.map((item, i) => { return(
                    <Dropdown.Item key={'n'+i} value={item} onSelect={(e)=>setTaskCal(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
        </td>
        <td>
        <InputMask mask='999999999999' maskChar={null} className='cr_input' value={period} onChange={(e)=>setPeriod(e.target.value)}></InputMask>
        </td>
        <td>{end_date ==='' || period ==="" ? 'Заполните конечную дату и срок' : parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last) >52 ? parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last)-52:parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last)}</td>
        <td colSpan="3">
          <button type="button" className="main_button btn btn-outline-dark" onClick={onClickCalendars}>
          <img src={check} alt="Accept" width="32" height="32"/>
          </button>
          </td>
        </tr>
    </tbody>
</table>
</div>
<div className='enter'>
  <button type="button" className="btn btn-outline-dark" onClick={onClickAccept}><h3>Подтвердить</h3></button>
  <button type="button" className="btn btn-outline-dark" onClick={onClickDecline}><h3>Отменить</h3></button>
</div>
</div>
)
  }
  const Tech_new =withRouter(Tec_new) 
  export default Tech_new;