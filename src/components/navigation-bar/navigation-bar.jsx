import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user/user";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
        My Flix App 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
              <Nav.Link as={Link} to="/login">
              Login 
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
              Signup 
              </Nav.Link>
              </>
            )}
            {user && (
              <>
              <Nav.Link as={Link} to="/">
              Home 
              </Nav.Link>
              <Nav.Link as={Link} to="users/:Username">
              Profile 
              </Nav.Link>
              <Nav.Link onClick={() => dispatch(setUser(null))}>
                Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}