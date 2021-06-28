import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prontuario: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/prontuarios`)
            .then(prontuario =>
                prontuario.json().then(prontuario => this.setState({ prontuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { prontuario } = this.state;
        return prontuario.map((prontuario, index) => (
            <container>
            <div className="geral-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header"><strong>Prontuário Nº : {prontuario.id}  <Link to={`/prontuarios/${prontuario.id}`}>ver detalhes</Link> </strong></h5>
               <div class="corpo-card">
               <p><strong>Nome: {prontuario.nome_cliente}</strong></p>
                        <p><strong>CPF: {prontuario.cpf_cliente} </strong></p>
                       
                </div>       
                   
                </div>
            </div>
            </container>
        ))
    };
}