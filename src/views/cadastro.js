/* eslint-disable no-dupe-class-members */
import React from "react";
import { useForm, register } from 'react-hook-form';
import CEP from "./cep";

import FormGroup from "../components/form-group";
import Card from "../components/card";
import {mensagemSucesso, mensagemErro} from "../components/toastr"
import Button from 'react-bootstrap/Button';
import { Checkbox } from 'primereact/checkbox';



import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import CadastroService from "../service/cadastroService";


class Cadastro extends React.Component {
  
  state = {
    nome: "",
    email: "",
    sexo: "",
    podeViajar: "",
    checked: false,
    coding: [],
    dataNascimento: "",

    cep:"",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    nome_cidade: "",
    uf: "",

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

  

  checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.getElementById('rua').value=(data.logradouro);
        document.getElementById('bairro').value=(data.bairro);
        document.getElementById('cidade').value=(data.localidade);
        document.getElementById('uf').value=(data.uf);
      });
  }

 



  cadastrar = () => {

    const { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf } = this.state;
    const funcionario = { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf };

    
    
    this.service
      .save(funcionario)
      .then((response) => {
        mensagemSucesso("cadastrado com sucesso!");
        this.setState({nome:"", email:"", sexo:""});
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });

  };

  



  render() {
    return (
    <div className="container" style={{ position: "relative", top: "10px" }}>
      <Card title="Cadastro de Funcionarios"> 
        <div className="row">
          <div className="col-lg-6">            
              <FormGroup label="Nome:" htmlFor="inputNome">
                <input type="text"  className="form-control" id="inputNome" name="nome" onChange={(e) => this.setState({ nome: e.target.value })} />
              </FormGroup>

              <FormGroup label="Email:" htmlFor="inputEmail">
                <input type="text"  className="form-control" id="inputEmail" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
              </FormGroup>

              <br/>

              <fieldset className="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Sexo</legend>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="gridRadios1">Masculino</label>
                        <input className="form-check-input" type="radio" name="sexo" id="gridRadios1" value="masculino" onChange={(e) => this.setState({ sexo: e.target.value })}/>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="gridRadios2">Feminino</label>
                        <input className="form-check-input" type="radio" name="sexo" id="gridRadios2" value="feminino" onChange={(e) => this.setState({ sexo: e.target.value })}/>
                      </div>
                    </div>
                  </div>
              </fieldset>

          
              <FormGroup label="Data Nascimento:" htmlFor="inputDataNascimento">
                <input type="date" className="form-control" id="inputDataNascimento" name="DataNascimento" onChange={(e) =>  this.setState({ dataNascimento: e.target.value })} />
              </FormGroup>
            

              <br/>

              <FormGroup label="Pode viajar?" htmlFor="inputpodeViajar">
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

                <form className="container">
                  <FormGroup label="CEP:" htmlFor="cep">
                      <input type="text"  className="form-control" id="cep" name="cep" onBlur={this.checkCEP} onChange={(e) => this.setState({ cep: e.target.value })} />
                  </FormGroup>
                  
                  <FormGroup label="Rua:" htmlFor="rua">
                      <input type="text"  className="form-control" id="rua" name="rua" onChange={(e) => this.setState({ logradouro: e.target.value })} />
                  </FormGroup>

                  <FormGroup label="Bairro:" htmlFor="bairro">
                      <input type="text"  className="form-control" id="bairro" name="bairro" onChange={(e) => this.setState({ bairro: e.target.value })} />
                  </FormGroup>

                  <FormGroup label="Cidade:" htmlFor="cidade">
                      <input type="text"  className="form-control" id="cidade" name="cidade" onChange={(e) => this.setState({ nome_cidade: e.target.value })} />
                  </FormGroup>

                  <FormGroup label="UF:" htmlFor="cidade">
                      <input type="text"  className="form-control" id="uf" name="uf" onChange={(e) => this.setState({ uf: e.target.value })} />
                  </FormGroup>
                </form>




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


export default Cadastro;
