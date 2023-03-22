import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import data from '../data/user.json';
import '../style/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = data.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Logged in as:', user.fullname);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      document.write('Logged in as:', user.fullname)
    } else {
      console.log('Invalid email or password');
    }
  };
  

  return (
    <Card className="login-card mx-auto">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
          </Form.Group>

          <div className="text-right">
            <Button variant="primary" type="submit" className="ml-2">Submit</Button>
            <span variant="link" className='forgot'>Forgot password?</span>
          </div>
        </Form>
      </Card.Body>

      <Card.Footer>
        <div className="text-center">
          <p>Don't have an account? <span>Register</span></p>
        </div>
      </Card.Footer>
    </Card>

  );
}

export default Login;
