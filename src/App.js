//import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { isAuthReady, user } = useAuthContext()
  return (
    <div className="App">

      {isAuthReady && (
      <BrowserRouter>

        <Navbar/>

        <Switch>
          <Route exact path='/'>
            {user && <Home />}
            {!user && <Redirect to={"/login"} />}
          </Route>
        </Switch>
        
        <Switch>
          <Route exact path='/login'>
            {!user && <Login />}
            {user && <Redirect to={"/"} />}
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/signup'>
            {!user && <Signup />}
            {user && <Redirect to={"/"} />}
          </Route>
        </Switch>
      
      </BrowserRouter>
      )}

    </div>
  );
}

export default App
