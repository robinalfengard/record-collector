import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import {AuthContext} from '../Context/AuthProvider';


function WelcomeUser() {

  const {auth, setAuth} = useContext(AuthContext);

  if (!auth.accessToken) {
    return
  }

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