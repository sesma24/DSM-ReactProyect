import React from 'react';
import clases from './Header.module.css'
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    logoutUser = () => {
        this.setState({ auth: false });
        this.setState({ authData: {} });
        localStorage.removeItem('token');
        window.location.reload(false);
      }

    render() {
     


        let botonesLogin = (<div className="CabeceraBoton"><Link to={{ pathname: '/login' }}><Button variant="outline-info">Log in</Button></Link>---<Link to={{ pathname: '/register' }}><Button variant="outline-warning">Registrarme</Button></Link></div>);

        if(this.props.auth){
            botonesLogin = (<div className="CabeceraBoton"><Button onClick={() => this.logoutUser()} variant="outline-info">Log out</Button></div>);
        }
        return (
            
        <div className={clases.App}>
            
            <Row>
                <div className={clases.Cabecera}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/proyecto1ejemplo-carlos.appspot.com/o/cabecera.png?alt=media&token=4f6ac8c2-145f-49ae-8ee7-f42082188609" alt="La mejor tienda del mundo"></img>
                </div>
            </Row>
            <Row>
                <Col>
                    <p>Esta tienda ofrece diferentes opciones muu interesantes</p>
                </Col>
                <Col>
                    {botonesLogin}
                </Col>              
            </Row>
        </div>
        )
    }
}

export default Header;

