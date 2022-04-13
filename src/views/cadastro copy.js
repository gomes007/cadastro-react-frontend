/* eslint-disable no-dupe-class-members */
import React from "react";


import FormGroup from "../components/form-group";
import Card from "../components/card";
import TableAddress from "./TableAddress";

import Button from 'react-bootstrap/Button';
import { Checkbox } from 'primereact/checkbox';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { InputTextarea } from 'primereact/inputtextarea';
import fieldset from '../components/fieldset.css'
import Tabs from "react-bootstrap/Tabs";
import { Tab } from "react-bootstrap";
import * as messages from '../components/toastr';
import { Form, Container, Col, Row } from 'react-bootstrap';






import CadastroService from "../service/cadastroService";


class Cadastro2 extends React.Component {
  
  state = {
    nome: "",
    email: "",
    sexo: "",
    podeViajar: "",
    checked: false,
    coding: [],
    dataNascimento: "",
    estadoCivil: "",
    outrasInfo: "",
    telefone: "",
    cpf: "",

    cep:"",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    nome_cidade: "",
    uf: "",
    items: []
  };
  


  constructor(){
    super();
    this.service = new CadastroService();  
  }

 
  
  onCodeChange(e) {
    let selectedCoding = [...this.state.coding];

    if (e.checked)
    selectedCoding.push(e.value);
    else
    selectedCoding.splice(selectedCoding.indexOf(e.value), 1);

    this.setState({ coding: selectedCoding });
}
  onCodeChange = this.onCodeChange.bind(this);


  onEstadoCivilChange(e) {
    let selectedEstadocivil = [...this.state.estadoCivil];
    selectedEstadocivil.push(e.value);
    this.setState({ estadoCivil: selectedEstadocivil });
}
  onEstadoCivilChange = this.onEstadoCivilChange.bind(this);
  

  checkCEP = (e) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('rua').value=(data.logradouro);
        document.getElementById('bairro').value=(data.bairro);
        document.getElementById('cidade').value=(data.localidade);
        document.getElementById('uf').value=(data.uf);
        document.getElementById('numero').focus();
      }).catch((err) => console.log(err));
  }


  cadastrar = () => {
    const { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf, estadoCivil, outrasInfo, telefone, cpf, complemento } = this.state;
    const funcionario = { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf, estadoCivil, outrasInfo, telefone, cpf, complemento, enderecos: this.state.items };
   
    this.service
      .save(funcionario)
      .then((response) => {                              
        messages.mensagemSucesso('cadastrado com sucesso!');
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



  
  render() {
    return (      
    <div className="container" style={{ position: "relative", top: "10px" }}>
      <Card title="Cadastro de Funcionarios"> 
        <div className="row">
          <div className="col-lg-12">                                         
                <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3">

                  <Tab eventKey="profile" title="Profile"> 
                  
                    <FormGroup label="Nome:" htmlFor="inputNome">
                        <input type="text"  className="form-control" id="inputNome" name="nome" onChange={(e) => this.setState({ nome: e.target.value })} />
                    </FormGroup>

                    <FormGroup label="Email:" htmlFor="inputEmail">
                      <input type="text"  className="form-control" id="inputEmail" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
                    </FormGroup>

                    <FormGroup label="CPF:" htmlFor="inputCpf">
                      <input type="number"  className="form-control" id="inputCpf" name="cpf" onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </FormGroup>

                    <FormGroup label="Telefone:" htmlFor="inputTelefone">
                      <input type="number"  className="form-control" id="inputTelefone" name="telefone" onChange={(e) => this.setState({ telefone: e.target.value })} />
                    </FormGroup>

                    <br/>

                    <FormGroup label="Data Nascimento:" htmlFor="inputDataNascimento">
                        <input type="date" className="form-control" id="inputDataNascimento" name="DataNascimento" onChange={(e) =>  this.setState({ dataNascimento: e.target.value })} />
                    </FormGroup>
                    

                    <div className="container">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Sexo</legend>
                            <div className="form-check">
                              <label className="form-check-label" htmlFor="gridRadios1">Masculino</label>
                              <input className="form-check-input" type="radio" name="sexo" id="gridRadios1" value="masculino" onChange={(e) => this.setState({ sexo: e.target.value })}/>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label" htmlFor="gridRadios2">Feminino</label>
                              <input className="form-check-input" type="radio" name="sexo" id="gridRadios2" value="feminino" onChange={(e) => this.setState({ sexo: e.target.value })}/>
                            </div>
                        </fieldset>
                      </div>
     
                      <Dropdown
                          placeholder="Estado Civil"
                          options={['Solteiro', 'Casado', 'Divorciado']}
                          value="estadoCivil"
                          onChange={this.onEstadoCivilChange}
                          onSelect={(value) => console.log('selected!', value)}
                          onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                          onOpen={() => console.log('open!')}
                      />


                      <br/>

                      <div className="card">
                            <h5>Linguagens de programação</h5>
                            <div className="field-checkbox">
                                <label htmlFor="code1">Java</label>
                                <Checkbox inputId="code1" name="code" value="Java" onChange={this.onCodeChange} checked={this.state.coding.indexOf('Java') !== -1} />
                            </div>
                            <div className="field-checkbox">
                                <label htmlFor="code2">JavaScript</label>
                                <Checkbox inputId="code2" name="code" value="JavaScript" onChange={this.onCodeChange} checked={this.state.coding.indexOf('JavaScript') !== -1} />
                            </div>
                            <div className="field-checkbox">
                                <label htmlFor="code3">Python</label>
                                <Checkbox inputId="code3" name="code" value="Python" onChange={this.onCodeChange} checked={this.state.coding.indexOf('Python') !== -1} />
                            </div>
                            <div className="field-checkbox">
                                <label htmlFor="code4">React</label>
                                <Checkbox inputId="code4" name="code" value="React" onChange={this.onCodeChange} checked={this.state.coding.indexOf('React') !== -1} />
                            </div>                                
                        </div>
            

                     <br/>

                        <FormGroup label="Pode viajar?" htmlFor="inputpodeViajar"> <br/>
                          <BootstrapSwitchButton
                            //checked={false}
                            onlabel=''
                            offlabel=''
                            onChange={(checked) => {
                                this.setState({ podeViajar: checked })
                            }}
                            size="sm"/>
                        </FormGroup>
             
                     <br/>

                    <div>
                      <legend className="scheduler-border">Mais informações:</legend>
                      <InputTextarea rows={5} cols={54} onChange={(e) => this.setState({ outrasInfo: e.target.value })}/>           
                    </div>   


                    </Tab>

                    <Tab eventKey="endereco" title="Endereco">
                    
                      <form className="container" method="get" id="form-adiciona">
                        
                        <Col sm={2}>
                            <FormGroup label="CEP:" htmlFor="cep">
                                <input type="text"  className="form-control" id="cep" name="cep" onChange={(e) => this.setState({ cep: e.target.value })}/>
                            </FormGroup>
                        </Col>

                        
                      
                        <Col sm={8}>
                            <FormGroup label="Rua:" htmlFor="rua">
                                <input type="text"  className="form-control" id="rua" name="rua" onChange={(e) => this.setState({ logradouro: e.target.value })}/>
                            </FormGroup>
                        </Col>
  
                        
                          <Row>
                          <Col sm={4}>
                            <FormGroup label="Bairro:" htmlFor="bairro">
                                <input type="text"  className="form-control" id="bairro" name="bairro" onChange={(e) => this.setState({ bairro: e.target.value })}/>
                            </FormGroup>
                          </Col>
                          <Col sm={4}>
                            <FormGroup label="Cidade:" htmlFor="nome_cidade">
                                <input type="text"  className="form-control" id="cidade" name="nome_cidade" onChange={(e) => this.setState({ nome_cidade: e.target.value })}/>
                            </FormGroup>
                          </Col>
                          <Col sm={2}>
                            <FormGroup label="UF:" htmlFor="uf">
                                <input type="text"  className="form-control" id="uf" name="uf" onChange={(e) => this.setState({ uf: e.target.value })}/>
                            </FormGroup>
                          </Col>
                          </Row>
                            <br/>
                            
                      </form>

                      <br/>

                       

                    </Tab>
                </Tabs>                  

               

              
            <div>
           </div>          
           </div>
           </div>
          <br />

      <Button className="btn btn-success" onClick={this.cadastrar}>Save</Button>
      </Card>
      
      </div>
     
    );
  }
}


export default Cadastro2;
