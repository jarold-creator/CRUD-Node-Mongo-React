import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './paginas/autenticacion/Login';
import Registro from './paginas/autenticacion/Registro';
import Home from './paginas/Home';
import MostrarClientes from './paginas/Modulos/MostrarClientes';
import AgregarCliente from './paginas/Modulos/AgregarClientes';
import EditarCliente from './paginas/Modulos/EditarCliente';
import MostrarProductos from './paginas/Modulos/MostrarProductos';
import AgregarProducto from './paginas/Modulos/AgregarProductos';
import EditarProducto from './paginas/Modulos/EditarProductos';


function App() {
  return (
    <div className='App'>
      <Fragment>
        <Router>
          <Routes>
            <Route path='/' exact element = { <Login /> }/>
            <Route path='/registro' exact element = { <Registro /> }/>
            <Route path='/home' exact element = { <Home /> }/> 
            <Route path='/clientes' exact element = { <MostrarClientes /> } />      
            <Route path='/clientes/agregar/' exact element = { <AgregarCliente /> } />    
            <Route path='/clientes/editar/:id' exact element = { <EditarCliente /> } />
            <Route path='/productos' exact element = { <MostrarProductos /> } /> 
            <Route path='/productos/agregar/' exact element = { <AgregarProducto /> } />  
            <Route path='/productos/editar/:id' exact element = { <EditarProducto /> } />       
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
