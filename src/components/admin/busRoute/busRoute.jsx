import { Col, Container, ProgressBar, Row, Spinner, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './busRoute.css'
import { database } from '../../../fireBase/config';
import React, { useState, useEffect } from 'react';

function BusRoute() {

  const [customers, setCustomers] = useState(null);
  useEffect(() => {
    const customersRef = database.ref('busses');
    customersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setCustomers(data);
    });
  }, []);

  if (!customers) {
    return <Spinner animation="grow" />;
  }

  const customerIds = Object.keys(customers);

  return (

    <Container className='container ' >
    {customerIds.map((customerId) => (
        customers[customerId].Status === '0' || customers[customerId].id === 0 ? null : (  
    <Card md={2} className="g-4 mt-1 mb-3">
      <Card.Header as="h6">BUS BOARD - {customers[customerId].MainBoard}</Card.Header>
      <Card.Body>
        <Card.Title>{customers[customerId].SubBoard}</Card.Title>
        
        <Card.Text className='mt-1 t'>
          <Spinner animation="grow" size="sm" className='blink' variant="success"/>
          <span> With supporting </span>
        </Card.Text>

        <Card.Text className='mt-1'>
          <Stack direction="horizontal">
            <img
              className="d-block w-2 size"
              src={require('./R.png')}
              alt="First slide"/>
              <h6 className='gap'>second stop </h6>
          </Stack>
        </Card.Text>
        <Button href={`/journey?key=${customerId}`}>START JOURNEY</Button>
        <Button>DELETE</Button>
        
      </Card.Body>
    </Card>
   )
  ))}

    </Container>
  );
}

export default BusRoute;
