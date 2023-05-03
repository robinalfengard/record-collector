import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {   useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const authContext = useAuth()
    const navigate = useNavigate();

    async function handleSubmit () {
        if (await authContext.login(email, password)){
            navigate('/message')
            console.log("Login succesfull")
        } else {
            console.log(email)
            console.log(password)
            
        }
    }



  return (
    <>
    <div className="d-flex justify-content-center">
   <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter email" 
        name='email'
        autoComplete='off'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
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
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
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
    
    
     </>
  )
}

export default Login;