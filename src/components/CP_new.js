import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { createCP, listCPDetails } from '../actions/cpAction';
import { createTZ, listTechDetails } from '../actions/tzAction';


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
    const [docs, setDocs] = useState([])
    const [doc, setDoc] = useState('')
  let tz_last = 0
  let last = 0
  let c = []
  let ca = []

  const dispatch = useDispatch()

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const tzDetails = useSelector(state => state.tzDetails)
  const {loading, error, tech} = tzDetails
  const date = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    dispatch(listTechDetails(match.params.tz_id))
  }, [dispatch])

  const onClickDocs= (e) => {
    let costs = [...docs]
    costs.push(doc)
    setDocs(costs)
  }

const onClickCst = (e) => {
    tech.cst.forEach(element => {
        c.push({
            task: element.task,
            ppu: 0,
            info: ''
        })
    });
    for (let index = 0; index < c.length; index++) {
      if (!Number.isInteger(document.getElementById(index).value)){
        alert('Поля цен за единицу должны быть целыми')
        return
      }
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
}

const onClickCal = (e) => {
    tech.cal.forEach(element => {
        ca.push({
            task_name: element.task_name,
            period: 0,
            term: 0
        })
    });
    for (let index = 0; index < ca.length; index++) {
      if (!Number.isInteger(document.getElementById(index+200000).value)){
        alert('Поля периодов должны быть целыми')
        return
      }
        ca[index].period = parseInt(document.getElementById(index+200000).value)
        document.getElementById(index+200000).setAttribute('disabled', true)
    }
    setCal([...ca])
    document.getElementById(e.target.id).setAttribute('disabled', true)
    console.log(ca[0].task_name)
}

const history = useHistory()

const onClickAccept = (e) => {
    dispatch(createCP(parseInt(match.params.tz_id), pay_cond, end_date, info, cal, cst, date, docs, tech.proj))
    history.push('/commertial')
}

    return(
        <div className='one_item'>
          <div>
        <h5>Общие данные</h5>
        <div>
            <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
        <table className="table w-100 one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td scope="col" colSpan='2'><h5>Общие данные по ТЗ</h5></td>
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
              <td scope="col">{tech.date}</td>
            </tr>
            <tr>
              <td scope="col">Дата завершения сбора КП</td>
              <td scope="col">{tech.end_date}</td>
            </tr>
            <tr>
              <td scope="col">Доступ к данным ТЗ</td>
              <td scope="col">{tech.privacy=="false" ? 'Общий' : 'Закрытый'}</td>
            </tr>
            <tr>
              <td scope="col">Номер ТЗ</td>
              <td scope="col">
              <Link to={`/techs/link/${tech.tz_id}`} >
                  {tech.tz_id}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td scope="col">Статус ТЗ</td>
              <td scope="col">{Date.parse(tech.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">
                  <h5>Описание работ по ТЗ</h5>
            </td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">{tech.info}</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">
                  <h5>Документация ТЗ</h5>
                  </td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">{tech.docs ? tech.docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start">Документов нет</p>}
       </td>
            </tr>
            
          </tbody>
        </table>
        </td>
        
        
        
        
        <td valign='top' align='justify'>
        <table className="table one_item" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td scope="col" colSpan='2'><h5>Общие данные от поставщика</h5></td>
            </tr>
            <tr>
              <td scope="col">Поставщик</td>
              <td scope="col">
              <Link to={`/orgs/link/${userInfo.o_id}`} >
                  {userInfo.name}
                </Link>
            </td>
            </tr>
            <tr>
              <td scope="col">Условия оплаты</td>
              <td scope="col"><input className='cr_input' name='pay_cond' value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)}></input></td>
            </tr>
            <tr>
              <td scope="col">Дата предоставления КП</td>
              <td scope="col">{date}</td>
            </tr>
            <tr>
              <td scope="col">Срок действия КП</td>
              <td scope="col"><input className='cr_input' name='pay_cond' value={end_date} onChange={(e)=>setEnd_date(e.target.value)} placeholder='ГГГГ-ММ-ДД'></input></td>
            </tr>
            <tr>
              <td scope="col">Статус КП</td>
              <td scope="col">Активно</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><h5>Описание работ от поставщика</h5></td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><input className='cr_input' name='pay_cond' value={info} onChange={(e)=>setInfo(e.target.value)}></input></td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><h5>Документация от поставщика</h5></td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><h5>Добавление документов возможно из панели редактирования КП</h5>
       </td>
            </tr>
          </tbody>
        </table>
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

      </tr>)}): <p>Разбивка стоимости заказчиком не указана</p>}
    </tbody>
  </table> 
  

</td>
<td>
<table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th scope="col">Цена б/НДС/ед.</th>
        <th scope="col">Итого б/НДС</th>
        <th scope="col">Комментарий</th>
        </tr>
    </thead>
    <tbody>
    {tech.cst ? c.length>0 ? c.map((item, i)=>{
        return (
      <tr>
        <td>{c.ppu}</td>
        <td></td>
        <td>{c.info}</td>

      </tr>)}) :
    
    tech.cst.map((item, i)=>{
        return (
      <tr>
        <td><input className='cr_input' name='pay_cond' id={i}></input></td>
        <td></td>
        <td><input className='cr_input' name='pay_cond' id={i+100000}></input></td>

      </tr>)}): <p>Разбивка стоимости заказчиком не указана</p>}
    </tbody>
    </table>
</td>
</tr>
</tbody>
</table>

{ tech.cst ? <button type="button" id='ac_btn' className="btn btn-outline-dark" onClick={onClickCst}>Сохранить</button> : <div></div>}


  <h5 className="text-start">График выполнения работ</h5>
  <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
          <table className="table" id="org_table">
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
      {tech.cal ? tech.cal.map((item, i)=>{ tz_last = tz_last + item.period
        return (
      <tr>
        <td>{item.task_name}</td>
        <td>{item.period}</td>
        <td>{new Date(tech.end_date).getWeek() + tz_last}</td>
      </tr>)}) : <p>План работ заказчиком не указан</p>}
    </tbody>
  </table> 
  </td>
  <td valign='top' align='justify' width="50%">
  <table className="table" id="org_table">
    <thead>
    <tr className="org_head">
        <th scope="col" colSpan="3">Предложение поставщика</th>
      </tr>
      <tr className="org_head">
        <th scope="col">Период, КН</th>
        <th scope="col">Срок</th>
      </tr>
    </thead>
    <tbody>
      {tech.cal ? tech.cal.map((item, i)=>{ last = last + item.period
        return (
      <tr>
        <td><input className='cr_input' id={i+200000} name='pay_cond'></input></td>
        <td></td>
      </tr>)}) : <p></p> }
    </tbody>
  </table> 
  
  </td>
</tr>
</tbody>
</table>
<button type="button" className="btn btn-outline-dark" id='sm_btn' onClick={onClickCal}>Сохранить</button>
</div>
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}>Подтвердить</button>
</div>
)
  }


const CP_New =withRouter(One_CP) 
export default CP_New;
/* <td scope="col" colSpan="2">{docs ? docs.map((item, i)=>{
        return (
          <p className="text-justify">{item}</p>
       )}) : <p className="text-justify">Документов нет</p>}
               <input className='cr_input' value={doc} onChange={(e)=>setDoc(e.target.value)}></input>
        <button type="button" className="btn btn-outline-dark" onClick={onClickDocs}>Добавить</button> 
       </td>*/