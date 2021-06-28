import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import './index.css';
import { Link } from "react-router-dom";


class EditarProntuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prontuario: {
                nome_cliente: "",
                cpf_cliente: "",
                nome_medico: "",
                diagnostico: "",
                medicamentos: "",
                exames: "", 
                pagamento:""
           
                
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

        fetch(`http://localhost:3003/sistema/prontuarios/${id}`)
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
        <div className="configdiv" id="prontuario">


                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Prontuário</legend>
                        <div className="form-geral" >
                            <label htmlFor="nome">Nome Paciente </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                readonly
                                value={this.state.prontuario.nome_cliente}
                                onChange={this.handleInputChange}

                            />
                        </div>
                        <div className="form-geral">
                            <label htmlFor="autor">CPF Paciente </label>
                            <br />
                            <input
                                type="text"
                                id="cpf_cliente"
                                name="cpf_cliente"
                                placeholder="CPF"
                                required
                                readonly
                                value={this.state.prontuario.cpf_cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>



                        <div className="form-geral">
                            <label htmlFor="autor">Nome Médico </label>
                            <br />
                            <input
                                type="text"
                                id="nome_medico"
                                name="nome_medico"
                                placeholder="Nome médico"
                                required
                                value={this.state.prontuario.nome_medico}
                                onChange={this.handleInputChange}
                            />
                        </div>
                <div className="form-geral">
                    <label>
                    <select name="pagamento"  onChange={this.handleInputChange}>
                    
                    <option select value="1">Convênio</option>
                    <option value="2">Dinheiro</option>
                    <option  value="3">Cartao de Crédito</option>
                    <option   value="4">Cartao de Débito</option>
                    </select>
                    </label>
                    </div>

                   



                        <div className="form-geral">
                            <label htmlFor="autor">Diagnóstico </label>
                            <br />
                            <input
                                type="text"
                                id="diagnostico"
                                name="diagnostico"
                                placeholder="CPF"
                                required
                                value={this.state.prontuario.diagnostico}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-geral">
                            <label htmlFor="autor">Medicamentos </label>
                            <br />
                            <input
                                type="text"
                                id="medicamento"
                                name="medicamento"
                                placeholder="medicamento"
                                required
                                value={this.state.prontuario.medicamento}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-geral">
                            <label htmlFor="autor">Exames </label>
                            <br />
                            <input
                                type="text"
                                id="exames"
                                name="exames"
                                placeholder="EXAMES"
                                required
                                value={this.state.prontuario.exames}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        
                        <Link to={`/prontuarios`}> Voltar </Link> <br />
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
            prontuario: { ...prevState.prontuario, [name]: value }
        }));
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

export default EditarProntuario;
