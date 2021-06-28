import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarCliente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cliente: {
                nome: "",
                cpf: "",
                datan: "",
                endereco: "",
                telefone: ""
                
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
            return <Redirect to="/clientes" />;
        } else {
            return (

                <div className="container">
                <div className="col-md-12">
    <div className="configdiv">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar cliente</legend>
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
                                value={this.state.cliente.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="geral-insert">
                            <label htmlFor="cpf">CPF </label>
                            <br />
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="CPF"
                                required
                                value={this.state.cliente.cpf}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="geral-insert">
                            <label htmlFor="datan">Data de Nascimento </label>
                            <br />
                            <input
                                type="date"
                                id="datan"
                                name="datan"
                                placeholder="datan"
                                required
                                value={this.state.cliente.datan}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="geral-insert">
                            <label htmlFor="endereco">Endereço</label>
                            <br />
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                placeholder="Endereço"
                                required
                                value={this.state.cliente.endereco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="geral-insert">
                            <label htmlFor="telefone">Telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                required
                                value={this.state.cliente.telefone}
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
            cliente: { ...prevState.cliente, [name]: value }
        }));
        console.log(value);
    };

    
    handleSubmit = event => {
        const { id } = this.state.prontuario;

        fetch(`http://localhost:3003/sistema/prontuarios/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.prontuario),
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

export default CriarCliente;
