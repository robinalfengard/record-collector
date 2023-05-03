import Nav from 'react-bootstrap/Nav';
import './navbar.css'
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const navigate = useNavigate()


  function logout() {


    authContext.logout();
    console.log("Logout succesfull")
    navigate("/login")
    
    
  }
    return (
      <>
     
      <div className='navbar'>
      <Nav className="justify-content-center" activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={logout}>Logout</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
      <br />
      <br />
    </Nav>
    </div>
    </>

      );
    } export default Navbar;