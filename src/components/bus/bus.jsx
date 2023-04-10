import { Col, Container, ProgressBar, Row, Spinner, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './bus.css'
import { database } from '../../fireBase/config';
import React, { useState, useEffect } from 'react';

function Bus() {

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
  console.log(customerIds);
  return (

    <Container className='m=2'>
    {customerIds.map((customerId) => (  
    <Card md={2} className="g-4 m=2 mb-4">
      <Card.Header as="h6">BUS BOARD - {customers[customerId].MainBoard}</Card.Header>
      <Card.Body>
        <Card.Title>{customers[customerId].SubBoard}</Card.Title>
        
        <Card.Text className='m=2 t'>
        {customers[customerId].State ? (
          <Spinner animation="grow" size="sm" className='blink' variant="success"/>
              ) : ( <Spinner animation="grow" size="sm" className='blink' variant="warning"/> )}
        {customers[customerId].State ? (
              <b><span>&nbsp;{customers[customerId].Stop[customers[customerId].Status]}</span></b>
              ) : ( <b><span> &nbsp;Preparing for Departure</span></b>)}  

        </Card.Text>

          <Card.Text className='m=2'>
            <Stack direction="horizontal">
              {customers[customerId].State && (
              <img
                className="d-block w-2 size"
                src={require('./R.png')}
                alt="First slide" />
              )} {customers[customerId].State && (  
                <h6 className='gap'>{customers[customerId].Stop[customers[customerId].Status+1] ? (customers[customerId].Stop[customers[customerId].Status+1]) : (<h6 className='gap'>Arriving to Destination</h6>)}</h6>
              )}
            </Stack>
          </Card.Text>

      </Card.Body>
    </Card>
   )
  )}

    </Container>
    
     
    // <Container className='m=2'>
    //   <Container className='m=2'>
    // <Card md={2} className="g-4 m=2'">
    //   <Card.Header as="h6">BUS BOARD</Card.Header>
    //   <Card.Body>
    //     <Card.Title>BUS SUB BOARD</Card.Title>
        
    //     <Card.Text className='m=2 t'>
    //       <Spinner animation="grow" size="sm" className='blink' variant="success"/>
    //       <span> With supporting </span>
    //     </Card.Text>

    //     <Card.Text className='m=2'>
    //       <Stack direction="horizontal">
    //         <img
    //           className="d-block w-2 size"
    //           src={require('./R.png')}
    //           alt="First slide"/>
    //           <h6 className='gap'>second stop </h6>
    //       </Stack>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
    // </Container>
    // <Container className='padding'>
    
    // <Card className=''>
    //   <Card.Header as="h6">Naduvangade</Card.Header>
    //   <Card.Body>
    //     <Card.Title>BUS SUB BOARD</Card.Title>
        
    //     <Card.Text className='m=2 t'>
    //       <Spinner animation="grow" size="sm" className='blink' variant="success"/>
    //       <span> With supporting </span>
    //     </Card.Text>

    //     <Card.Text className='m=2'>
    //       <Stack direction="horizontal">
    //         <img
    //           className="d-block w-2 size"
    //           src={require('./R.png')}
    //           alt="First slide"/>
    //           <h6 className='gap'>second stop </h6>
    //       </Stack>
    //     </Card.Text>

    //     <Card.Text className='m=2'>
    //       <Stack direction="horizontal">
    //         <img
    //           className="d-block w-2 size"
    //           src={require('./R.png')}
    //           alt="First slide"/>
    //           <h6 className='gap'>thrid stop </h6>
    //       </Stack>
    //     </Card.Text>
    //     <Card.Text className='m=1'>
    //       <Stack direction="horizontal">
    //         <img
    //           className="d-block w-2 size"
    //           src={require('./R.png')}
    //           alt="First slide"/>
    //           <h6 className='gap'>thrid stop </h6>
    //       </Stack>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
    // </Container>
    // </Container>

   
  );
}

export default Bus;

//xs={1} md={4} className="g-4"