import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class prontuario extends Component {
    state = {
        prontuario: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/prontuarios/${id}`)
            .then(prontuario =>
                prontuario.json().then(prontuario => this.setState({ prontuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { prontuario, index } = this.state;
        if (prontuario.pagamento == 1) {
            prontuario.pagamento_texto = "Convênio"
         }
          if (prontuario.pagamento == 2) {
            prontuario.pagamento_texto = "Dinheiro"
         }
         if (prontuario.pagamento == 3) {
            prontuario.pagamento_texto = "Cartão de crédito"
         }
         if (prontuario.pagamento == 4) {
            prontuario.pagamento_texto = "Cartao de Débito"
         }

        return (
            <div className="geral-info">
   


              
<h1 className="title"> Prontuário - Nº  {prontuario.id} </h1>
        <table class="table table-bordered">
        <thead>
        <tr class="success">
        <th scope="col" >
        <h3> PACIENTE</h3>
        </th>
        <th><h3>NOME: {prontuario.nome_cliente} </h3>
        <h3>CPF: {prontuario.cpf_cliente }</h3></th>
        
        </tr>
        </thead>
        <tbody>

        <tr>
        <th scope="row">MÉDICO</th>
        <td><h3> NOME: {prontuario.nome_medico } </h3>
        </td>

        </tr>

        <tr>
        <th scope="row">DIAGNÓSTICO</th>
        <td><h3> {prontuario.diagnostico } </h3></td>

        </tr>
        <tr>
        <th scope="row">MEDICAMENTOS</th>
        <td><h3> {prontuario.medicamento } </h3></td>
        </tr>
        <tr>
        <th scope="row">EXAMES</th>
        <td colspan="2"> <h3> {prontuario.exames } </h3></td>
        </tr>
        <tr>
        <th scope="row">PAGAMENTO</th>
        <td colspan="2"> <h3> {prontuario.pagamento_texto } </h3></td>
        </tr>

        </tbody>
        </table>



                
               

                <br />
                <Link to={`/prontuarios`}> Voltar </Link> <br />
                <Link to={`/editarProntuario/${prontuario.id}`}> Editar </Link> <br />
                <Link to={`/deletarProntuario/${prontuario.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}