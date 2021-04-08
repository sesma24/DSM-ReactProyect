import React from 'react';
import clases from './Product.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, ButtonGroup } from 'react-bootstrap';



//import { ContextoAutenticado } from '../../../containers/Listado/Listado';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.elementoInput = React.createRef();
        //this.state = { elementoInput: React.createRef() };
    }
    componentDidMount() {
        console.log('<Product> se ha montado');
    }
    componentWillUnmount() {
        console.log('<Product> se va a desmontar');
    }
    render() {
        console.log("bbbb"+this.props.cantidad);
        const enlace = '/products/' + this.props.id;
        let enlacesAdmin = (
            <>
                <Link to={enlace}>Ver detalles</Link>
            </>
        );
        if (this.props.auth) {
            enlacesAdmin = (
                <>
              
                    <ButtonGroup>
                        <Button variant="success" onClick={this.props.quitarProducto}>-</Button>
                        <Button variant="dark" disabled >{this.props.cantidad}</Button>
                        <Button variant="success" onClick={this.props.añadirProducto}>+</Button>
                    </ButtonGroup>
                    
                    <Card.Text>
                    <Link to={enlace}>Ver detalles</Link>
                    </Card.Text>
                </>
            )
        }
        return (
            
            <div className={clases.Product}>
            <Card className={clases.CardProducto}>
                <Card.Img className={clases.CardImg} src={this.props.imagen} />
                <Card.Body>
                    <Card.Title> 
                            {this.props.nombre}
                    </Card.Title>
                    <Card.Text>
                            {this.props.precio}€
                    </Card.Text>
                    {enlacesAdmin}
                </Card.Body>
            </Card>
        </div>
        )
    }
}

Product.propTypes = {
    nombre: PropTypes.string,
    precio: PropTypes.number,
    añadirProducto: PropTypes.func,
    quitarProducto: PropTypes.func
}

export default Product;