import React, {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {listOrg, sortOrgsByCountry, sortOrgsByGroup, sortOrgsByName, sortOrgsBySpec} from '../actions/orgAction'
import Link from 'react-router-dom/Link';
import Loader from './Loader';
import Message from './Message';
import Accordion from 'react-bootstrap/Accordion'
import Filters from './Filters';
let specs = ['Уп. материалы', 'Металлоконтейнеры']

const Orgs = () => {
  const dispatch = useDispatch()

  const orgList = useSelector(state => state.orgList)
  
  useEffect(() => {dispatch(listOrg())}, [dispatch])
  const {loading, error, orgs} = orgList
  const [nameFlag, setNameFlag] = useState(true)
  const [countryFlag, setCountryFlag] = useState(true)
  const [specFlag, setSpecFlag] = useState(true)
  const [groupFlag, setGroupFlag] = useState(true)


  let onClickName = () => {
    dispatch(sortOrgsByName(orgs, nameFlag))
    setNameFlag(!nameFlag)
  }

  let onClickCountry = () => {
    dispatch(sortOrgsByCountry(orgs, countryFlag))
    setCountryFlag(!countryFlag)
  }

  let onClickSpec = () => {
    dispatch(sortOrgsBySpec(orgs, specFlag))
    setSpecFlag(!specFlag)
  }
  
  let onClickGroup = () => {
    dispatch(sortOrgsByGroup(orgs, groupFlag))
    setGroupFlag(!groupFlag)
  }

  const onClick = (e) => {
    console.log(1)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //render() {

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
    <table className="table main_t">
    <thead>
      <tr className="org_head">
        <th scope="col">
          <label>Наименование</label>
          <button onClick={onClickName} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={nameFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">
          <label>Группа</label>
          <button onClick={onClickGroup} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={groupFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Специализация</label>
          <button onClick={onClickSpec} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={specFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
          <th scope="col">
          <label>Страна</label>
          <button onClick={onClickCountry} type="button" className="btn sort_btn"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d={countryFlag ? "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" :"M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"}/>
</svg></button>
          </th>
        <th scope="col">Сайт</th>
        <th scope="col">Телефон</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
   <tbody>
   {orgs.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/orgs/link/${item.o_id}`} >
            {item.name}
          </Link>
        </td>
        <td>{item.group}</td>
        <td>{item.spec}</td>
        <td>{item.country}</td>
        <td>{item.site}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
      </tr>)})}
    </tbody>
  </table> 
</div>
</td>
</tr>
</table>
}
</div>

)
  }
//}

export default Orgs;

/*let data3 = [
      {"o_id": "0", 
        "name": "ЗАО МИФ Мебель", 
        "group": "Поставщик", 
        "spec": "Металлоконтейнеры", 
        "country": "Россия", 
        "site": "info.ru", 
        "phone": "+7(495)545-42-59", 
        "email": "sales@mif-mebel.ru",
        "adress": "г. Москва ул. Автозаводская 23, стр. 82",
        "info":`С 2008 года нами было полностью освоено производство многооборотной металической тары для транспортировки кузовных элементов автомобилей и их различных узлов. По настоящее время мы выпустили более двадцати тысяч единиц подобной тары.
        Наша тара может оснащаться различными пластиковыми и деревянными элементами, обработанными с помощью 3D-технологий, а также тканевыми вставками. Специально для Вас мы предлагаем спектр услуг: порошковая окраска металлоконструкций (широкая цветовая гамма), гибка круглых и профильных труб, гибка листового металла, резка, холодная штамповка изделий из металла, 3D-фрезеровка, пошив чехлов и тентов и многое другое. Применение новейших технологий и современного оборудования позволило нам добиться высокого качества продукции."
        `
      }, 
      {"o_id": "1", 
        "name": `ООО "ПК" ТИСО"`, 
        "group": "Поставщик", 
        "spec": "Металлоконтейнеры", 
        "country": "Россия", 
        "site": "https://pk-tiso.ru/", 
        "phone": "+7(812) 336-90-95",
        "adress": "194044 г. Санкт-Петербург, ул. Боткинская 15, корп. 1", 
        "email": "info@pk-tiso.ru"
      }, 
      {"o_id": "2", 
        "name": `Та-Пласт`, 
        "group": "Поставщик", 
        "spec": "Уп.материалы", 
        "country": "Россия", 
        "site": "", 
        "phone": "7 982 422 22 60", 
        "adress": "Казань", 
        "email": "utkuzov.a@gmail.com"
      }, 
      
      ]
      
      {orgs.map((item, i)=>{
        return (
      <tr>
        <td>
          <Link to={`/orgs/link/${item.o_id}`} >
            {item.name}
          </Link>
        </td>
        <td>{item.group}</td>
        <td>{item.spec}</td>
        <td>{item.country}</td>
        <td>{item.site}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
      </tr>)})}
      
      
       {orgs.map((item, i)=>{
      return (
          <option value={item.name}>{item.name}</option>
      )})}
      
      
       <div className="filter">
      <form>

 

  <p>Группа</p>
  <div>
    <div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value='Поставщик'/>
      <label className="form-check-label" for="gridRadios1">
        Поставщик
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value='Клиент' />
      <label className="form-check-label" for="gridRadios2">
        Клиент
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value='Клиент, поставщик' />
      <label className="form-check-label" for="gridRadios3">
        Клиент, поставщик
      </label>
    </div>
  </div>
  </div>
  
  <p>Страна</p>
  <div>
  <select className="form-select" id="country_select">
          <option>Россия</option>
      </select>
  </div>

  <label>Специализация</label>
  <div>
  <div>

          
      {specs.map((item, i)=>{
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
  <div>
 <p>Название</p>
  <select className="form-select" id="name_select">
          <option disabled>Выберите название</option>
          <option selected value="">Не выбрано</option>
          {orgs.map((item, i)=>{
      return (
          <option value={item.name}>{item.name}</option>
      )})}  
      </select>
      </div>
    <button type="button" className="btn btn-outline-dark" onClick={onClick}>Применить</button>
</form>
</div>*/
