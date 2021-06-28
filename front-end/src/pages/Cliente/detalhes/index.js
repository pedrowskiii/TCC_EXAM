import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default class cliente extends Component {
    state = {
        cliente: {},
    };

    

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/clientes/${id}`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { cliente, index } = this.state;


        return (
            <div className="geral-info">
        <span className="novopront"><Link to={`/novoprontuario/${cliente.id}`}> Abrir Prontuário </Link> <br /></span>
                <h1> {cliente.nome} </h1>
                <h1> {cliente.cpf} </h1>
                <h1>{moment(cliente.datan).format("D/M/Y")}{""} </h1>             
                <h1> {cliente.endereco} </h1>
                <h1> {cliente.telefone} </h1>

              
                
                <br />
                <Link to={`/clientes`}> Voltar </Link> <br />
                <Link to={`/editarcliente/${cliente.id}`}> Editar </Link> <br />
                <Link to={`/deletarcliente/${cliente.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}