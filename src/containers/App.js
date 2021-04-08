import React from 'react';
import clases from './App.module.css';
import Listado from './Listado/Listado';
import Header from '../components/Header/Header';
import Confirmacion from '../components/Confirmacion/Confirmacion';
import Pedido from '../components/Pedido/Pedido';
import Contact from '../containers/Contact/Contact';
import ProductDetail from '../containers/ProductDetail/ProductDetail';
import TodosPedidos from '../components/TodosPedidos/TodosPedidos'
import Login from '../containers/Login/Login';
import Register from '../containers/Register/Register';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
//import { Row, Col, Button } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        carrito: [],
        total: 0,
        auth: false,
        authData: {}
    };
}



  setAuthentication = (auth, data) => {
    this.setState({ auth: auth });
    this.setState({ authData: data });
  }

  actualizarInfoGeneral = (carrito, total) => {
    this.setState({ carrito: carrito });
    this.setState({ total: total });
  }

  componentDidMount() {
    console.log('<App> se ha montado');
  }
  componentWillUnmount() {
    console.log('<App> se va a desmontar');
  }


  render() {

    return (
      <div className={clases.App}>
        <Router>
        <Header titulo="El título que queramos" logoutUser={this.logoutUser} auth={this.state.auth} email={this.state.authData.email} />
        <div>
                    <nav>
                    <ul>
                        <li>
                            <div className="CabeceraBoton">
                                <Link to="/products">Productos de la tienda</Link>
                            </div>
                        </li>
                        <li>
                            <div className="CabeceraBoton">
                                <Link to="/contact">Contacto</Link>
                            </div>
                        </li>
                        <li>
                            <div className="CabeceraBoton">
                                <Link to="/todospedidos">Todos los pedidos</Link>
                            </div>
                        </li>
                        
                    </ul>
                    </nav>
    
                    <Switch>
                    <Route 
                    path="/pedido" 
                    render={(props) => <Pedido {...props} total={this.state.total} carrito={this.state.carrito} authData={this.state.authData} actualizarInfoGeneral={this.actualizarInfoGeneral}></Pedido>}>
                    </Route>
                    <Route 
                    path="/todospedidos" 
                    render={(props) => <TodosPedidos {...props} idToken={this.state.authData.idToken} ></TodosPedidos>}>
                    </Route>
                    <Route path="/products/:id" render={(props) => <ProductDetail {...props}  />} />
                    <Route path="/products" render={(props) => <Listado {...props} auth={this.state.auth} total={this.state.total} carrito={this.state.carrito} authData={this.state.authData} actualizarInfoGeneral={this.actualizarInfoGeneral}/>} />
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route 
                    path="/confirmacion" 
                    render={(props) => <Confirmacion {...props} total={this.state.total} carrito={this.state.carrito} actualizarInfoGeneral={this.actualizarInfoGeneral} idToken={this.state.authData.idToken}></Confirmacion>}>
                    </Route>                 
                    <Route path="/login" render={(props) => <Login {...props} setAuthentication={this.setAuthentication} />} />
                    <Route path="/register" render={(props) => <Register {...props} setAuthentication={this.setAuthentication} />} />
                      
                    <Route 
                    path="/"
                    render={(props) => <Listado {...props} auth={this.state.auth} total={this.state.total} carrito={this.state.carrito} authData={this.state.authData} actualizarInfoGeneral={this.actualizarInfoGeneral}></Listado>}>
                    </Route>
                    </Switch>
                </div>
            

        </Router>
      </div>
      
    )
  }

}

export default App;
