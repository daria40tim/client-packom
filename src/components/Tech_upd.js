import React, {useEffect, useState } from 'react';
import { Badge, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, withRouter} from 'react-router-dom';
import { listSelect } from '../actions/selectAction';
import { deleteCal, deleteCst, listTechDetails, tzUpdate } from '../actions/tzAction';
import InputMask from "react-input-mask";

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

const Tec_upd = ({match}) => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    const [proj, setProj] = useState('')
    const [group, setGroup] = useState('')
    const [type, setType] = useState('')
    const [kind, setKind] = useState('')
    const [task, setTask] = useState('')
    const [pay_cond, setPay_cond] = useState('')
    const [end_date, setEnd_date] = useState('')
    const [info, setInfo] = useState('')
    const [taskCost, setTaskCost] = useState('')
    const [taskCal, setTaskCal] = useState('')
    const [metr, setMetr] = useState('')
    const [count, setCount] = useState(0)
    const [period, setPeriod] = useState(0)
    const [cal, setCal] = useState([])
    const [cst, setCst] = useState([])
    const [calendar, setCalendar] = useState([])
    const [docs, setDocs] = useState([])
    const [cost, setCost] = useState([])
    const [setFile] = useState()


    const dispatch = useDispatch()
    const tzDetails = useSelector(state => state.tzDetails)
    const {tech} = tzDetails
  
    const history = useHistory()
    const selectList = useSelector(state => state.selectList)

    useEffect(() => {
        dispatch(listSelect())
    }, [dispatch])


    useEffect(() => {
        dispatch(listTechDetails(match.params.tz_id))
      }, [dispatch, match])

    useEffect(() => {
        setCst(tech.cst)
        setCal(tech.cal)
    })

    const {data} = selectList

    const onClickCost = () => {
      let costs = [...cost]
      costs.push({
        task: taskCost, 
        metr: metr, 
        count: parseInt(count)
      })
      setCost(costs)

    }
    const onClickCalendars = () => {
      let calendars = [...calendar]
      calendars.push({
        task_name: taskCal, 
        period: parseInt(period), 
        term: 0
      })
      setCalendar(calendars)
    }

    const onClickAccept = () => {
        let hi = ''
        let proj_ = ''
        if (proj !== ''){ 
            proj_ = proj
            hi = hi + " \n Изменен проект: " + proj_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            proj_ = tech.proj
        }
        let group_ = ''
        if (group !== ''){ 
            group_ = group
            hi = hi + " \n Изменена группа упаковки: " + group_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            group_ = tech.group
        }
        let type_ = ''
        if (type !== ''){ 
            type_ = type
            hi = hi + " \n Изменен тип упаковки: " + type_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            type_ = tech.type
        }
        let kind_ = ''
        if (kind !== ''){ 
            kind_ = kind
            hi = hi + " \n Изменен вид упаковки: " + kind_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            kind_ = tech.kind
        }
        let task_ = ''
        if (task !== ''){ 
            task_ = task
            hi = hi + " \n Изменен вид задания: " + task_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            task_ = tech.task
        }
        let pay_cond_ = ''
        if (pay_cond !== ''){ 
            pay_cond_ = pay_cond
            hi = hi + " \n Изменены условия оплаты: " + pay_cond_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            pay_cond_ = tech.pay_cond
        }
        let end_date_ = ''
        if (end_date !== ''){ 
            end_date_ = end_date
            hi = hi + " \n Изменена конечная дата: " + end_date_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            end_date_ = tech.end_date
        }
        let info_ = ''
        if (info !== ''){ 
            info_ = info
            hi = hi + " \n Изменена общая информация: " + info_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            info_ = tech.info
        }
        /*let calendar_ = []
        if (calendar !== []){ 
            calendar_ = calendar
            calendar.forEach(element => {
              hi = hi + " \n Добавлен график: " + element.task_name + " длительностью " + element.period + " кн. Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            calendar_ = cal
        }
        let cost_ = []
        if (cost !== []){ 
            cost_ = cost
            cost.forEach(element => {
              hi = hi + " \n Добавлена стоимость: " + element.task + " в количестве " + element.count + " " + element.metr +". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            cost_ = cal
        }
        let docs_ = []
        if (docs !== []){ 
            docs_ = docs
            docs.forEach(element => {
              hi = hi + " \n Добавлен документ: " + element + ". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            docs_ = cal
        }*/

        dispatch(tzUpdate(parseInt(match.params.tz_id), proj_, group_, type_, kind_, task_, pay_cond_, end_date_, info_, calendar, cost, hi+tech.history))
        console.log(pay_cond_)
        history.push('/tech/')
    }

    const onClickCstDel = (e) => {
        let costs = [...cst]

        let i = e.target.id

        const his = " \n Удалена стоимость: " + costs[i].task + " Дата: " + new Date().toISOString().slice(0, 10) + tech.history
        
        dispatch(deleteCst(match.params.tz_id, costs[i].task, his))

        document.getElementById(e.target.id).innerHTML = 'Удалено'
        document.getElementById(e.target.id).setAttribute('disabled', true)
    }

    const onClickCalDel = (e) => {
        let calendars = [...cal]

        let i = e.target.id-100000

        console.log(calendars[i].task_name)

        const his = " \n Удален график: " + calendars[i].task_name + " Дата: " + new Date().toISOString().slice(0, 10) + tech.history
        
        dispatch(deleteCal(match.params.tz_id, calendars[i].task_name, his))

        document.getElementById(e.target.id).innerHTML = 'Удалено'
        document.getElementById(e.target.id).setAttribute('disabled', true)
    }

    const onClickDocs= (e) => {
      var fileInput = document.getElementById("myfileinput");

      let auth = "Bearer " + userInfo.token

      var myHeaders = new Headers();
      myHeaders.append("Authorization", auth);

      var formdata = new FormData();
      formdata.append("doc", fileInput.files[0], fileInput.files[0].name);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`http://127.0.0.1:8000/api/techs/docs/${parseInt(match.params.tz_id)}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      let d = [...docs]
      d.push(fileInput.files[0].name)
      setDocs(d)

      alert('Документ добавлен')
    }
     
    return(
        <div className="one_item">
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
              <td>Клиент</td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td>Проект</td>
              <td>
                  <Form.Control className='cr_input'  value={proj} placeholder={tech.proj} onChange={(e)=>setProj(e.target.value)}/>
                  </td>
            </tr>
            <tr>
              <td>Группа упаковки</td>
              <td>
              <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={group} placeholder={tech.group} onChange={(e)=>setGroup(e.target.value)}/>
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
              <Form.Control className='dr_input'  value={type} placeholder={tech.type} onChange={(e)=>setType(e.target.value)}/>
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
              <Form.Control className='dr_input'  value={kind} placeholder={tech.kind} onChange={(e)=>setKind(e.target.value)}/>
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
              <Form.Control className='dr_input'  value={task} placeholder={tech.task} onChange={(e)=>setTask(e.target.value)}/>
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
              <Form.Control className='dr_input'  value={pay_cond} placeholder={tech.pay_cond} onChange={(e)=>setPay_cond(e.target.value)}/>
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
              <td>{tech.date?tech.date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td>Дата завершения сбора КП</td>
              <td>
              <Badge bg="secondary">{tech.end_date?tech.end_date.slice(0,10):''}</Badge>
              <InputMask mask="9999-99-99" value={end_date} onChange={(e)=>setEnd_date(e.target.value)} className='cr_input' alwaysShowMask='true'/>
              </td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>
              
              { tech.privacy=='true' ? "Для доверенных поставщиков" : "Открыт"}</td>
                 
            </tr>
            <tr>
              <td>Статус ТЗ</td>
              <td>{'Активно'}</td>
            </tr>
          </tbody>
        </table>
        </div>
          <h5 id="name" className="text-start">Документация</h5>
          {tech.docs ? tech.docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start"></p>}
         {docs ? docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start">Документов нет</p>}
           <input type="file" className="form-control-file" id="myfileinput" onChange={(e)=>setFile(e.target.files[0])}/>
           <button type="button" className="btn btn-outline-dark m-5" onClick={onClickDocs}>Добавить</button>

          <h5 className="text-start">Описание работ</h5>
          <textarea className='cr_input' name='adress' value={info} onChange={(e)=>setInfo(e.target.value)} placeholder={tech.info}></textarea>

          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="table w-25" id="cost_table">
    <thead>
      <tr className="org_head">
        <th>Наименование работ</th>
        <th>Единицы измерения</th>
        <th>Кол-во</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {cst ? cst.map((item, i)=>{
        return(
          <tr>
            <td>{item.task}</td>
            <td>{item.metr}</td>
            <td>{item.count}</td>
            <td><button type="button" className="btn btn-outline-dark" onClick={onClickCstDel} id={i}>Удалить</button></td>
          </tr>
        )}) : <tr><td></td></tr>
      }
       {cost ? cost.map((item, i)=>{
        return(
          <tr>
            <td>{item.task}</td>
            <td>{item.metr}</td>
            <td>{item.count}</td>
          </tr>
        )}) : <tr><td></td></tr>
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
      
      
        <td colSpan="3"><button type="button" className="btn btn-outline-dark" onClick={onClickCost}>Добавить</button></td>
</tr>
    </tbody>
    </table>


  <h5 className="text-start">График выполнения работ</h5>
  <table className="table w-25" id="cal_table">
    <thead>
      <tr className="org_head">
        <th>Наименование работ</th>
        <th>Требования клиента</th>
        <th></th>
      </tr>
      <tr className="org_head">
        <th></th>
        <th>Период, КН</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {cal ? cal.map((item,i)=>{
        return(
          <tr>
            <td>{item.task_name}</td>
            <td>{item.period}</td>
            <td> <button type="button" className="btn btn-outline-dark" onClick={onClickCalDel} id={100000+i}>Удалить</button></td>
          </tr>
        )}) : <tr><td></td></tr>
      }
      {calendar ? calendar.map((item,i)=>{
        return(
          <tr>
            <td>{item.task_name}</td>
            <td>{item.period}</td>
          </tr>
        )}) : <tr><td></td></tr>
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
        <td><input className='cr_input' name='pay_cond' value={period} pattern="[0-9]*" onChange={(e)=>setPeriod(e.target.value)}></input></td>
    

        <td colSpan="3"><button type="button" className="btn btn-outline-dark" onClick={onClickCalendars}>Добавить</button></td>
  </tr>
    </tbody>
</table>
</div>
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}>Подтвердить</button>
</div>
)
  }
  const Tech_upd =withRouter(Tec_upd) 
  export default Tech_upd;