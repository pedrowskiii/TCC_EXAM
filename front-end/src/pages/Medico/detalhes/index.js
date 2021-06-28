import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import moment from "moment";

export default class Medico extends Component {
    state = {
        medico: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/medicos/${id}`)
            .then(medico =>
                medico.json().then(medico => this.setState({ medico }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { medico, index } = this.state;

        return (
            <div className="geral-info">
                <h1>NOME: {medico.nome} </h1>
                <h1>CRM: {medico.crm} </h1>
                <h1>ESPECIALIDADE: {medico.especialidade} </h1>
                <h1> DT CADASTRO: {moment(medico.dataCadastro).format('DD/MM/YYYY')} </h1>
                <br />
                <Link to={`/medicos`}> Voltar </Link> <br />
                <Link to={`/editarMedico/${medico.id}`}> Editar </Link> <br />
                <Link to={`/deletarMedico/${medico.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}