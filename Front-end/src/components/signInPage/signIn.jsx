import '../ui/sign.css';
import '../ui/homePage.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import UserModel from '../../../../Back-end/connections/user.js';
const userModel = new UserModel();
const expirationTime = 60 * 60 * 1000;

const signIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleTokenExpiration = () => {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        if(tokenExpiry && Date.now() > parseInt(tokenExpiry, 10)){
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
        }
    };

    const submitEvent = async(event) => {
        event.preventDefault();

        const user = {
            email: email,
            password: password
        }; 

        try{
            const { id, role, token } = await userModel.loginUser(user);

            if(token) {
                const tokenExpiry = Date.now() + expirationTime;
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiry', tokenExpiry.toString());
                localStorage.setItem('userId', id);
                
                setTimeout(() => {
                    handleTokenExpiration();
                }, expirationTime);

                console.log("Log in successfully");
                console.log(role);
                console.log(token);

                if(role){
                    if(role === 1 || role === 2){
                        console.log("Admin panele gidiyo.");
                        navigate('/admin');
                    } else if(role === 3){
                        console.log("User panele gidiyor.");
                        navigate('/user');
                    } else{
                        console.log("Bilinmeyen role.");
                    }
                } else{
                    console.log("Kullanıcı bilgileri alınamadı veya roletype bulunamadı.");
                }

            } else{
                alert("Giriş değerlerinizi kontrol ediniz.");
            }
        } catch (error){
            console.error("Giriş sırasında bir hata oluştu:", error.message);
            alert("Giriş sırasında bir hata oluştu. Hata: " + error.message);
        }
    };

    useEffect(() => {
        handleTokenExpiration();
    }, []);

    return (
        <>
            <nav className="navbar header">
                <div className="container-fluid">
                <Link className="navbar-brand mainPage active" style={{ color: '#b7bac1' }} to="/">
                    Ana Sayfa
                </Link>

                <div className="d-flex">
                    <Link className="btn btn-outline-light" to="/signIn">
                        Sign In
                    </Link>
                    <Link className="btn btn-outline-light" to="/signUp" style={{ marginLeft: 5 }}>
                        Sign Up
                    </Link>
                </div>
                </div>
            </nav>

            <div className='container'>
                <div className='pages'>
                    <Form className='formContainer' onSubmit={submitEvent}>
                        <Form.Group className='formGroup' controlId='formEmailId'>
                            <Form.Label className='label'>Email Address</Form.Label>
                            <Form.Control className='input' type='email' placeholder='Enter your email address.' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group className='formGroup' controlId='formPasswordId'>
                            <Form.Label className='label'>Password</Form.Label>
                            <Form.Control className='input' type='password' placeholder='Enter your password.' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group className='formGroup' controlId='formSigned'>
                            <Form.Check className='check' type='checkbox' defaultChecked={true}></Form.Check>
                            <Form.Label className='label'><span className='icon'></span> Keep me signed in</Form.Label>
                        </Form.Group>

                        <Form.Group className='formGroup' controlId='formSubmit'>
                            <Button className='button' variant='primary' type='submit'>Sign In</Button>
                        </Form.Group>

                        <div className='hr'></div>

                        <Form.Group className='foot-lnk'>
                            <p>If you don't have an account, <Link to="/signUp">Sign Up</Link></p>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default signIn