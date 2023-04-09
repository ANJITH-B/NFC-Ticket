import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import firebase from 'firebase/app';
import { database } from '../../../fireBase/config';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './from.css'
import { useLocation } from 'react-router-dom';

const  Jour = () => {
  const [customers, setCustomers] = useState(null);
  const [params , setParams] = useState('')
  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const value = query.get('key')
    setParams(value)

    const customersRef = database.ref('busses');
    customersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setCustomers(data);
    });
  }, []);

  if (!customers) {
    return <Spinner animation="grow" />;
  }
const nextStop = () => {
  const database = firebase.database();
  const bussesRef = database.ref('busses');

  const newStopIndex = customers[params].Stop.indexOf(customers[params].Status) + 1;
  const newStop = customers[params].Stop[newStopIndex];

  bussesRef.child(params).update({
    Status: newStop
  });
};
  const customerIds = Object.keys(customers);
  return (
    <div className='pi'>
          {customerIds.map((customerId) => (customerId !== params ? null : (  
     <Form >
       <Form.Group as={Row} className="mb-3">
         <Col sm={10}>
          <p>Main Board: <strong>{customers[customerId].MainBoard}</strong></p>
          <p>Sub Board: <b>{customers[customerId].SubBoard}</b></p>
         </Col>
       </Form.Group>
    

    
       {customers[customerId].Stop.map((stop, index) => (
         <Form.Group key={index} as={Row} className="mb-3" controlId={`stop${index}`}>
           <Form.Label column sm={2}>
             {index === 0 ? 'Bus Route' : ''}
           </Form.Label>
           <Form.Label column sm={6}>
             {stop}
           </Form.Label>

         </Form.Group>
       ))}
       <Form.Label column sm={6}>
             {'Current Stop : '}
             <b>{customers[customerId].Status}</b>
           </Form.Label>
       <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">  
         <Col sm={{ span: 10, offset: 2 }}> 
           <Button type="button" onClick={nextStop}>&gt;&gt;</Button> &nbsp;Forward to next stop . . .
         </Col>
       </Form.Group>

     </Form>
        )
        ))}

     </div>
     
  );
};

export default Jour;