import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import './index.css';
import { Link } from "react-router-dom";


class NovoProntuario extends Component {
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
            return <Redirect to="/prontuarios" />;
        } else {
            return (
                <div className="container">
                    <div className="col-md-12">
        <div className="configdiv">


                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Prontuário</legend>
                        <div className="form-geral">
                            <label htmlFor="nome">Nome Paciente </label>
                            <br />
                            <input
                                type="text"
                                id="nome_cliente"
                                name="nome_cliente"
                                placeholder="nome_cliente"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.nome_cliente = this.state.cliente.nome}
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
                                placeholder="cpf_cliente"
                                required
                                value={this.state.cliente.cpf_cliente = this.state.cliente.cpf}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="form-geral">
                            <label htmlFor="nome">Nome Médico</label>
                            <br />
                            <input
                                type="text"
                                id="nome_medico"
                                name="nome_medico"
                                placeholder="Nome Médico - CRM"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.nome_medico}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-geral">
                        <label>
         Forma de Pagamento
          <select value={this.state.cliente.pagamento} name="pagamento" onChange={this.handleInputChange}>
                    
                        <option value="1">Convênio</option>
                        <option value="2">Dinheiro</option>
                        <option value="3">Cartao de Crédito</option>
                        <option   value="4">Cartao de Débito</option>
                        </select></label>
                        </div>
                        <div className="form-geral">
                            <label htmlFor="nome">Diagnóstico</label>
                            <br />
                            <input
                                type="text"
                                id="diagnostico"
                                name="diagnostico"
                                placeholder="Diagnótico"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.diagnostico}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-geral">
                            <label htmlFor="nome">Medicamentos</label>
                            <br />
                            <input
                                type="text"
                                id="medicamento"
                                name="medicamento"
                                placeholder="medicamento"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.medicamentos}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-geral">
                            <label htmlFor="nome">Exames</label>
                            <br />
                            <input
                                type="text"
                                id="exames"
                                name="exames"
                                placeholder="exames"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.exames}
                                onChange={this.handleInputChange}
                            />
                        </div>


                        <Link to={`/clientes`}> Voltar </Link> <br />
                        <button type="submit" className="btn btn-primary">
                            Criar Prontuário
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
        fetch("http://localhost:3003/sistema/prontuarios", {
            method: "post",
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

export default NovoProntuario;
