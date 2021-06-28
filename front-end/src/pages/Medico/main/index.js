import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medico: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/medicos`)
            .then(medico =>
                medico.json().then(medico => this.setState({ medico }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { medico } = this.state;
        return medico.map((medico, index) => (
            <container>
            <div className="geral-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">Nome: {medico.nome} <Link to={`/medicos/${medico.id}`}>ver detalhes</Link></h5>
               <div class="corpo-card">
                        <strong>CRM: {medico.crm} </strong>
                         
                </div>       
                   
                </div>
            </div>
            </container>
        ))
    };
}