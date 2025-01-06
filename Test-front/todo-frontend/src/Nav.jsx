import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function ColorSchemesExample() {
  return (
    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/calenderview">CALENDER</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/taskform">ADD TASK</Nav.Link>
            <Nav.Link href="/tasklist">TASKS</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar> 
      );
      }
      export default ColorSchemesExample;