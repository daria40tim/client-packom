import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listCPDetails, cpUpdate, cpDeleteCal, cpDeleteCst } from '../actions/cpAction';
import { cpDeleteCalReducer, cpDeleteCstReducer } from '../reducers/cpReducers';


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
    const [dcs, setDcs] = useState([])
    const [doc, setDoc] = useState('')
    const [file, setFile] = useState()
  let tz_last = 0
  let last = 0
  let c = []
  let ca = []

  const history = useHistory()

  const dispatch = useDispatch()

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const cpDetails = useSelector(state => state.cpDetails)
  const {loading, error, cp} = cpDetails

  useEffect(() => {
    dispatch(listCPDetails(match.params.cp_id))
  }, [dispatch, match])


    const onClickCst = (e) => {
        cp.tz_costs.forEach(element => {
            c.push({
                task: element.task,
                ppu: element.ppu,
                info: ''
            })
        });
        for (let index = 0; index < c.length; index++) {
            if (!Number.isInteger(document.getElementById(index).value)){
              alert('Поля цен за единицу должны быть целыми')
              return
            }
            if (document.getElementById(index).value != ''){ 
            c[index].ppu = document.getElementById(index).value}
            document.getElementById(index).setAttribute('disabled', true)
        }
        for (let index = 0; index < c.length; index++) {
            if (document.getElementById(index+100000).value != ''){
            c[index].info = document.getElementById(index+100000).value}
            document.getElementById(index+100000).setAttribute('disabled', true)
        }
        setCst([...c])
        document.getElementById(e.target.id).setAttribute('disabled', true)
        dispatch(cpDeleteCst(match.params.cp_id))
        console.log(c[0].ppu)

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

      fetch(`http://127.0.0.1:8000/api/cps/docs/${parseInt(match.params.cp_id)}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      let d = [...docs]
      d.push(fileInput.files[0].name)
      setDocs(d)

      alert('Документ добавлен')
    }

    const onClickCal = (e) => {
        cp.tz_calendars.forEach(element => {
            ca.push({
                task_name: element.task_name,
                period: element.period,
                term: 0
            })
        });
        for (let index = 0; index < ca.length; index++) {
          if (!Number.isInteger(document.getElementById(index+200000).value)){
            alert('Поля периодов должны быть целыми')
            return
          }
            if (document.getElementById(index+200000).value != ''){ 
            ca[index].period = parseInt(document.getElementById(index+200000).value)}
            document.getElementById(index+200000).setAttribute('disabled', true)
        }
        setCal([...ca])
        document.getElementById(e.target.id).setAttribute('disabled', true)
        
        dispatch(cpDeleteCal(match.params.cp_id))
        
        console.log(ca[0].task_name)

    }
    const onClickAccept = (e) => {
        let hi = ''
        let pay_cond_ = ''
        if (pay_cond != ''){ 
            pay_cond_ = pay_cond
            hi = hi + " \n Изменены условия оплаты: " + pay_cond_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            pay_cond_ = cp.pay_cond
        }
        let end_date_ = ''
        if (end_date != ''){ 
            end_date_ = end_date
            hi = hi + " \n Изменена конечная дата: " + end_date_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            end_date_ = cp.end_date
        }
        let info_ = ''
        if (info != ''){ 
            info_ = info
            hi = hi + " \n Изменена общая информация: " + info_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            info_ = cp.info
        }
        let cal_ = []
        if (cal != []){ 
            cal_ = cal
            cal.forEach(element => {
              hi = hi + " \n Обновлен график: " + element.task_name + " длительностью " + element.period + " кн. Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            cal_ = cal
        }
        let cst_ = []
        if (cst != []){ 
            cst_ = cst
            cst.forEach(element => {
              hi = hi + " \n Обновлена стоимость: " + element.task + ". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            cst_ = cst
        }
        let docs_ = []
        if (docs != []){ 
            docs_ = docs
            docs.forEach(element => {
              hi = hi + " \n Добавлен документ: " + element + ". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            docs_ = docs
        }

        dispatch(cpUpdate(parseInt(match.params.cp_id), pay_cond_, end_date_, info_, cal, cst, dcs, hi+cp.history))
        history.push('/commertial/')
    }


    return(
        <div className='one_item'>
          <div>
        <h4 id="name" className="text-center">Общие данные по ТЗ</h4>
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
              <Link to={`/orgs/link/${cp.tz_o_id}`} >
                  {cp.client}
                </Link>
                  </td>
            </tr>
            <tr>
              <td scope="col">Проект</td>
              <td scope="col">{cp.proj}</td>
            </tr>
            <tr>
              <td scope="col">Группа упаковки</td>
              <td scope="col">{cp.group}</td>
            </tr>
            <tr>
              <td scope="col">Тип упаковки</td>
              <td scope="col">{cp.type}</td>
            </tr>
            <tr>
              <td scope="col">Вид упаковки</td>
              <td scope="col">{cp.kind}</td>
            </tr>
            <tr>
              <td scope="col">Вид задания</td>
              <td scope="col">{cp.task_name}</td>
            </tr>
            <tr>
              <td scope="col">Условия оплаты</td>
              <td scope="col">{cp.tz_pay_cond}</td>
            </tr>
            <tr>
              <td scope="col">Дата начала сбора КП</td>
              <td scope="col">{cp.tz_date}</td>
            </tr>
            <tr>
              <td scope="col">Дата завершения сбора КП</td>
              <td scope="col">{cp.tz_end_date}</td>
            </tr>
            <tr>
              <td scope="col">Доступ к данным ТЗ</td>
              <td scope="col">{cp.privacy}</td>
            </tr>
            <tr>
              <td scope="col">Номер ТЗ</td>
              <td scope="col">
              <Link to={`/techs/link/${cp.tz_id}`} >
                  {cp.tz_id}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td scope="col">Статус ТЗ</td>
              <td scope="col">{Date.parse(cp.tz_end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">
                  <h5>Описание работ по ТЗ</h5>
            </td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">{cp.tz_info}</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">
                  <h5>Документация ТЗ</h5>
                  </td>
            </tr>
            <tr>
              <td scope="col" colSpan="2">{cp.tz_docs ? cp.tz_docs.map((item, i)=>{
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
              <Link to={`/orgs/link/${cp.o_id}`} >
                  {cp.org}
                </Link>
            </td>
            </tr>
            <tr>
              <td scope="col">Условия оплаты</td>
              <td scope="col"><input className='cr_input' name='pay_cond' value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)} placeholder={cp.pay_cond}></input></td>
            </tr>
            <tr>
              <td scope="col">Дата предоставления КП</td>
              <td scope="col">{cp.date}</td>
            </tr>
            <tr>
              <td scope="col">Срок действия КП</td>
              <td scope="col"><input className='cr_input' name='pay_cond' value={end_date} onChange={(e)=>setEnd_date(e.target.value)} placeholder={cp.end_date}></input></td>
            </tr>
            <tr>
              <td scope="col">Статус КП</td>
              <td scope="col">{Date.parse(cp.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><h5>Описание работ от поставщика</h5></td>
            </tr>
            <tr>
            <td scope="col" colSpan="2"><input className='cr_input' name='pay_cond' value={info} onChange={(e)=>setInfo(e.target.value)} placeholder={cp.info}></input></td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"><h5>Документация от поставщика</h5></td>
            </tr>
            <tr>
              <td scope="col" colSpan="2"> {cp.docs ? cp.docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start"></p>}
         {docs ? docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start">Документов нет</p>}
           <input type="file" className="form-control-file" id="myfileinput" onChange={(e)=>setFile(e.target.files[0])}/>
           <button type="button" className="btn btn-outline-dark m-5" onClick={onClickDocs}>Добавить</button>
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
      {cp.tz_costs ? cp.tz_costs.map((item, i)=>{
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
{cp.tz_costs ? cp.tz_costs.map((item, i)=>{
        return (
      <tr>
        <td><input  name='pay_cond' id={i} placeholder={item.ppu} type="text"></input></td>
        <td></td>
        <td><input className='cr_input' name='pay_cond' id={i+100000} placeholder={item.info}></input></td>

      </tr>)}): <p>Разбивка стоимости заказчиком не указана</p>}
    </tbody>
    </table>
</td>
</tr>
</tbody>
</table>

<button type="button" id='ac_btn' className="btn btn-outline-dark" onClick={onClickCst}>Сохранить</button>


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
      {cp.tz_calendars ? cp.tz_calendars.map((item, i)=>{ tz_last = tz_last + item.period
        return (
      <tr>
        <td>{item.task_name}</td>
        <td>{item.period}</td>
        <td>{new Date(cp.end_date).getWeek() + tz_last}</td>
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
      {cp.tz_calendars ? cp.tz_calendars.map((item, i)=>{ last = last + item.period
        return (
      <tr>
        <td><input className='cr_input' id={i+200000} name='pay_cond' pattern="[0-9]*" placeholder={item.period}></input></td>
        <td></td>
      </tr>)}) : <p></p> }
    </tbody>
  </table> 
  <button type="button" className="btn btn-outline-dark" id='sm_btn' onClick={onClickCal}>Сохранить</button>
  </td>
</tr>
</tbody>
</table>

  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area' value={cp.history} rows="5"></textarea>
</div>
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}>Подтвердить</button>
</div>
)
  }


const CP_Upd =withRouter(One_CP) 
export default CP_Upd;