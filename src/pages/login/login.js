import { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

function Login() {

    const [email,setEmail] = useState('');
    const history =useHistory()
    const [password,setPassword] = useState('');
    const {firebase} = useContext(FirebaseContext)
    const handleLogin = (e)=>{
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            history.push('/')
        }).catch((error)=>{
            alert(error.message)
        })
            
        
    }

  return (
    <Form className='from' onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="accpet tream&conditions" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <a href="/signup"> create a account.</a>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;