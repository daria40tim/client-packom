import React, {useState } from 'react';
import '../styles/login.css'
import {login} from '../actions/userAction'
import {useDispatch, useSelector} from 'react-redux'
import Message from './Message';
import Loader from './Loader';
import { useHistory } from 'react-router';


const SignIn = () =>  {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error} = userLogin

    const submitHandler = () => {
        if (email ==='admin' && password === '35WWzvyj6a0F8VK' ){
            localStorage.setItem("admin", true)
            history.push(`/packom/`)
            return
        }
        else {
            localStorage.setItem("admin", false)
        }

        dispatch(login(email, password))
        history.push(`/orgs/`)
        }

    
    return( 
        <div>
        <form onSubmit={submitHandler} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Войдите в систему</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}

        <label className="sr-only">Логин</label>
        <input className="form-control" placeholder="Логин" onChange={(e)=>setEmail(e.target.value)}/>
        <label className="sr-only">Пароль</label>
        <input type="password" className="form-control" placeholder="Пароль" onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={submitHandler}>
            Войти
            </button>
        <p className="mt-5 mb-3 text-muted">Для получения логина и пароля обратитесь на почтовый ящик mail4reserve@gmail.com</p>
      </form>
      </div>)
  }

export default SignIn;
