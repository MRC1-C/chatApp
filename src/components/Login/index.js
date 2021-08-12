import React, { useState } from 'react'
import Registration from './Registration'
import LoginApp from './LoginApp'

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [isRegistration, setIsRegistration] = useState(false);
    return (
        <div>
            <Registration setLogin={{isLogin, setIsLogin, isRegistration, setIsRegistration}}/>
            <LoginApp setRegistration={{isLogin, setIsLogin, isRegistration, setIsRegistration}} />            
        </div>
    )
}
