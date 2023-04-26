import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {useRef, useState,  useEffect, useContext } from 'react';
import {AuthContext} from '../Context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const {auth, setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();


    /*    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    }; */

    /*     const handleClick=async(e)=>{
        await axios.post("http://localhost:8080/api/auth/login", user);  
    } */

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {


    },[success])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    useEffect(() => {
        if (auth.email && auth.password && auth.accessToken) {
            navigate("/welcome")
        }
    },[success])

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", JSON.stringify({email, password}),
            {
                headers : { 'Content-Type' : 'application/json'},
                withCredentials: true
            });
            // console.log(email, password, response?.data?.token);
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
       //     console.log(accessToken)
        

            const authObj = {
                email : email,
                password: password,
                accessToken: response?.data?.token
            }
            setAuth(authObj);
            setSuccess(true); 
        } catch(err){
            console.log(err)
            if(err?.response){
                setErrMsg('No server response')
            } else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password')
            }else if(err.response?.status === 402){
                setErrMsg('Unauthorized')
            } else if (err.response?.status === 200){
                setErrMsg('Welcome!')
            }
            else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }   
    }

  return (
    <>
    {success ? (
        <section>
            <h1>You are logged in!</h1>
            <br />
            <p> <a href='#'>Go to home</a></p>
        </section>
    ) : (
    <div className="d-flex justify-content-center">
   <Container>
    <p ref={errRef} className={errMsg? "errmsg" : "offScreen"} aria-live="assertive">{errMsg}</p>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter email" 
        name='email'
        ref={userRef}
        autoComplete='off'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        name='password'
        autoComplete='off'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
      </Form.Group>
      <Button variant="primary mx-2" onClick={handleSubmit}>
        Submit
      </Button>
      
    </Form>
    <br />
    <Link className='btn btn-primary mx-2' to="/register">Signup</Link>
    </Container>
    </div>
    
    )}  
     </>
  )
}

export default Login;