import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../../../_actions/user_action";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onsubmitHandler = (e) => {
        e.preventDefault();
        const body = {email, password};

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) navigate("/");
                else alert('Error');
            })
        ;
    }

    return (
        <div style={{
            display: 'flex', justifyContent:'center', alignItems: 'center',
            width:'100%', height:'100vh'
        }}>
            <form onSubmit={onsubmitHandler}
                style={{ display: 'flex', flexDirection:'column'}}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}/>

                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} autoComplete="on"/>

                <br/>

                <button>
                    Login
                </button>
            </form>
        </div>
    )
};

export default LoginPage;