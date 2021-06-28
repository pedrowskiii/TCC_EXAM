import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { Link } from "react-router-dom";

class EditarMedico extends Component {
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/medicos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ medico: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
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
                        <legend>Editar Médico</legend>
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
                            <label htmlFor="autor">CRM </label>
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
                            <label htmlFor="dataCadastro">Data de Cadastro </label>
                            <br />
                            <input
                                type="text"
                                id="dataCadastro"
                                name="dataCadastro"
                                placeholder="Data de Cadastro"
                                required
                                value={this.state.medico.dataCadastro}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <Link to={`/medicos`}> Voltar </Link> <br />
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
            medico: { ...prevState.medico, [name]: value }
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.medico;

        fetch(`http://localhost:3003/sistema/medicos/${id}`, {
            method: "put",
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

export default EditarMedico;
