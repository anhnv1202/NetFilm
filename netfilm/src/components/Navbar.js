import React from "react";
import { Navbar, Nav, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
  
 Navbar = () => {
    const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Phim Hay</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Trang chủ</Nav.Link>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Đăng nhập</Nav.Link>
          <Nav.Link eventKey={2} href="#memes" onClick={() => navigate('/register')}>
            Đăng kí
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Navbar;
