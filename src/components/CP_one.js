import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { listCPDetails, listCpDownDoc } from '../actions/cpAction';


Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
const One_CP = ({match}) =>  {

  const history = useHistory()
  let tz_last = 0
  let last = 0

  const dispatch = useDispatch()

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  const cpDetails = useSelector(state => state.cpDetails)
  const {cp} = cpDetails

  const onClickDownload = (e) => {
    console.log(e.target.id)
    dispatch(listCpDownDoc(cp.docs[e.target.id], parseInt(match.params.cp_id)))
  }


  useEffect(() => {
    dispatch(listCPDetails(match.params.cp_id))
  }, [dispatch, match])

    const onClickChange = () => {
     history.push(`/cps/upd/${cp.cp_id}`)
    }

    return(
        <div  className='one_item'>
          <div>
       
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
              <td  colSpan='2'><h5>Общие данные по ТЗ</h5></td>
            </tr>
            <tr>
              <td >Клиент</td>
              <td >
              { cp ? <Link to={`/orgs/link/${cp.tz_o_id}`} >
                  {cp.client}
                </Link> : <p></p>}
                  </td>
            </tr>
            <tr>
              <td >Проект</td>
              <td >{cp ? cp.proj:''}</td>
            </tr>
            <tr>
              <td >Группа упаковки</td>
              <td >{cp ? cp.group : ''}</td>
            </tr>
            <tr>
              <td >Тип упаковки</td>
              <td >{cp ? cp.type: ''}</td>
            </tr>
            <tr>
              <td >Вид упаковки</td>
              <td >{cp.kind}</td>
            </tr>
            <tr>
              <td >Вид задания</td>
              <td >{cp.task_name}</td>
            </tr>
            <tr>
              <td >Условия оплаты</td>
              <td >{cp.tz_pay_cond}</td>
            </tr>
            <tr>
              <td >Дата начала сбора КП</td>
              <td >{cp.tz_date ? cp.tz_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td >Дата завершения сбора КП</td>
              <td >{cp.tz_end_date ? cp.tz_end_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td >Доступ к данным ТЗ</td>
              <td >{cp.privacy}</td>
            </tr>
            <tr>
              <td >Номер ТЗ</td>
              <td >
              <Link to={`/techs/link/${cp.tz_id}`} >
                  {cp.tz_id}
                  </Link>
                  </td>
            </tr>
            <tr>
              <td >Статус ТЗ</td>
              <td >{Date.parse(cp.tz_end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td  colSpan="2">
                  <h5>Описание работ по ТЗ</h5>
            </td>
            </tr>
            <tr>
              <td  colSpan="2">{cp.tz_info}</td>
            </tr>
            <tr>
              <td  colSpan="2">
                  <h5>Документация ТЗ</h5>
                  </td>
            </tr>
            <tr>
              <td  colSpan="2">{cp.tz_docs ? cp.tz_docs.map((item, i)=>{
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
              <td  colSpan='2'><h5>Общие данные от поставщика</h5></td>
            </tr>
            <tr>
              <td >Поставщик</td>
              <td >
              <Link to={`/orgs/link/${cp.o_id}`} >
                  {cp.org}
                </Link>
            </td>
            </tr>
            <tr>
              <td >Условия оплаты</td>
              <td >{cp.pay_cond}</td>
            </tr>
            <tr>
              <td >Дата предоставления КП</td>
              <td >{cp.date ? cp.date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td >Срок действия КП</td>
              <td >{cp.end_date ? cp.end_date.slice(0,10):''}</td>
            </tr>
            <tr>
              <td >Статус КП</td>
              <td >{Date.parse(cp.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
            </tr>
            <tr>
              <td  colSpan="2"><h5>Описание работ от поставщика</h5></td>
            </tr>
            <tr>
              <td  colSpan="2">{cp.info}</td>
            </tr>
            <tr>
              <td  colSpan="2"><h5>Документация от поставщика</h5></td>
            </tr>
            <tr>
              <td  colSpan="2"> {cp.docs ? cp.docs.map((item, i)=>{
        return (
          <button className="btn" onClick={onClickDownload} id={i}>{item}</button>
       )}) : <p className="text-start">Документов нет</p>}
       </td>
            </tr>
          </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
         
         {userInfo.o_id === cp.o_id ?
          <button type="button" className="btn btn-outline-dark" onClick={onClickChange}>Изменить</button> :
          <div></div>}

          <h5 className="text-start">Разбивка стоимости</h5>
          <table className="w-100">
                <thead></thead>
                <tbody>
                    <tr>
                        <td valign='top' align='justify' width="50%">
          <table className="table" id="org_table">
    <thead>
      <tr className="org_head">
        <th >Наименование работ</th>
        <th >Единицы измерения</th>
        <th >Кол-во</th>
        <th >Цена б/НДС/ед.</th>
        <th >Итого б/НДС</th>
        <th >Комментарий</th>
      </tr>
    </thead>
    <tbody>
      {cp.costs ? cp.costs.map((item, i)=>{
        return (
      <tr>
        <td>{item.task}</td>
        <td>{item.metr}</td>
        <td>{item.count}</td>
        <td>{item.ppu}</td>
        <td>{item.ppu*item.count}</td>
        <td>{item.info}</td>
      </tr>)}) : <p>Нет разбивки стоимости</p>}
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
        <th >Наименование работ</th>
        <th  colSpan="2">Требования клиента</th>
        <th  colSpan="2">Предложение поставщика</th>
      </tr>
      <tr className="org_head">
        <th ></th>
        <th >Период, КН</th>
        <th >Срок</th>
        <th >Период, КН</th>
        <th >Срок</th>
      </tr>
    </thead>
    <tbody>
      {cp.calendars ? cp.calendars.map((item, i)=>{ 
        tz_last = tz_last + item.tz_period
        last = last + item.period
        return (
      <tr>
        <td>{item.task_name}</td>
        <td>{item.tz_period}</td>
        <td>{(new Date(cp.tz_end_date).getWeek() + tz_last)>52?new Date(cp.tz_end_date).getWeek() + tz_last-52:new Date(cp.tz_end_date).getWeek() + tz_last}</td>
        <td>{item.period}</td>
        <td>{new Date(cp.end_date).getWeek() + last}</td>
      </tr>)}): <p>Нет плана работ</p>}
    </tbody>
  </table> 
  </td>

</tr>
</tbody>
</table>

  <h5 className="text-start">История изменений</h5>
  <textarea className='cr_area' value={cp.history} rows="5"></textarea>
</div>
</div>
)
  }


const CP_One =withRouter(One_CP) 
export default CP_One;





/*let data = 
    {'date': '14.01.2021',
    'cp_id': '1',
    'tz_date': '12.01.2021', 
    'org': 'Организация 3', 
    "o_id": '1',
    "tz_o_id": '1',
    "tz_org": 'Организация 8',
    'tz_id': '4368', 
    'end_date': '28.01.2021', 
    'tz_end_date': '26.01.2021', 
    'proj': 'ГК 6040', 
    'group': 'Гофрокороб', 
    'kind': 'Стандартная', 
    'type': 'Одноразовая', 
    'task': 'Изготовление серии', 
    'tz_st': 'Активно', 
    'tender_st': 'Не проведен', 
    'count': '', 
    'cp_st': 'Активно',
    'tz_pay_cond': '100% постоплата',
    'pay_cond': '30% предоплата',
    'private': 'Общий', 
    'tz_info': `Требуется изготовить и доставить 150 гофрокоробов. Изготавливаемая упаковка должна отвечать требованиям технической документации (см. вложение). Дополнительно необходимо нанести маркировку с 4-х сторон`,
    "info": `Производится согласно ТЗ`,
    "tz_docs": ["Пример.pdf", "1.doc"],
    "docs": ["Договор.doc"],
    "costs": [
        {
            "cost_id": 11,
            "task": "Изготовление серии",
            "metr": "шт.",
            "count": 0,
            "tz_id": 0,
            "cp_id": 4,
            "ppu": "150.00",
            "sum": "22500.00",
            "info": ""
        },
        {
            "cost_id": 12,
            "task": "Доставка",
            "metr": "рейс",
            "count": 0,
            "tz_id": 0,
            "cp_id": 4,
            "ppu": "3000.00",
            "sum": "3000.00",
            "info": ""
        }
    ],
    "tz_costs": [
        {
            "cost_id": 2,
            "task": "Изготовление серии",
            "metr": "шт.",
            "count": 150,
            "tz_id": 25,
            "cp_id": 0,
            "ppu": "0",
            "sum": "0",
            "info": ""
        },
        {
            "cost_id": 3,
            "task": "Доставка",
            "metr": "рейс",
            "count": 1,
            "tz_id": 25,
            "cp_id": 0,
            "sum": "0",
            "ppu": "0",
            "info": ""
        }
    ],
    "calendars": [
        {
            "cal_id": 19,
            "name": "Разработка концепта",
            "period": 1,
            "term": 6,
            "tz_id": 0,
            "cp_id": 4
        },
        {
            "cal_id": 20,
            "name": "Изготовление серии",
            "period": 1,
            "term": 8,
            "tz_id": 0,
            "cp_id": 4
        },
        {
            "cal_id": 21,
            "name": "Доставка",
            "period": 1,
            "term": 9,
            "tz_id": 0,
            "cp_id": 4
        }
    ],
    
    "tz_calendars": [
        {
            "cal_id": 4,
            "name": "Разработка концепта",
            "period": 1,
            "term": 7,
            "tz_id": 25,
            "cp_id": 0
        },
        {
            "cal_id": 5,
            "name": "Изготовление серии",
            "period": 2,
            "term": 9,
            "tz_id": 25,
            "cp_id": 0
        },
        {
            "cal_id": 6,
            "name": "Доставка",
            "period": 1,
            "term": 10,
            "tz_id": 25,
            "cp_id": 0
        }
    ],
    "cp_docs": ["Презентация.pdf", "Предложение.doc"],
    "tz_docs": ["Пример.pdf", "1.doc"],
    "history": "" 
    }*/