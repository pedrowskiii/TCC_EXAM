import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import moment from "moment";

export default class Atendente extends Component {
    state = {
        atendente: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/atendentes/${id}`)
            .then(atendente =>
                atendente.json().then(atendente => this.setState({ atendente }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { atendente, index } = this.state;

        return (
            <div className="geral-info">
                <h1>NOME: {atendente.nome} </h1>
                <h1>CPF: {atendente.cpf} </h1>
                <h1>MATRÍCULA: {atendente.matricula} </h1>
                <h1>DATA DE CADASTRO: {moment(atendente.dataCadastro).format('DD/MM/YYYY')} </h1>
                <br />
                <Link to={`/atendentes`}> Voltar </Link> <br />
                <Link to={`/editarAtendente/${atendente.id}`}> Editar </Link> <br />
                <Link to={`/deletarAtendente/${atendente.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}