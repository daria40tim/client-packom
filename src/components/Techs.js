import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { listTechs, sortTechsByClient, sortTechsByDate, sortTechsByStatus, sortTechsByTzId, sortTechsByEndDate } from '../actions/tzAction';
import '../index.css'
import { selectListReducer } from '../reducers/selectReducer';
import Filters from './Filters';
import Loader from './Loader';
import Message from './Message';

let stats = ['Активно', 'Архив']
let cp = ['Активно', 'Архив', 'Отклонено', 'Принято']
let optios = ['Номер ТЗ', 'Дата ТЗ', 'Клиент', 'Дата завершения', 'Статус ТЗ']



const  Techs = () =>  {
 /* constructor(props) {
    super(props);
        this.state = {
          data: data, 
          dateFlag: true, 
          idFlagF: true,
          clientFlag: true, 
          end_dateFlag: true,
          tz_stFlag: true,
          cp_stFlag: true,
          filterData: this.props.filterData,
          fname: '', 
          fgroup: '', 
          fcountry: '', 
          fspec: []
        };
  
        this.onClickClient = this.onClickClient.bind(this)
        this.onClickCommStat = this.onClickCommStat.bind(this)
        this.onClickDate = this.onClickDate.bind(this)
        this.onClickEndDate = this.onClickEndDate.bind(this)
        this.onClickId = this.onClickId.bind(this)
        this.onClickTZStat = this.onClickTZStat.bind(this)
        this.onClick = this.onClick.bind(this)
    }*/



    /*onClick(e){
      e.preventDefault();

      let name = document.getElementById('name_select').value
      
      let group = ""
      if (document.getElementById('gridRadios1').checked) group = 'Поставщик'
      if (document.getElementById('gridRadios2').checked) group = 'Клиент'
      if (document.getElementById('gridRadios3').checked) group = 'Клиент, поставщик'
      
      let country = document.getElementById('country_select').value

      let spec = []
      for (let i=0; i<specs.length;i++) {
        if  (document.getElementById(i).checked) spec.push(document.getElementById(i).value)
      }
      

      this.setState({
        fname: name, 
        fgroup: group, 
        fcountry: country, 
        fspec: spec,
      })

      this.props.handler(name)
    }*/

  const onClickDate = () => {
    dispatch(sortTechsByDate(data.techs, dateFlag))
    setDateFlag(!dateFlag)
  }

  const onClickClient = () => {
    dispatch(sortTechsByClient(data.techs, clientFlag))
    setClientFlag(!clientFlag)
  }

  const onClickId = () => {
    dispatch(sortTechsByTzId(data.techs, tz_idFlag))
    setTzIdFlag(!tz_idFlag)
  }
  
  const onClickEndDate = () => {
    dispatch(sortTechsByEndDate(data.techs, end_dateFlag))
    setEndDateFlag(!end_dateFlag)
  }

  const onClickTZStat = () => {
    dispatch(sortTechsByStatus(data.techs, statusFlag))
    setStatusFlag(!statusFlag)
  }
  

  const history = useHistory()
  const onClickTZ = () => {
    history.push(`/techs/create`)
  }

  const dispatch = useDispatch()

  const tzList = useSelector(state => state.tzList)
  const [tz_idFlag, setTzIdFlag] = useState(true)
  const [dateFlag, setDateFlag] = useState(true)
  const [end_dateFlag, setEndDateFlag] = useState(true)
  const [statusFlag, setStatusFlag] = useState(true)
  const [clientFlag, setClientFlag] = useState(true)
  
  
  useEffect(() => {dispatch(listTechs())}, [dispatch])
  const {loading, error, data} = tzList
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null




    return(
      <div>
         {loading ? (
        <div ><Loader/>
        </div>
        ) : error ? <Message variant='danger'>{error}</Message> :
        <table className="table main_table">
        <tr>
          <td valign="top" align="justify">
            <div>
            <Filters></Filters>
            </div>
</td>



<td align='justify' valign="top">
      <div className='list'> 
      {userInfo.group_id == "1" || userInfo.group_id == "3" ? 
  <button type="button" className="btn btn-outline-dark m-2" onClick={onClickTZ}>
    Добавить ТЗ
    </button> :''} 
    <table className="table main_t">
    <thead>
      <tr className="org_head">
        <th scope="col">
          <label>Номер ТЗ</label>
          <button onClick={onClickId} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={tz_idFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">
          <label>Дата ТЗ</label>
          <button onClick={onClickDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Клиент</label>
          <button onClick={onClickClient} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={clientFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Дата завершения</label>
          <button onClick={onClickEndDate} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={end_dateFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
            <label>Статус ТЗ</label>
            <button onClick={onClickTZStat} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={statusFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
            </th>
            <th scope="col">
            <p>Статус КП</p>
            </th>
        <th scope="col">
            <p>Проект</p>
        </th>
        <th scope="col">Группа упаковки</th>
        <th scope="col">Тип упаковки</th>
        <th scope="col">Вид упаковки</th>
        <th scope="col">Вид задания</th>
       
        <th scope="col">Статус тендера</th>
        <th scope="col">Кол-во КП</th>
        
      </tr>
    </thead>
    <tbody>
      {data.techs ? data.techs.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/techs/link/${item.tz_id}`} >
            {item.tz_id}
          </Link>
        </td>
        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
        <td>{item.client}</td>
        <td>{new Date(item.end_date).toISOString().slice(0, 10)}</td>
        <td>{Date.parse(item.end_date)> Date.now() ? 'Активно' : 'Архив'}</td>
        <td>{userInfo.group_id == 1 || userInfo.o_id == item.o_id ? '-'
        : !data.cps ? 'Не подано'
        : data.cps.find(value => {return value.tz_id == item.tz_id}) ? 'Подано' : 'Не подано'}
        </td>
        <td>{item.proj}</td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task}</td>
        <td>{item.selected_cp != 0 ? 'Принят' : !item.active ? 'Отменен' : Date.parse(item.end_date)> Date.now() ? 'Сбор КП' : 'Ожидает решения'}</td>
        <td>{item.count}</td>
        
      </tr>)}):<h5>Нет ТЗ</h5>}
    </tbody>
  </table> 
</div>
</td>
</tr>
</table>}
</div>
)
  }

export default Techs;





/*
<div className="filter">
      <form>
  
      <div>
      <p>Номер ТЗ</p>
  <select className="form-select" id="name_select">
          <option disabled>Выберите номер</option>
          <option selected value="">Не выбрано</option>
          {data.techs ? data.techs.map((item, i)=>{
      return (
          <option value={item.tz_id}>{item.tz_id}</option>
      )}): <p></p>}
      </select>
      </div>

  <div>
  <p>Дата создания</p>
  <p>C</p>
  <input className="form-text-input" type="text"/>
  </div>
  <div>
  <p>По</p>
  <input className="form-text-input" type="text"/>
      </div>

<div>
      <p>Клиент</p>
  <select className="form-select" id="name_select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.techs ? data.techs.map((item, i)=>{
      return (
          <option value={item.client}>{item.client}</option>
      )}) : <p></p>}
      </select>
      </div>


<div>
      <p>Номер ТЗ</p>
  <select className="form-select" id="name_select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.techs ? data.techs.map((item, i)=>{
      return (
          <option value={item.tz_id}>{item.tz_id}</option>
      )}): <p></p>}
      </select>
</div>

<div>
      <p>Дата завершения</p>
      <p>C</p>
  <input className="form-text-input" type="text"/>
  </div>
  <div>
  <p>По</p>
  <input className="form-text-input" type="text"/>
</div>

<div>
<div>
      <p>Статус КП</p>
  <div>
      {data.cp ?data.cp.map((item, i)=>{
      return (
        <div>
        <input type="checkbox" value={item}  id={i}/>
        <label>
          {item}
        </label>
        </div>
        
      )}):<p></p>}

</div>
</div>

      <p>Статус ТЗ</p>
  <div>


          
      {stats.map((item, i)=>{
      return (
        <div className="form-check">
        <input className="form-check-input" type="checkbox" value={item}  id={i}/>
        <label className="form-check-label">
          {item}
        </label>
        </div>
        
      )})}

      </div>
</div>
    <button type="button" className="btn btn-outline-dark" onClick={this.onClick}>Применить</button>
</form>
</div>



let data = [
    {
        'date': '12.01.2021', 
        'client': 'Организация 8', 
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
        'cp_st': 'Не подано'
    },
    {
      'date': '12.01.2021', 
      'client': 'Организация 8', 
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
      'cp_st': 'Не подано'
  },
  {
    'date': '12.01.2021', 
    'client': 'Организация 8', 
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
    'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
    {
        'date': '05.03.2020', 
        'client': 'Организация 1', 
        'tz_id': '4368', 
        'end_date': '15.03.2020', 
        'proj': 'ГК 6040', 
        'group': 'Гофрокороб', 
        'kind': 'Специальная', 
        'type': 'Одноразовая', 
        'task': 'Изготовление серии', 
        'tz_st': 'Архив', 
        'tender_st': 'Завершен', 
        'count': '', 
        'cp_st': 'Отклонено'
    },
    {
        'date': '20.02.2020', 
        'client': 'Организация 1', 
        'tz_id': '4368', 
        'end_date': '05.03.2020', 
        'proj': 'ГК 6040', 
        'group': 'Гофрокороб', 
        'kind': 'Стандартная', 
        'type': 'Одноразовая', 
        'task': 'Изготовление серии', 
        'tz_st': 'Архив', 
        'tender_st': 'Завершен', 
        'count': '', 
        'cp_st': 'Принято'
    },
    {
      'date': '12.01.2021', 
      'client': 'Организация 8', 
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
      'cp_st': 'Не подано'
  },
  {
    'date': '12.01.2021', 
    'client': 'Организация 8', 
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
    'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},

{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},
{
  'date': '12.01.2021', 
  'client': 'Организация 8', 
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
  'cp_st': 'Не подано'
},

    {
        'date': '12.01.2021', 
        'client': 'Организация 1', 
        'tz_id': '4368', 
        'end_date': '26.01.2021', 
        'proj': 'ГК 6040', 
        'group': 'Гофрокороб', 
        'kind': 'Стандартная', 
        'type': 'Одноразовая', 
        'task': 'Изготовление серии', 
        'tz_st': 'Архив', 
        'tender_st': 'Требуется решение', 
        'count': '2', 
        'cp_st': ''
    },
]*/