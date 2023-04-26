import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterUser() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const {firstName, lastName, email, password} = user

    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    };

    const handleClick=async(e)=>{
        await axios.post("http://localhost:8080/api/auth/register", user)
        e.preventDefault();
        
    }

return ( 
    <Container>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter First Name" 
        name='firstName'
        value={firstName}
        onChange={(e)=>onInputChange(e)}
          />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Last Name" 
        name='lastName'
        value={lastName}
        onChange={(e)=>onInputChange(e)}
          />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Password" 
        name='password'  
        value={password}
        onChange={(e)=>onInputChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Email" 
        name='email'
        value={email}
        onChange={(e)=>onInputChange(e)}  
        />
      </Form.Group>
      <Button variant="primary mx-2" type="submit" onClick={handleClick}>
        Submit
      </Button>
      <Link className='btn btn-primary mx-2' to="/login">To login</Link>
    </Form>
    <br />
   
    </Container>
 

  );
}

export default RegisterUser;