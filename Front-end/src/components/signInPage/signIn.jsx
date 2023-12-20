import React, { useState } from 'react'
import './signIn.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import UserModel from '../../../../Back-end/models/user.js';
const userModel = new UserModel();

// const expirationTime = 60 * 60 * 1000;
const expirationTime = 60 * 60;

const signIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    //Sayfa yönlendirme için kullanılıyor

    const submitEvent = async(event) => {
        event.preventDefault();

        const user = {
            email: email,
            password: password
        }; 

        try{
            const token = await userModel.loginUser(user);

            if(token) {
                const tokenExpiry = Date.now() + expirationTime;
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiry', tokenExpiry.toString());
                
                setTimeout(() => {
                    if(Date.now() > tokenExpiry){
                        localStorage.removeItem('token');
                        localStorage.removeItem('tokenExpiry');
                    }
                }, expirationTime);

                console.log("Log in successfully");

                navigate('/userPanel');
            } else{
                alert("Giriş değerlerinizi kontrol ediniz.");
            }
        } catch (error){
            console.error("Giriş sırasında bir hata oluştu:", error.message);
        }

        //Eğer bir token oluşturulursa userModel'de, localStorage'a gelen token ve son sınır zamanı giriliyor eğer zaman dolarsa localStorage temizleniyor 
        //ve kullanıcı sayfayı yenilediği anda kullanıcıyı ana sayfaya atıyor. Eğer kullanıcı girişi doğru ise kullanıcıyı userPanel linki üzerinden app.jsx'de yönlendirilen
        //userPanel.jsx sayfasına atıyor.
    };

    return (
        <>
            <div className='containerBorder'>
                <Form className='formContainer' onSubmit={submitEvent}>
                    <Form.Group className='formGroup' controlId='formEmailId'>
                        <Form.Label>Email adresi</Form.Label>
                        <Form.Control type='email' placeholder='Email adresinizi giriniz.' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group className='formGroup' controlId='formPasswordId'>
                        <Form.Label>Şifre giriniz</Form.Label>
                        <Form.Control type='password' placeholder='Şifresinizi giriniz.' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button className='formGroup' variant='primary' type='submit'>Giriş</Button>
                    </Form.Group>
                </Form>
            </div>
            {/* css kodlarından alınan className style ile div'in görüntüsü ayarlanıyor ve hazır bootstrap hazır style kodları kullanarak Form tasarımı yapılıyor. */}
            {/* type değeri submit olan butona tıklandığında Form bileşenine verilen onSubmit içindeki fonksiyon çalışıyor. */}
        </>
    )
}

export default signIn