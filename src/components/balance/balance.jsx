import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './balance.css'
import React, { useState, useEffect, useContext  } from 'react';
import { database } from '../../fireBase/config';
import { AuthContext } from '../../store/Context';


function WithHeaderStyledExample() {
  const [customer, setCustomer] = useState(null);
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
            console.log(customerId , customer.Wallet);
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
  return (
    <Container className='m=3 balance'>
      <Card>
        <Card.Header as="h5">Pay balance</Card.Header>
        <Card.Body>
          <Card.Title>Current balance <span> ₹ {customer.Wallet}.00</span></Card.Title>
          <small>You can add upto ₹ 10000.0</small>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="warning">Add money to balance</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}



export default WithHeaderStyledExample;
//model