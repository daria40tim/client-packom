import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { listTenders } from '../actions/tenderAction';
import Filters from './Filters';
import Message from './Message';

let specs = ['Уп. материалы', 'Металлоконтейнеры']
let data = [
    {
        "tender_id":'7853', 
        'tz_id': '7868', 
        'date': '29.01.2021', 
        'proj': 'ГК 6040', 
        'group': 'Гофрокороб', 
        'type': 'Одноразовая', 
        'kind': 'Стандартная',
        'task': 'Изготовление серии',
        'count': '2', 
        'min_price': '170 руб.', 
        'max_price': '220 руб.',
        'checked': '12675',
        'sum': '25 500 руб.', 
        'tender_st': 'Требуется решение'
    },
]
let stats = ['Сбор КП', 'Требуется решение', 'Принято', 'Отменено']

const Tender = () => {
  /*constructor(props) {
    super(props);
        this.state = {
          data: this.props.data, 
          dateFlag: true, 
          tender_idFlag: true,
          tz_idFlag: true, 
          tender_stFlag: true,
          filterData: this.props.filterData,
          fname: '', 
          fgroup: '', 
          fcountry: '', 
          fspec: []
        };
  
        this.onClickDate = this.onClickDate.bind(this)
        this.onClickId = this.onClickId.bind(this)
        this.onClickTZId = this.onClickTZId.bind(this)
        this.onClickTenderSt = this.onClickTenderSt.bind(this)
        this.onClick = this.onClick.bind(this)
    }



    onClick(e){
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
    }

  onClickDate = () => {
    let arr = this.state.data.sort((a, b)=>{
      if ((a.date > b.date) && this.state.nameFlag) {
        return -1;
      }
      if ((a.date < b.date) && this.state.nameFlag) {
        return 1;
      }
      if ((a.date > b.date) && !this.state.nameFlag) {
        return 1;
      }
      if ((a.date < b.date) && !this.state.nameFlag) {
        return -1;
      }
      return 0;
    })
    
    this.setState({
      data: arr, 
      nameFlag: !this.state.nameFlag
    })

    this.forceUpdate()
  }

  onClickId = () => {
    let arr = this.state.data.sort((a, b)=>{
      if ((a.tender_id > b.tender_id) && this.state.tender_idFlag) {
        return -1;
      }
      if ((a.tender_id < b.tender_id) && this.state.tender_idFlag) {
        return 1;
      }
      if ((a.tender_id > b.tender_id) && !this.state.tender_idFlag) {
        return 1;
      }
      if ((a.tender_id < b.tender_id) && !this.state.tender_idFlag) {
        return -1;
      }
      return 0;
    })
    
    this.setState({
      data: arr, 
      tender_idFlag: !this.state.tender_idFlag
    })

    this.forceUpdate()
  }

  onClickTenderSt = () => {
    let arr = this.state.data.sort((a, b)=>{
      if ((a.tender_st > b.tender_st) && this.state.tender_stFlag) {
        return -1;
      }
      if ((a.tender_st < b.tender_st) && this.state.tender_stFlag) {
        return 1;
      }
      if ((a.tender_st > b.tender_st) && !this.state.tender_stFlag) {
        return 1;
      }
      if ((a.tender_st < b.tender_st) && !this.state.tender_stFlag) {
        return -1;
      }
      return 0;
    })
    
    this.setState({
      data: arr, 
      tender_stFlag: !this.state.tender_stFlag
    })

    this.forceUpdate()
  }
  
  onClickTZId = () => {
    let arr = this.state.data.sort((a, b)=>{
      if ((a.tz_id > b.tz_id) && this.state.tz_idFlag) {
        return -1;
      }
      if ((a.tz_id < b.tz_id) && this.state.tz_idFlag) {
        return 1;
      }
      if ((a.tz_id > b.tz_id) && !this.state.tz_idFlag) {
        return 1;
      }
      if ((a.tz_id < b.tz_id) && !this.state.tz_idFlag) {
        return -1;
      }
      return 0;
    })
    
    this.setState({
      data: arr, 
      tz_idFlag: !this.state.tz_idFlag
    })

    this.forceUpdate()
  }

  render() {*/

    const dispatch = useDispatch()

    const tenderList = useSelector(state => state.tenderList)
    
    
  
    useEffect(() => {dispatch(listTenders())}, [dispatch])
    const {loading, error, tenders} = tenderList

    return(
      <div>
         <table className="table main_table">
          <tr>
            <td valign="top" align="justify">
      <Filters></Filters>
</td>


<td align='justify' valign="top">
      <div className='list'>
    <table className="table main_t">
    <thead>
      <tr className="org_head">
        <th scope="col">
          <p>Номер решения</p>
          </th>
        <th scope="col">
          <p>Номер ТЗ</p>
          </th>
          <th scope="col">
          <p>Дата решения</p>
          </th>
          <th scope="col">
          <p>Проект</p>
          </th>
        <th scope="col">Группа упаковки</th>
        <th scope="col">Тип упаковки</th>
        <th scope="col">Вид упаковки</th>
        <th scope="col">Вид задания</th>
        <th scope="col">
          <p>Статус тендера</p>
          </th>
      </tr>
    </thead>
    <tbody>
      {tenders ? tenders.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/tenders/link/${item.tender_id}`} >
            {item.tender_id}
          </Link>
        </td>
        <td><Link to={`/techs/link/${item.tz_id}`} >
            {item.tz_id}
          </Link></td>
        <td>{item.date}</td>
        <td>{item.proj}</td>
        <td>{item.group}</td>
        <td>{item.type}</td>
        <td>{item.kind}</td>
        <td>{item.task}</td>
        <td>{item.selected_cp != 0 ? 'Принято' : item.tz_st == 4 ? 'Отменено' : Date.parse(item.end_date) - Date.now() > 0 ? "Ожидает решение" :  'Сбор КП'}</td>
      </tr>)}): <Message>У вас еще нет тендерных решений</Message>}
    </tbody>
  </table> 
</div>
</td>
</tr>
</table>
</div>
)
  }

  const Tenders =withRouter(Tender) 
  export default Tenders;




  /*<div className="filter">
      <form class="form-inline">




      <p>Дата решения</p>
      <div>
      <p>C</p>
  <input className="form-text-input" type="text"/>
  </div>
  <div>
  <p>По</p>
  <input className="form-text-input" type="text"/>
  </div>
<div>
  <p>Номер решения</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.tender_id}>{item.tender_id}</option>
      )})}
      </select>
</div>

<div>
      <p>Номер ТЗ</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.tz_id}>{item.tz_id}</option>
      )})}
      </select>
      </div>

      <p>Проект</p>
  <select className="form-select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {data.map((item, i)=>{
      return (
          <option value={item.proj}>{item.proj}</option>
      )})}
      </select>

  

  <p>Статус тендера</p>
  <div>
  <div>

          
      {stats.map((item, i)=>{
      return (
        <div className="form-check">
        <input className="form-check-input" type="checkbox" value={item.status}  id={i}/>
        <label className="form-check-label">
          {item}
        </label>
        </div>
        
      )})}

      </div>

  </div>

    <button type="button" className="btn btn-outline-dark" onClick={this.onClick}>Применить</button>
</form>
</div>*/