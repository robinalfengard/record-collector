import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import {AuthContext} from '../Context/AuthProvider';
import { useAuth } from '../Context/AuthProvider';


function WelcomeUser() {
  const authContext = useAuth();
  const {auth, setAuth} = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;


  // Login is working and JWT token is being sent 
  // TODO : create logout which resets jwt token and check to see that /welcome is unavailable 


  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Welcome</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default WelcomeUser;