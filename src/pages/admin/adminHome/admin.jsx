import React from 'react'
import Addbtn from '../../../components/admin/addBtn/addBtn'
import Navb from '../../../components/admin/adminNavBar/adminNavBar'
import BusRoute from '../../../components/admin/busRoute/busRoute'

function Admin() {
  return (
    <div>
      <Navb/>
      <BusRoute/>
      <Addbtn/>
    </div>
  )
}

export default Admin
