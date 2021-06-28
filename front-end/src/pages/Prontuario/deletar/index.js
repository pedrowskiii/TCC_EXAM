import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';


class DeletarProntuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prontuario: {},
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

        fetch(`http://localhost:3003/sistema/prontuario/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ prontuario: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/prontuarios" />;
        } else {
            return (
                <div className="container">
                <div className="col-md-12">
                <div className="configdiv">
                <fieldset>
                    <legend>Deletar prontuário</legend>
                    <div className="geral-delete">
                        <label htmlFor="id">{this.state.prontuario.cpf_cliente} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br/><br/>
                        <Link to={`/prontuarios`}>Voltar</Link>
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

        fetch(`http://localhost:3003/sistema/prontuarios/${id}`, {
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

export default DeletarProntuario;
