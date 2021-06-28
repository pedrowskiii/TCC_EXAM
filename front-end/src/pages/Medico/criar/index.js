import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarMedico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medico: {
                nome: "",
                crm: "",
                especialidade: "",
                dataCadastro: ""
                
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
        </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/medicos" />;
        } else {
            return (
                <div className="container">
                <div className="col-md-12">
    <div className="configdiv">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar medico</legend>
                        <div className="geral-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.medico.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="geral-insert">
                            <label htmlFor="crm">CRM </label>
                            <br />
                            <input
                                type="text"
                                id="crm"
                                name="crm"
                                placeholder="CRM"
                                required
                                value={this.state.medico.crm}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="geral-insert">
                            <label htmlFor="matricula">Especialidade </label>
                            <br />
                            <input
                                type="text"
                                id="especialidade"
                                name="especialidade"
                                placeholder="Especialidade"
                                required
                                value={this.state.medico.especialidade}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="geral-insert">
                            <label htmlFor="dataLancamento">Data de Cadastro </label>
                            <br />
                            <input
                                type="date"
                                id="dataCadastro"
                                name="dataCadastro"
                                placeholder="Data de Nascimento"
                                required
                                value={this.state.medico.dataCadastro}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
                </div>
                </div>
                </div>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            medico: { ...prevState.medico, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/medicos", {
            method: "post",
            body: JSON.stringify(this.state.medico),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default CriarMedico;
