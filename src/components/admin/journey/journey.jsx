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
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const  Jour = () => {
  const [customers, setCustomers] = useState(null);
  const [params , setParams] = useState('')
  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const value = query.get('key')
    setParams(value)

    const customersRef = database.ref('busses');
    customersRef.child(value).update({
      State: true
    });
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
  const customerRef = database.ref('Customers');

  // const newStopIndex = customers[params].Stop.indexOf(customers[params].Status) + 1;

  let newStop = 0;
  if(customers[params].Stop.length-1 === customers[params].Status){
    console.log('stpop');
    confirmAlert({
      title: 'End Journey',
      message: 'Are you sure to Stop Journey?',
      buttons: [
          {
              label: 'Yes',
              onClick: () =>{
                bussesRef.child(params).update({
                  State: false ,
                  Status : 0
                });
                customerRef.orderByChild('Status').equalTo('1').once('value', function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    childSnapshot.ref.update({
                      Point : 0
                    });
                  });
                });
                window.location.href = '/admin'
              } 
          },
          {
              label: 'No'
          }
  ]
})
  }else{
    customerRef.orderByChild('Status').equalTo('1').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const currentValue = childSnapshot.val().Point;
        const fare = currentValue * 4 + 8;
        childSnapshot.ref.update({
          Point : currentValue + 1,
          Fare : fare
        });
      });
    });
    newStop = customers[params].Status + 1
    console.log(newStop);
    bussesRef.child(params).update({
      Status: newStop
    });
  }
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
             <b>{customers[customerId].Stop[customers[customerId].Status]}</b>
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