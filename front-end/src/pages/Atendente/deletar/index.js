import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class DeletarAtendente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atendente: {},
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

        fetch(`http://localhost:3003/sistema/atendentes/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ atendente: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/atendentes" />;
        } else {
            return (
                <div className="container">
                <div className="col-md-12">
                <div className="configdiv">
                <fieldset>
                    <legend>Deletar Atendente</legend>
                    <div className="geral-delete">
                        <label htmlFor="nome">{this.state.atendente.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br/><br/>
                        <Link to={`/atendentes`}>Voltar</Link>
                    </div>
                </fieldset>
                </div>
                </div>
                </div>
            );
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/atendentes/${id}`, {
            method: "delete"
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

export default DeletarAtendente;
