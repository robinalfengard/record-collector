import Nav from 'react-bootstrap/Nav';
import './navbar.css'

function Navbar() {
    return (
      <>
     
      <div className='navbar'>
      <Nav className="justify-content-center" activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
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