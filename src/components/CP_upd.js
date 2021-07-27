import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listCPDetails, cpUpdate, cpDeleteCal, cpDeleteCst } from '../actions/cpAction';
import {listPayConds} from '../actions/selectAction'
import InputMask from "react-input-mask";
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
    const [docs, setDocs] = useState([])
    const [dcs] = useState([])
    const [setFile] = useState()
  let tz_last = 0
  let last = 0
  let c = []
  let ca = []

  const history = useHistory()

  const dispatch = useDispatch()

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const cpDetails = useSelector(state => state.cpDetails)
  const {cp} = cpDetails

  useEffect(() => {
    dispatch(listCPDetails(match.params.cp_id))
  }, [dispatch, match])

const payCondsList = useSelector(state => state.payCondsList)

useEffect(() => {dispatch(listPayConds())}, [dispatch])
const {data} = payCondsList



    /*const onClickCst = (e) => {
        cp.tz_costs.forEach(element => {
            c.push({
                task: element.task,
                ppu: element.ppu,
                info: ''
            })
        });
        for (let index = 0; index < c.length; index++) {
            if (document.getElementById(index).value !== ''){ 
            c[index].ppu = document.getElementById(index).value}
            document.getElementById(index).setAttribute('disabled', true)
        }
        for (let index = 0; index < c.length; index++) {
            if (document.getElementById(index+100000).value !== ''){
            c[index].info = document.getElementById(index+100000).value}
            document.getElementById(index+100000).setAttribute('disabled', true)
        }
        setCst([...c])
        document.getElementById(e.target.id).setAttribute('disabled', true)
        dispatch(cpDeleteCst(match.params.cp_id))
        console.log(c[0].ppu)

    }*/

    const onClickDocs= () => {
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

    /*const onClickCal = (e) => {
        cp.tz_calendars.forEach(element => {
            ca.push({
                task_name: element.task_name,
                period: element.period,
                term: 0
            })
        });
        for (let index = 0; index < ca.length; index++) {
            if (document.getElementById(index+200000).value !== ''){ 
            ca[index].period = parseInt(document.getElementById(index+200000).value)}
            document.getElementById(index+200000).setAttribute('disabled', true)
        }
        setCal([...ca])
        document.getElementById(e.target.id).setAttribute('disabled', true)
        
        dispatch(cpDeleteCal(match.params.cp_id))
        
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
    useEffect(() => {
      let c = []
      if (cp.costs){
        cp.costs.forEach(i => {
        c.push({
          task: i.task,
          metr: i.metr, 
          count: i.count,
          ppu: i.ppu,
          sum: 0, 
          info: i.info
        })
      });}
      setCst(c)
    }, [cp.costs])
    
    useEffect(() => {
      let c = []
      if (cp.calendars){
        cp.calendars.forEach(i => {
        c.push({
          task_name: i.task_name,
          period: i.period, 
          cp_period: i.cp_period,
        })
      });}
      setCal(c)
    }, [cp.cal])


    const onClickAccept = (e) => {
        let hi = ''
        let pay_cond_ = ''
        if (pay_cond !== ''){ 
            pay_cond_ = pay_cond
            hi = hi + " \n Изменены условия оплаты: " + pay_cond_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            pay_cond_ = cp.pay_cond
        }
        let end_date_ = ''
        if (end_date !== ''){ 
            end_date_ = end_date
            hi = hi + " \n Изменена конечная дата: " + end_date_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            end_date_ = cp.end_date
        }
        let info_ = ''
        if (info !== ''){ 
            info_ = info
            hi = hi + " \n Изменена общая информация: " + info_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            info_ = cp.info
        }
        /*let cal_ = []
        if (cal !== []){ 
            cal_ = cal
            cal.forEach(element => {
              hi = hi + " \n Обновлен график: " + element.task_name + " длительностью " + element.period + " кн. Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            cal_ = cal
        }
        let cst_ = []
        if (cst !== []){ 
            cst_ = cst
            cst.forEach(element => {
              hi = hi + " \n Обновлена стоимость: " + element.task + ". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            cst_ = cst
        }*/
        /*let docs_ = []
        if (docs !== []){ 
            docs_ = docs
            docs.forEach(element => {
              hi = hi + " \n Добавлен документ: " + element + ". Дата: " + new Date().toISOString().slice(0, 10)
            });
        }else {
            docs_ = docs
        }*/

        dispatch(cpUpdate(parseInt(match.params.cp_id), pay_cond_, end_date_, info_, cal, cst, dcs, hi+cp.history))
        history.push('/commertial/')
    }


    return(
        <div className='one_item'>
          <div>
        <div className='table-responsive'>
            <table className="table w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
        <table className="table w-100" >
          <thead>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'><h2>Общие данные по ТЗ</h2></td>
            </tr>
            <tr>
              <td>Клиент</td>
              <td>
              <Link to={`/orgs/link/${cp.tz_o_id}`} >
                  {cp.client}
                </Link>
                  </td>
            </tr>
            <tr>
              <td>Проект</td>
              <td>{cp.proj}</td>
            </tr>
            <tr>
              <td>Группа упаковки</td>
              <td>{cp.group}</td>
            </tr>
            <tr>
              <td>Тип упаковки</td>
              <td>{cp.type}</td>
            </tr>
            <tr>
              <td>Вид упаковки</td>
              <td>{cp.kind}</td>
            </tr>
            <tr>
              <td>Вид задания</td>
              <td>{cp.task_name}</td>
            </tr>
            <tr>
              <td>Условия оплаты</td>
              <td>{cp.tz_pay_cond}</td>
            </tr>
            <tr>
              <td>Дата начала сбора КП</td>
              <td>{cp.tz_date ? cp.tz_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td>Дата завершения сбора КП</td>
              <td>{cp.tz_end_date ? cp.tz_end_date.slice(0,10):""}</td>
            </tr>
            <tr>
              <td>Доступ к данным ТЗ</td>
              <td>{cp.privacy}</td>
            </tr>
            <tr>
              <td>Номер ТЗ</td>
              <td>
              <Link to={`/techs/link/${cp.tz_id}`} >
                  {cp.tz_id}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td>Статус ТЗ</td>
              <td>{Date.parse(cp.tz_end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td colSpan="2">
                  <h5>Описание работ по ТЗ</h5>
            </td>
            </tr>
            <tr>
              <td colSpan="2">{cp.tz_info}</td>
            </tr>
            <tr>
              <td colSpan="2">
                  <h5>Документация ТЗ</h5>
                  </td>
            </tr>
            <tr>
              <td colSpan="2">{cp.tz_docs ? cp.tz_docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
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
              <Link to={`/orgs/link/${cp.o_id}`} >
                  {cp.org}
                </Link>
            </td>
            </tr>
            <tr>
              <td>Условия оплаты</td>
              <td>
                <Dropdown> 
                <InputGroup className="mb-3">
              <Form.Control className='dr_input'  value={pay_cond} onChange={(e)=>setPay_cond(e.target.value)} placeholder={cp.pay_cond}/>
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
              <td>{cp.date ? cp.date.slice(0, 10):''}</td>
            </tr>
            <tr>
              <td>Срок действия КП</td>
              <td>
                <label>Предыдущее значение - {cp.end_date ? cp.end_date.slice(0,10):''}</label>
                <InputMask mask="9999-99-99" value={end_date} onChange={(e)=>{setEnd_date(e.target.value)}} className='cr_input' alwaysShowMask='true' />
                </td>
            </tr>
            <tr>
              <td>Статус КП</td>
              <td>{Date.parse(cp.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td colSpan="2"><h5>Описание работ от поставщика</h5></td>
            </tr>
            <tr>
            <td colSpan="2"><Form.Control className='cr_input' value={info} onChange={(e)=>setInfo(e.target.value)} placeholder={cp.info}></Form.Control></td>
            </tr>
            <tr>
              <td colSpan="2"><h5>Документация от поставщика</h5></td>
            </tr>
            <tr>
              <td colSpan="2"> {cp.docs ? cp.docs.map((item, i)=>{
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
      <tr>
        <td>{item.task}</td>
        <td>{item.metr}</td>
        <td>{item.count}</td>
        <td>
          <InputMask key={'rrr'+ i} mask='999999999999' maskChar={null} className='cr_input' id={"p"+i} onChange={onPPUChange} placeholder={item.ppu}></InputMask>
        </td>
        <td></td>
        <td> <input className='cr_input' id={"i" + i} onChange={onInfoChange} placeholder={item.info}></input></td>

      </tr>)}): <p>Разбивка стоимости заказчиком не указана</p>}
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
                        <td valign='top' align='justify' width="100%">
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
      <tr>
        <td>{item.task_name}</td>
        <td>{item.period}</td>
        <td>{new Date(cp.end_date).getWeek() + tz_last}</td>
        <td>
        <InputMask key={'ttt'+ i} mask='999999999999' maskChar={null} className='cr_input' id={"e"+i} onChange={onPeriodChange} placeholder={item.cp_period}></InputMask>
        </td>
        <td></td>
      </tr>)}) : <p>План работ заказчиком не указан</p>}
    </tbody>
  </table> 
  </td>
</tr>
</tbody>
</table>

  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area' value={cp.history} rows="5"></textarea>
</div>
<div className="enter">
<button type="button" className="btn btn-outline-dark" onClick={onClickAccept}><h3>Подтвердить</h3></button>
</div>
</div>
)
  }


const CP_Upd =withRouter(One_CP) 
export default CP_Upd;