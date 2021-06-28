import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import './index.css';
import { Link } from "react-router-dom";

class EditarCliente extends Component {
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/clientes/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ cliente: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
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
                        <legend>Editar Cliente</legend>
                        <div className="form-geral">
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
                        <div className="form-geral">
                            <label htmlFor="autor">CPF </label>
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
                        <div className="form-geral">
                            <label htmlFor="dataCadastro">Data de Nascimento </label>
                            <br />
                            <input
                                type="text"
                                id="datan"
                                name="datan"
                                placeholder="Data de Nascimento"
                                required
                                value={this.state.cliente.datan}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <Link to={`/clientes`}> Voltar </Link> <br />
                        <button type="submit" className="btn btn-primary">
                            Atualizar
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
    };

    handleSubmit = event => {
        const { id } = this.state.cliente;

        fetch(`http://localhost:3003/sistema/clientes/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.cliente),
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

export default EditarCliente;
