import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        enviado: false
    }

    loginHandler = () => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqGbJlwLJrcCAvKrK15OG3X4Zg-bR9uaE', authData)
            .then(response => {
                this.props.setAuthentication(true, response.data);
                this.setState({enviado: true});
                console.log(response);
            })
            .catch(err => {
                this.props.setAuthentication(false, {});
                alert('Email o contraseña incorrectos');
                console.log(err);
            });
    }

    render() {
        let redireccion = null;
        if(this.state.enviado){
            redireccion = (<Redirect to="/persons" />)
        }

        return (
            <>
                {redireccion}
                <h1>LOGIN</h1>
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                <button onClick={this.loginHandler}>LOGIN</button>

                
            </>
        )
    }
}

export default Login;