// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Form } from './components/Form';
import { Home } from './components/Home';
import { Update } from './components/Update';
import { Register } from './components/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' exact element={ <Register/> } />
      <Route path='/signin' exact element={ <Login/> } />
      <Route path='/home' exact element={ <Home/> } />
      <Route path='/form' exact element={ <Form/> } />
      <Route path='/update' exact element={ <Update/> } />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
