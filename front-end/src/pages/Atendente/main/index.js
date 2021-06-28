import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atendente: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/atendentes`)
            .then(atendente =>
                atendente.json().then(atendente => this.setState({ atendente }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { atendente } = this.state;
        return atendente.map((atendente, index) => (
            <container>
            <div className="geral-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">Nome: {atendente.nome}</h5>
               <div class="corpo-card">
                        <strong>Matrícula: {atendente.matricula} </strong>
                        <Link to={`/atendentes/${atendente.id}`}> - ver detalhes </Link> 
                </div>       
                   
                </div>
            </div>
            </container>
        ))
    };
}