import React from 'react'
import Banner from '../../components/Banner/Banner';
import Bus from '../../components/bus/bus';
import NavB from '../../components/NavBar/navBar';


function HomePage() {
  return (
    <div>
      <NavB/>
      <Banner/>
      <Bus/>
    </div>
  )
}

export default HomePage;
