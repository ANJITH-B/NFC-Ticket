import React,{useEffect,useContext} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import HomePage from './pages/home/home_ page';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/login';
import { AuthContext, FirebaseContext } from './store/Context';
import Account from './pages/account/account';
import Ticket from './pages/ticket/ticket';
import Admin from './pages/admin/adminHome/admin';

import Fom from './pages/admin/admin/from';



function App() {
  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })

  })
  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route path='/admin'>
          <Admin/>
        </Route>
        <Route exact path='/from'>
          <Fom/>
        </Route>
        <Route path='/SignUp'>
          <SignUp/>
        </Route>
        <Route path='/Login'>
          <Login/>
        </Route>
        <Route path='/account'>
          <Account/>
        </Route>
        <Route path='/ticket'>
          <Ticket/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
