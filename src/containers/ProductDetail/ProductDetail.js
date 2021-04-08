import React from 'react';
import FichaProducto from '../../components/FichaProducto/FichaProducto';
import {
    withRouter
} from "react-router-dom";
import axios from 'axios';

class ProductDetail extends React.Component {
    state = {
        product: {}
    }
    componentDidMount() {
        console.log('<ProductDetail> se ha montado');
        const id = this.props.match.params.id;
        axios.get('https://proyecto1ejemplo-carlos-default-rtdb.europe-west1.firebasedatabase.app/productos.json?orderBy="$key"&equalTo="' + id + '"')
            .then(response => {
                const productos = [];
                for (let key in response.data) {
                    productos.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({product: productos[0]});
            });
    }
    render() {
       
        return (
            <>
                <h1>Ficha producto</h1>
                <FichaProducto datos={this.state.product} />
            </>
        )
    }
}

export default withRouter(ProductDetail);