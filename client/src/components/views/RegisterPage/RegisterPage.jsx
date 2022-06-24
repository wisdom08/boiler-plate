import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../../_actions/user_action";

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }

    const onsubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        const body = {email, name, password};

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) navigate("/login");
                else alert('Failed to sign up');
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

                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler}/>


                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} autoComplete="on"/>

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} autoComplete="on"/>

                <br/>

                <button>
                    회원 가입
                </button>
            </form>
        </div>
    )
};

export default RegisterPage;