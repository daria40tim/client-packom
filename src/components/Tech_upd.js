import React, {useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, withRouter} from 'react-router-dom';
import { listSelect } from '../actions/selectAction';
import { deleteCal, deleteCst, listTechDetails, tzUpdate } from '../actions/tzAction';
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
    const [count, setCount] = useState('')
    const [period, setPeriod] = useState('')
    const [cal, setCal] = useState([])
    const [cst, setCst] = useState([])
    const [docs, setDocs] = useState([])
    const [last, setLast] = useState(0)
    const [file, setFile] = useState()


    const dispatch = useDispatch()
    const tzDetails = useSelector(state => state.tzDetails)
  
    const history = useHistory()
    const selectList = useSelector(state => state.selectList)

    useEffect(() => {
        dispatch(listSelect())
    }, [dispatch])


    useEffect(() => {
        dispatch(listTechDetails(match.params.tz_id))
      }, [dispatch, match])
      
    const {tech} = tzDetails

    useEffect(() => {
      let costs = []
      tech.cst ?  costs = [...tech.cst] : costs = []
      costs.forEach(element => {
        element.active = true
      });
      let cals = []
      tech.cal ? cals = [...tech.cal] : cals = []
      cals.forEach(element => {
        element.active = true
      });
        setCst(costs)
        setCal(cals)
    }, [tech.cst, tech.cal])

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
      let t = 0

      if (end_date!=='') {
        t = parseInt(new Date(end_date).getWeek()) + parseInt(period) + parseInt(last)
        if (t > 52){
          t = t - 52
        }
      }else {
        t = parseInt(new Date(tech.end_date).getWeek()) + parseInt(period) + parseInt(last)
        if (t > 52){
          t = t - 52
        }
      }
      calendars.push({
        task_name: taskCal, 
        period: parseInt(period), 
        term: t,
        active: true,
      })
      setCal(calendars)
      setTaskCal('')
      setPeriod('')
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
      setInfo('')
      setTaskCost('')
      setTaskCal('')
      setMetr('')
      setCount('')
      setPeriod('')
    } 

    const onClickCostAccDelete = (e) => {
      if(cst[e.target.id].active){
        cst[e.target.id].active = false
        e.target.src = plus
      } else {
        cst[e.target.id].active = true
        e.target.src = x
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

        dispatch(tzUpdate(parseInt(match.params.tz_id), proj_, group_, type_, kind_, task_, pay_cond_, end_date_, info_, cal, cst, hi+tech.history))
        console.log(pay_cond_)
        history.push('/tech/')
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
              <label>{tech.end_date?tech.end_date.slice(0,10):''} - Предыдущая дата</label>
              <InputMask mask="9999-99-99" value={end_date} onChange={(e)=>setEnd_date(e.target.value)} className='cr_input' alwaysShowMask='true'/>
              </td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>
              
              { tech.privacy ==='true' ? "Для доверенных поставщиков" : "Открыт"}</td>
                 
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
        return(
          <tr key={'z'+i}>
            <td key={'zz'+i}>{item.task_name}</td>
            <td key={'zzz'+i}>{item.period}</td>
            <td key={'zzzz'+i}>{item.term}</td>
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
        <td>{end_date ==='' ? period ==='' ? 'Заполните конечную дату и период' : 
        parseInt(new Date(tech.end_date).getWeek())+parseInt(period)+ parseInt(last) >52 ? 
        parseInt(new Date(tech.end_date).getWeek())+parseInt(period)+ parseInt(last)-52:parseInt(new Date(tech.end_date).getWeek())+parseInt(period)+ parseInt(last):
        parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last) >52 ? 
        parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last)-52:parseInt(new Date(end_date).getWeek())+parseInt(period)+ parseInt(last)}</td>
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
  const Tech_upd =withRouter(Tec_upd) 
  export default Tech_upd;