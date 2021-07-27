import React, {useEffect, useState } from 'react';
import { createSelectorHook, useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { createCP } from '../actions/cpAction';
import { listTechDetails } from '../actions/tzAction';
import InputMask from "react-input-mask";
import {listPayConds} from '../actions/selectAction'
import {Dropdown, Form, InputGroup} from 'react-bootstrap'


Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}




const One_CP = ({match}) =>  {
    const [pay_cond, setPay_cond] = useState('')
    const [end_date, setEnd_date] = useState('')
    const [info, setInfo] = useState('')
    const [cst, setCst] = useState([])
    const [cal, setCal] = useState([])
    const [docs] = useState([])
    
  let tz_last = 0
  let last = 0
  let c = []
  let ca = []

  const dispatch = useDispatch()

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const tzDetails = useSelector(state => state.tzDetails)
  const {tech} = tzDetails
  const date = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    dispatch(listTechDetails(match.params.tz_id))
  }, [dispatch])

/*const onClickCst = (e) => {
    tech.cst.forEach(element => {
        c.push({
            task: element.task,
            ppu: 0,
            info: ''
        })
    });
    for (let index = 0; index < c.length; index++) {
        c[index].ppu = document.getElementById(index).value
        document.getElementById(index).setAttribute('disabled', true)
    }
    for (let index = 0; index < c.length; index++) {
        c[index].info = document.getElementById(index+100000).value
        document.getElementById(index+100000).setAttribute('disabled', true)
    }
    setCst([...c])
    document.getElementById(e.target.id).setAttribute('disabled', true)
    console.log(c[0].ppu)
}*/

/*const onClickCal = (e) => {
    tech.cal.forEach(element => {
        ca.push({
            task_name: element.task_name,
            period: 0,
            term: 0
        })
    });
    for (let index = 0; index < ca.length; index++) {
        ca[index].period = parseInt(document.getElementById(index+200000).value)
        document.getElementById(index+200000).setAttribute('disabled', true)
    }
    setCal([...ca])
    document.getElementById(e.target.id).setAttribute('disabled', true)
    console.log(ca[0].task_name)
}*/

const onPPUChange = (e) => {
  let id = parseInt(e.target.id.slice(1))
  cst[id].ppu = parseInt(e.target.value)
  cst[id].sum = e.target.value*cst[id].count
}

const onInfoChange = (e) => {
  let id = parseInt(e.target.id.slice(1))
  cst[id].info = e.target.value
}

const onPeriodChange = (e) =>{
  let id = parseInt(e.target.id.slice(1))
  cal[id].cp_period = parseInt(e.target.value)
}

const onClickCst = () => {
  console.log(cst)
}

const onClickCal = () => {
  console.log(cal)
}

const history = useHistory()

const payCondsList = useSelector(state => state.payCondsList)

useEffect(() => {dispatch(listPayConds())}, [dispatch])
const {data} = payCondsList

useEffect(() => {
  let c = []
  if (tech.cst){
  tech.cst.forEach(i => {
    c.push({
      task: i.task,
      metr: i.metr, 
      count: i.count,
      ppu: '',
      sum: 0, 
      info: ''
    })
  });}
  setCst(c)
}, [tech.cst])

useEffect(() => {
  let c = []
  if (tech.cal){
  tech.cal.forEach(i => {
    c.push({
      task_name: i.task_name,
      period: i.period, 
      cp_period: '',
    })
  });}
  setCal(c)
}, [tech.cal])

const onClickAccept = () => {
  if (pay_cond == ''){
    alert('Введите условия оплаты')
    return
  } 
  if (end_date == ''){
    alert('Введите срок действия КП')
    return
  } 
  for (let i = 0; i < cst.length; i++) {
    if(cst[i].ppu===''){
      alert('Проверьте правильность заполнения стоимостей. Все цены за единицу должны быть заполнены')
      return
    }
    
  }
  for (let i = 0; i < cal.length; i++) {
    if(cal[i].cp_period===''){
      alert('Проверьте правильность заполнения графика работ. Все периоды должны быть заполнены')
      return
    }
    
  }
    dispatch(createCP(parseInt(match.params.tz_id), pay_cond, end_date, info, cal, cst, date, docs, tech.proj))
    history.push('/commertial')
}

    return(
        <div className='one_item'>
          <div>
        <div>
            <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
        <table className="table" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'><h2>Общие данные по ТЗ</h2></td>
            </tr>
            <tr>
              <td>Клиент</td>
              <td>
              <Link to={`/orgs/link/${tech.o_id}`} >
                  {tech.client}
                </Link>
                  </td>
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
              <td>{tech.date ? tech.date.slice(0, 10):""}</td>
            </tr>
            <tr>
              <td>Дата завершения сбора КП</td>
              <td>{tech.end_date ? tech.end_date.slice(0, 10):''}</td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>{tech.privacy==="false" ? 'Общий' : 'Закрытый'}</td>
            </tr>
            <tr>
              <td>Номер ТЗ</td>
              <td>
              <Link to={`/techs/link/${tech.tz_id}`} >
                  {tech.tz_id}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td>Статус ТЗ</td>
              <td>{Date.parse(tech.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td colSpan="2">
                  <h5>Описание работ по ТЗ</h5>
            </td>
            </tr>
            <tr>
              <td colSpan="2">{tech.info}</td>
            </tr>
            <tr>
              <td colSpan="2">
                  <h5>Документация ТЗ</h5>
                  </td>
            </tr>
            <tr>
              <td colSpan="2">{tech.docs ? tech.docs.map((item, i)=>{
        return (
          <p className="text-start" key={'e'+i}>{item}</p>
       )}) : <p className="text-start">Документов нет</p>}
       </td>
            </tr>
            
          </tbody>
        </table>
        </td>
        
        
        
        
        <td valign='top' align='justify'>
          <div className="table-responsive">
        <table className="table" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'><h2>Общие данные от поставщика</h2></td>
            </tr>
            <tr>
              <td>Поставщик</td>
              <td>
              <Link to={`/orgs/link/${userInfo.o_id}`} >
                  {userInfo.name}
                </Link>
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
                  {data ? data.countries ? data.countries.map((item, i) => { return(
                    <Dropdown.Item key={'gr'+i} value={item} onSelect={(e)=>setPay_cond(item)}>{item}</Dropdown.Item>
                    )}): 'Список пуст' :'Список пуст'}
                </Dropdown.Menu>    
                </InputGroup>
              </Dropdown>
              </td>
            </tr>
            <tr>
              <td>Дата предоставления КП</td>
              <td>{date}</td>
            </tr>
            <tr>
              <td>Срок действия КП</td>
              <td>
                <InputMask mask="9999-99-99" value={end_date} onChange={(e)=>{setEnd_date(e.target.value)}} className='cr_input' alwaysShowMask='true' />
              </td>
            </tr>
            <tr>
              <td>Статус КП</td>
              <td>Активно</td>
            </tr>
            <tr>
              <td colSpan="2"><h5>Описание работ от поставщика</h5></td>
            </tr>
            <tr>
              <td colSpan="2">
                <Form.Control className='cr_input' value={info} onChange={(e)=>setInfo(e.target.value)}></Form.Control>
                </td>
            </tr>
            <tr>
              <td colSpan="2"><h5>Документация от поставщика</h5></td>
            </tr>
            <tr>
              <td colSpan="2"><p>Добавление документов возможно из панели редактирования КП</p>
       </td>
            </tr>
          </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>


          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
          
        <table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th>Наименование работ</th>
        <th>Единицы измерения</th>
        <th>Кол-во</th>
        <th>Цена б/НДС/ед.</th>
        <th>Итого б/НДС</th>
        <th>Комментарий</th>
      </tr>
    </thead>
    <tbody>
      {cst ? cst.map((item, i)=>{
        return (
      <tr key={'w'+i}>
        <td key={'ww'+i}>{item.task}</td>
        <td key={'www'+i}>{item.metr}</td>
        <td key={'wwww'+i}>{item.count}</td>
        <td key={'rr'+ i}>
          <InputMask key={'rrr'+ i} mask='999999999999' maskChar={null} className='cr_input' id={"p"+i} onChange={onPPUChange}></InputMask>
          </td>
        <td key={'rrrr'+ i}>{item.count * item.ppu}</td>
        <td key={'rrrrr'+ i}>
          <input className='cr_input' id={"i" + i} onChange={onInfoChange}></input>
          </td>

      </tr>)}): <tr><td>Разбивка стоимости заказчиком не указана</td></tr>}
    </tbody>
  </table> 
  

</td>
</tr>
</tbody>
</table>


  <h5 className="text-start">График выполнения работ</h5>
  <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
          <table className="table" id="org_table">
    <thead>
    <tr className="org_head">
        <th>Наименование работ</th>
        <th colSpan="2">Требования клиента</th>
        <th colSpan="2">Предложение поставщика</th>
      </tr>
      <tr className="org_head">
        <th></th>
        <th>Период, КН</th>
        <th>Срок</th>
        <th>Период, КН</th>
        <th>Срок</th>
      </tr>
    </thead>
    <tbody>
      {cal ? cal.map((item, i)=>{ tz_last = tz_last + item.period
        return (
      <tr key={'a'+ i}>
        <td key={'aa'+ i}>{item.task_name}</td>
        <td key={'aaa'+ i}>{item.period}</td>
        <td key={'aaaa'+ i}>{new Date(tech.end_date).getWeek() + tz_last}</td>
        <td key={'tt'+ i}>
          <InputMask key={'ttt'+ i} mask='999999999999' maskChar={null} className='cr_input' id={"e"+i} onChange={onPeriodChange}></InputMask>
          </td>
      </tr>)}) : <p>План работ заказчиком не указан</p>}
    </tbody>
  </table> 
  </td>
</tr>
</tbody>
</table>
<div className='enter'>
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}><h3>Подтвердить</h3></button>
</div>
</div>

</div>
)
  }


const CP_New =withRouter(One_CP) 
export default CP_New;