import { Container, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect, useContext  } from 'react';
import { database } from '../../fireBase/config';
import { AuthContext } from '../../store/Context';
import './ticket.css'

function ETicket() {
  
  const [customers, setCustomers] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const customersRef = database.ref('Customers');
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
    <Container className='m=5 top' >
      {customerIds.map((customerId) => (
        customers[customerId].Status === '0' || customers[customerId].id !== user.uid ? null : (
          <Card key={customerId}>
            <Card.Header> E-TICKET
              <span className="d-flex justify-content-end">
                <Spinner animation="grow" size="sm" className='blink' variant="success" />
                <small className='live'> {customers[customerId].Time} ago</small>
              </span>
            </Card.Header>
            <Card.Body>
              <Card.Title>{customers[customerId].Username}</Card.Title>
              <Card.Text>
                Status: {customers[customerId].Status}
              </Card.Text>
              <Card.Text>
                Tag: {customers[customerId].tag}
              </Card.Text>
              <Button variant="primary">Download</Button>
            </Card.Body>
          </Card>
        )
      ))}
    </Container>
  );
}

export default ETicket;
