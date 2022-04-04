/* eslint-disable no-dupe-class-members */
import React from "react";

import FormGroup from "../components/form-group";
import Card from "../components/card";

import Button from "react-bootstrap/Button";
import "react-dropdown-now/style.css";
import Tabs from "react-bootstrap/Tabs";
import { Tab } from "react-bootstrap";
import * as messages from "../components/toastr";
import {Col, Row } from "react-bootstrap";

import CadastroService from "../service/cadastroService";
import TableAddress from "./TableAddress";

class Cadastro2 extends React.Component {
  state = { nome: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", nome_cidade: "", uf: "", items: [] };

  constructor() {
    super();
    this.service = new CadastroService();
  }


  checkCEP = (e) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;
        document.getElementById("numero").focus();
      })
      .catch((err) => console.log(err));
  };

  cadastrar = () => {
    //const {nome, cep, logradouro, numero, bairro, nome_cidade, uf, complemento} = this.state;
    const funcionario = {nome: this.state.nome, enderecos: this.state.items};
    this.service
      .save(funcionario)
      .then((response) => {
        messages.mensagemSucesso("cadastrado com sucesso!");
      })
      .catch((erro) => {
        messages.mensagemErro(erro.response.data);
      });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      cep: this.state.cep,
      rua: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      nome_cidade: this.state.nome_cidade,
      uf: this.state.uf
    });

    this.setState({
      items,
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      nome_cidade: '',
      uf: ''
    });

    var form = document.getElementById('form-adiciona');
    form.reset();
  };

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({[name]:value})
  }

  handleSaveChange(e) {
    let items = [...this.state.items];

    items.push({
      cep: this.state.cep,
      rua: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      nome_cidade: this.state.nome_cidade,
      uf: this.state.uf
    });

    items.push(e.value);

    this.setState({
      items: items
    });
    
}
handleSaveChange = this.handleSaveChange.bind(this);
  

  render() {
    return (
      <div className="container" style={{ position: "relative", top: "10px" }}>
        <Card title="Cadastro de Funcionarios">
          <div className="row">
            <div className="col-lg-12">
              <Tabs defaultActiveKey="profile" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                  <FormGroup label="Nome:" htmlFor="inputNome">
                    <input
                      type="text"
                      className="form-control"
                      id="inputNome"
                      name="nome"
                      onChange={(e) => this.setState({ nome: e.target.value })}
                    />
                  </FormGroup>                  
                </Tab>

                <Tab eventKey="endereco" title="Endereco">
                  <form className="container" method="get" id="form-adiciona">
                        <Col sm={2}>
                            <FormGroup label="CEP:" htmlFor="cep">
                              <input type="text"  className="form-control" id="cep" name="cep" onBlur={this.checkCEP} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        
                        <Row>
                          <Col sm={8}>
                              <FormGroup label="Rua:" htmlFor="rua">
                                  <input type="text"  className="form-control" id="rua" name="rua" onChange={this.handleInputChange}/>
                              </FormGroup>
                          </Col>
                          <Col>
                              <FormGroup label="Numero:" htmlFor="numero">
                                  <input type="text"  className="form-control" id="numero" name="numero" onChange={this.handleInputChange}/>
                              </FormGroup>
                          </Col>
                          <Col>
                              <FormGroup label="Complemento:" htmlFor="complemento">
                                  <input type="text"  className="form-control" id="complemento" name="complemento" onChange={this.handleInputChange}/>
                              </FormGroup>
                          </Col>                          
                        </Row>
                        
                          <Row>
                            <Col sm={4}>
                              <FormGroup label="Bairro:" htmlFor="bairro">
                                  <input type="text"  className="form-control" id="bairro" name="bairro" onChange={this.handleInputChange}/>
                              </FormGroup>
                            </Col>
                            <Col sm={4}>
                              <FormGroup label="Cidade:" htmlFor="nome_cidade">
                                  <input type="text"  className="form-control" id="cidade" name="nome_cidade" onChange={this.handleInputChange}/>
                              </FormGroup>
                            </Col>
                            <Col sm={2}>
                              <FormGroup label="UF:" htmlFor="uf">
                                  <input type="text"  className="form-control" id="uf" name="uf" onChange={this.handleInputChange}/>
                              </FormGroup>
                            </Col>
                          </Row>
                            <br/>
                            <button type="submit" value="Submit" onClick={this.handleFormSubmit}>Add Item</button>
                  </form>

                  <br />
                  <div>
                  <TableAddress items = {this.state.items}
                  value={this.state.items}
                  name="items"
                  onChange={this.handleChange}/>
                  </div>
                </Tab>
              </Tabs>

              <div></div>
            </div>
          </div>
          <br />

          <Button className="btn btn-success" onClick={this.cadastrar}>
            Save
          </Button>
        </Card>
      </div>
    );
  }
}

export default Cadastro2;
