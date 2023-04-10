import { Container, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect, useContext  } from 'react';
import { database } from '../../fireBase/config';
import { AuthContext } from '../../store/Context';
import './ticket.css'

function ETicket() {
  
  const [customers, setCustomer] = useState(null);
  const { user } = useContext(AuthContext);
  const [id, setId] = useState(null);

  useEffect(() => {
      if (user) {
        console.log(user.uid);
        const customersRef = database.ref('Customers');
        customersRef.orderByChild('id').equalTo(user.uid).once('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const customerId = Object.keys(data)[0];
            const customer = data[customerId];
            console.log(customerId , customer);
            setCustomer(customer);
            setId(customerId)
          } else {
            setCustomer(null);
          }
        });
    
      customersRef.orderByChild('id').equalTo(user.uid).on('child_changed', (snapshot) => {
        const customerId = snapshot.key;
        const customer = snapshot.val();
        setCustomer(customer);
        setId(customerId);
      });
    }
  }, [user]);
  

  if (!customers) {
    return <Spinner animation="grow" />;
  }

const customersRef = database.ref('Customers');

if (customers.Status === '0' && customers.Point !== 0) {
  const fare = (customers.Point - 1) * 4 + 8;
  const bal = customers.Wallet - fare
  customersRef.child(id).update({
    Fare: fare,
    Point: 0,
    Wallet: bal
  });
}else if(customers.Status === '0'){
  return (
    <Container className='m=5 top' >
          <Card key={customers.id}>
            <Card.Header> E-TICKET
            </Card.Header>
            <Card.Body>
              <Card.Title>OOPS ! No Tickets...</Card.Title>
              <Card.Text>
                When you start a new journey , your  tickets will be displayed here.
              </Card.Text>
            </Card.Body>
          </Card>
    </Container>
  );
 
}else{
    console.log('dsfgaaaaaaaaaa')
  return (
    <Container className='m=5 top' >
          <Card key={customers.id}>
            <Card.Header> E-TICKET
              <span className="d-flex justify-content-end">
                <Spinner animation="grow" size="sm" className='blink' variant="success" />
                <small className='live'> {customers.Time} ago</small>
              </span>
            </Card.Header>
            <Card.Body>
              <Card.Title>{customers.Username}</Card.Title>
              <Card.Text>
                Status: {customers.Status}
              </Card.Text>
              <Card.Text>
                Tag: {customers.tag}
              </Card.Text>
              <Button variant="primary">Download</Button>
            </Card.Body>
          </Card>
    </Container>
  );
}
// })
}
export default ETicket;
