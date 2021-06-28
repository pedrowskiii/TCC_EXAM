import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cliente: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/clientes`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { cliente } = this.state;
        return cliente.map((cliente, index) => (
            <container>
            <div className="geral-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header"> {cliente.id} - Nome: {cliente.nome} <Link to={`/clientes/${cliente.id}`}>ver detalhes</Link> </h5>
               <div class="corpo-card">
                        <strong>CPF: {cliente.cpf} </strong>
                       
                </div>       
                   
                </div>
            </div>
            </container>
        ))
    };
}