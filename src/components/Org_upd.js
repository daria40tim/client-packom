import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Prompt, useHistory, withRouter} from 'react-router-dom';
import {listOrgDetails, listOrgDetailsUpdate} from '../actions/orgAction'
import { listSpecs } from '../actions/selectAction';
import Loader from './Loader';
import Message from './Message';

const Ord_update = ({match}) => {
  const dispatch = useDispatch()

  const orgDetails = useSelector(state => state.orgDetails)
  const {loading, error, org} = orgDetails

  useEffect(() => {
    dispatch(listOrgDetails(match.params.o_id))}, [dispatch, match])

  const specsList = useSelector(state => state.specsList)

  useEffect(() => {dispatch(listSpecs())}, [dispatch])

  const {data} = specsList
    const history = useHistory();

    const [adress, setAdress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [site, setSite] = useState("")
    const [spec, setSpec] = useState("")
    const [spec_, setSpec_] = useState("")
    const [password, setPassword] = useState('')
    const [old_password, setOldPassword] = useState('')
    const [info, setInfo] = useState("")
    const [setFile] = useState()
    const [docs, setDocs] = useState([])
    const [specs, setSpecs] = useState([])
    const [story, setStory] = useState('')
    const [finish, setFinish] = useState(true)
    
    
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    useEffect(()=>{
      let a = []
      org.specs ? org.specs.forEach(element => {
        a.push({
          active: true, 
          name: element
        })
      }) : a = [];
      setSpecs(a)
      setStory(org.history)
    }, [org.specs, org.history])

    const onClickDocs= (e) => {
      var fileInput = document.getElementById("myfileinput");

      let auth = "Bearer " + userInfo.token

      var myHeaders = new Headers();
      myHeaders.append("Authorization", auth);

      var formdata = new FormData();

      if (fileInput.files.length>0){
      formdata.append("doc", fileInput.files[0], fileInput.files[0].name);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/orgs/docs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      let d = [...docs]
      d.push(fileInput.files[0].name)
      setDocs(d)

      let s = story + '\n Добавлен документ ' + fileInput.files[0].name + '; Дата добавления: ' + new Date().toISOString().slice(0, 10) + ';'
      setStory(s)

      alert('Документ добавлен')}
      else{
        alert('Выберите файл')
      }
  }

  const onClickDelSpec = (e) => {
    if(specs[e.target.id].active){
      e.target.innerHTML = "Восстановить"
      specs[e.target.id].active = false
      let s = story + '\n Восстановлена специализация ' + specs[e.target.id].name + ';'
      setStory(s)
    } else {
      e.target.innerHTML = "Удалить"
      specs[e.target.id].active = true
      let s = story + '\n Удалена специализация ' + specs[e.target.id].name + ';'
      setStory(s)
    }
  }

  const onClickAddSpec = (e) => {
    let a = [...specs]
    if (specs.filter( val => val.name === spec).length>0 || specs.filter( val => val.name === spec_).length>0){
      alert('Такая специализация уже присвоена организации') 
      return
    }
    if (spec===''&&spec_===''){
      alert('Поле специализации не заполнено') 
      return
    }
    spec_!==''? 
    a.push({
      active: true, 
      name: spec_
    }) :
    a.push({
      active: true, 
      name: spec
    })

    if (spec_ !== ''){
      let s = story + '\n Добавлена специализация ' + spec_ + '; Дата добавления: ' + new Date().toISOString().slice(0, 10) + ';'
      setStory(s)
    }
    else {
      let s = story + '\n Добавлена специализация ' + spec + '; Дата добавления: ' + new Date().toISOString().slice(0, 10) + ';'
      setStory(s)
    }
    setSpecs(a)
  }

  const onClickCancel = ()=>{
    history.push(`/orgs/`)
  }

    const onClickSave= () => {
      if (password !== old_password){
        alert('Пароли не совпадают')
        return
      }
      let hi = ''
        let adress_ = ''
        if (adress !== ''){ 
            adress_ = adress
            hi = hi + " \n Изменен адрес: " + adress_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            adress_ = org.adress
        }
        let password_ = ''
        if (password !== ''){ 
            password_ = password
            hi = hi + " \n Изменен пароль. Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            password_ = ""
        }
        let phone_ = ''
        if (phone !== ''){ 
            phone_ = phone
            hi = hi + " \n Изменен телефон: " + phone_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            phone_ = org.phone
        }
        let email_ = ''
        if (email !== ''){ 
            email_ = email
            hi = hi + " \n Изменен адрес электронной почты: " + email_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            email_ = org.email
        }
        let site_ = ''
        if (site !== ''){ 
            site_ = site
            hi = hi + " \n Изменен сайт: " + site_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            site_ = org.site
        }
        /*let spec_ = ''
        if (spec !== ''){ 
            spec_ = spec
            hi = hi + " \n Изменена специализация: " + spec_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            spec_ = org.spec
        }*/
        let info_ = ''
        if (info !== ''){ 
            info_ = info
            hi = hi + " \n Изменена общая информация: " + info_ + " Дата: " + new Date().toISOString().slice(0, 10)
        }else {
            info_ = org.info
        }
        console.log(hi)
        hi = hi+" "+org.history
        dispatch(listOrgDetailsUpdate(adress_, phone_, email_, site_, specs, password_, info_, hi))
        setFinish(false)
        history.push(`/orgs/`)
     }

  //render() {
    return(
        <div className='one_item'>
        <Prompt
      when={finish}
      message='Все несохраненные изменения удалятся. Вы уверены, что хотите покинуть страницу?'
    />
          {loading ? <Loader/>: error ? <Message variant="danger">{error}</Message> :
          <div>
        <h3>Общие данные</h3>
        <div>
        <table className="table w-50 one_item" >
          <thead>
          </thead>
          <tbody>
          <tr>
              <td colSpan='2'><h5>{org.name}</h5></td>
            </tr>
            <tr>
              <td colSpan='2'>Общие данные</td>
            </tr>
            <tr>
              <td>Название</td>
              <td>{org.name}</td>
            </tr>
            <tr>
              <td>Группа</td>
              <td>{org.group}</td>
            </tr>
            <tr>
              <td>Страна</td>
              <td>{org.country}</td>
            </tr>
            <tr>
              <td>Логин</td>
              <td>{org.login}</td>
            </tr>
            <tr>
              <td>Адрес</td>
              <td>
                  <input className='cr_input' value={adress} name='adress' onChange={(e)=>setAdress(e.target.value)} placeholder={org.adress}></input>
                  </td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>
              <input className='cr_input' name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={org.phone}></input>
                  </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
              <input className='cr_input' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder={org.email}></input>
                  </td>
            </tr>
            <tr>
              <td>Сайт</td>
              <td>
              <input className='cr_input' value={site} name='site' onChange={(e)=>setSite(e.target.value)} placeholder={org.site}></input>
                  </td>
            </tr>
            {userInfo.group_id ==="2" || userInfo.group_id ==="3" ? <tr>
              <td>Специализация</td>
              <td>
              {specs ? specs.map((item, i) => {return(
              <div>
                <label>{item.name}</label>
                <button type="button" className="btn btn-outline-dark m-1" onClick={onClickDelSpec} id={i}>Удалить</button>
              </div>
              )}): ''}
              <label>Выберите из списка</label>
                {data.specs ? 
              <select className="form-select cr_input" name="dir" id="selector" value={spec} onChange={(e)=>{setSpec(e.target.value) 
              setSpec_('')}} placeholder='Не выбрано'>
                <option value='' selected disabled>Список</option>
                {data.specs.map((item, i) => { return(
                <option value={item}>{item}</option>
                )})}
                </select> : <label>Список пуст</label>}
                <label>Или введите собственное значение</label>
              <input className='cr_input' value={spec_} onChange={(e)=>{setSpec_(e.target.value) 
                setSpec('')}}></input>
              <button type="button" className="btn btn-outline-dark m-1" onClick={onClickAddSpec}>Добавить</button>
              </td>
            </tr>:<p></p>}
            <tr>
              <td>Новый пароль</td>
              <td>
              <input type='password' className='cr_input' value={password} name='password' onChange={(e)=>setPassword(e.target.value)}></input>
              </td>
            </tr>
            <tr>
              <td>Подтвердите пароль</td>
              <td>
              <input type='password' className='cr_input' value={old_password} name='password' onChange={(e)=>setOldPassword(e.target.value)}></input>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
          <h5 id="name" className="text-start">Документация</h5>
          {org.docs ? org.docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start"></p>}
         {docs ? docs.map((item, i)=>{
        return (
          <p className="text-start">{item}</p>
       )}) : <p className="text-start">Документов нет</p>}
           <input type="file" className="form-control-file" id="myfileinput" onChange={(e)=>setFile(e.target.files[0])}/>
           <button type="button" className="btn btn-outline-dark m-5" onClick={onClickDocs}>Добавить</button>

          <h5 className="text-start">О компании</h5>
          <div>
          <textarea wrap='soft' className='cr_input' value={info} name='info' onChange={(e)=>setInfo(e.target.value)} placeholder={org.info}></textarea>  
          </div> 
</div>
}
<button type="button" className="btn btn-outline-dark m-5" onClick={onClickSave}>Сохранить изменения</button>
<button type="button" className="btn btn-outline-dark m-5" onClick={onClickCancel}>Отменить</button>
</div>
)
  }
//}

const Org_upd = withRouter(Ord_update) 
export default Org_upd;