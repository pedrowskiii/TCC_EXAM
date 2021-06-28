import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//header é um component
//cria uma pasta somente para ele pq vai ficar todos arquivos dele em um lugar só

//para importar o css, venho direto aqui tbm
import './header.css';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses se desejar
const Header = () => (
    <header id="main-header">
        
        <Container>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">EXAM - Gestão Médica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
           
        <NavDropdown title="Gerenciar Clientes" id="basic-nav-dropdown">
        <NavDropdown.Item href="/criarCliente">Criar</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/clientes">Listar</NavDropdown.Item>
        <NavDropdown.Divider />
        </NavDropdown>
        <NavDropdown title="Gerenciar Atendentes" id="basic-nav-dropdown">
        <NavDropdown.Item href="/criarAtendente">Criar</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/atendentes">Listar</NavDropdown.Item>
        <NavDropdown.Divider />
        </NavDropdown>
        <NavDropdown title="Gerenciar Médicos" id="basic-nav-dropdown">
        <NavDropdown.Item href="/criarMedico">Criar</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/medicos">Listar</NavDropdown.Item>
      
        <NavDropdown.Divider />
        </NavDropdown>

        <NavDropdown title="PRONTUÁRIOS" id="basic-nav-dropdown">
        <NavDropdown.Divider />
        <NavDropdown.Item href="/prontuarios">Listar</NavDropdown.Item>
      
        <NavDropdown.Divider />
        </NavDropdown>
           
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Buscar Prontuário" className="mr-sm-2" />
            <Button variant="outline-success">Buscar Prontuário</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
        </Container>

</header>
    
);

export default Header;
