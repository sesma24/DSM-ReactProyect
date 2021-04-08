import React from 'react';
import './TodosPedidos.css';
import Pedidos from './Pedidos/Pedidos'
import axios from 'axios';



class TodosPedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      error: false,
    }
  }

  componentWillUnmount() {
    console.log('<TodosPedidos> se va a desmontar');
  }

  componentDidMount() {
   
    axios.get('https://proyecto1ejemplo-carlos-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json')
      .then(response => {
        let pedidos = [];
        
        for (let id in response.data) {
          pedidos.push({
            ...response.data[id],
            key: id
          });
          
        }
       
        this.setState({ pedidos: pedidos });
        
    
      }).catch(error => {
        this.setState({ error: true });
      });
  }


  eliminarPedido = (id) => {
    console.log("TOKEN",this.props.idToken)
    axios.delete('https://proyecto1ejemplo-carlos-default-rtdb.europe-west1.firebasedatabase.app/pedidos/' + id + '.json?auth=' + this.props.idToken)
    .then(response => {
      console.log(response);

      let pedidos = [...this.state.pedidos];
      pedidos.splice(id, 1);
  
      this.setState({ pedidos: pedidos });
    });

  }





  render() {

   

    let listapedidos = null;
    
      if (this.props.idToken) {
        listapedidos = (
          <Pedidos
            pedidos={this.state.pedidos}
            eliminarPedido={this.eliminarPedido}
            auth={this.props.auth} />
        )
      }else{
        listapedidos = "Inicie sesión para poder acceder a esta información"
      }
    
    return (
    <p>
        {listapedidos}
    </p>
    )
  }

}

export default TodosPedidos;
