/* eslint-disable no-dupe-class-members */
import React from "react";


import FormGroup from "../components/form-group";
import Card from "../components/card";
import {mensagemSucesso, mensagemErro} from "../components/toastr"
import Button from 'react-bootstrap/Button';
import { Checkbox } from 'primereact/checkbox';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { InputTextarea } from 'primereact/inputtextarea';
import fieldset from '../components/fieldset.css'



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
    estadoCivil: "",
    outrasInfo: "",
    telefone: "",

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


  onEstadoCivilChange(e) {
    let selectedEstadocivil = [...this.state.estadoCivil];
    selectedEstadocivil.push(e.value);
    this.setState({ estadoCivil: selectedEstadocivil });
}

  onEstadoCivilChange = this.onEstadoCivilChange.bind(this);
  

  checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    //console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        document.getElementById('rua').value=(data.logradouro);
        document.getElementById('bairro').value=(data.bairro);
        document.getElementById('cidade').value=(data.localidade);
        document.getElementById('uf').value=(data.uf);
      });
  }

 



  cadastrar = () => {

    const { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf, estadoCivil, outrasInfo, telefone } = this.state;
    const funcionario = { nome, email, sexo, podeViajar, coding, dataNascimento, cep, logradouro, numero, bairro, nome_cidade, uf, estadoCivil, outrasInfo, telefone };

  
    
    this.service
      .save(funcionario)
      .then((response) => {
        mensagemSucesso("cadastrado com sucesso!");
        
      })
      .catch((erro) => {
        mensagemErro(erro.response.data); 
      });

  };



  //data table para endereços

  adicionaItemNaTabela(item) {
    var itemTr = this.montaTr(item);
    var tabela = document.getElementById('tabela-items');
    tabela.appendChild(itemTr);
  }


  obtemitemDoForm(form) {
    var item = {
      cep: form.cep.value,
      rua: form.rua.value,
      bairro: form.bairro.value,
      cidade: form.cidade.value,
      uf: form.uf.value,
    };      
    return item;
  }

  onsalvar(){

    let selectedCep = [...this.state.cep, ...this.state.logradouro];

    this.setState({ cep: selectedCep});
    this.setState({ logradouro: selectedCep});

  }

  onsalvar = this.onsalvar.bind(this);

  
  montaTr(item) {
    //criar tr para incluir novos dados
    var itemTr = document.createElement("tr");
    itemTr.classList.add("item");
  
    //incluindo td na tr
    itemTr.appendChild(this.montaTd(item.cep, "info-cep"));
    itemTr.appendChild(this.montaTd(item.rua, "info-rua"));
    itemTr.appendChild(this.montaTd(item.bairro, "info-bairro"));
    itemTr.appendChild(this.montaTd(item.cidade, "info-cidade"));
    itemTr.appendChild(this.montaTd(item.uf, "info-uf"));
    return itemTr;
  }


  montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
  }



  addDados = (e) => {
    
        e.preventDefault();
      
        //passar o formulario para uma variavel e capturar os valores dos input atraves do name
        var form = document.getElementById('form-adiciona');
      
        var item = this.obtemitemDoForm(form);
      
        this.adicionaItemNaTabela(item)
      
        form.reset();        
  }
  //fim data table para endereços

  
  onEndChange(e) {
    let selectedCep = [...this.state.cep];
    this.setState({ cep: selectedCep });
}
  onEndChange = this.onEndChange.bind(this);




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

          
              <FormGroup label="Data Nascimento:" htmlFor="inputDataNascimento">
                <input type="date" className="form-control" id="inputDataNascimento" name="DataNascimento" onChange={(e) =>  this.setState({ dataNascimento: e.target.value })} />
              </FormGroup>


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

             

              
                <br/>

                <form className="container" method="get" id="form-adiciona">
                  <FormGroup label="CEP:" htmlFor="cep">
                      <input type="text"  className="form-control" id="cep" name="cep" onBlur={this.checkCEP} />
                  </FormGroup>
                  
                  <FormGroup label="Rua:" htmlFor="rua">
                      <input type="text"  className="form-control" id="rua" name="rua" />
                  </FormGroup>

                  <FormGroup label="Bairro:" htmlFor="bairro">
                      <input type="text"  className="form-control" id="bairro" name="bairro" />
                  </FormGroup>

                  <FormGroup label="Cidade:" htmlFor="nome_cidade">
                      <input type="text"  className="form-control" id="cidade" name="nome_cidade" />
                  </FormGroup>

                  <FormGroup label="UF:" htmlFor="uf">
                      <input type="text"  className="form-control" id="uf" name="uf" />
                  </FormGroup>

                  <br/>
                  <button onClick={this.addDados} className="btn btn btn-success">Adicionar</button>
                </form>

                <br/>

        
              <h2>Enderecos</h2>
				
              
              <table className="table table-striped">
                <thead>
                  <tr>
                      <th>CEP</th>
                      <th>Rua</th>
                      <th>Bairro</th>
                      <th>cidade</th>
                      <th>estado</th>
                  </tr>
                </thead>
                <tbody id="tabela-items" >
                  
                </tbody>
              </table>

              <br/>

              <Dropdown
                  placeholder="Estado Civil"
                  options={['Solteiro', 'Casado', 'Divorciado']}
                  value="estadoCivil"
                  onChange={this.onEstadoCivilChange}
                  onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                  onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                  onOpen={() => console.log('open!')}
                />

              <br/>

                <div>
                  <legend className="scheduler-border">Mais informações:</legend>
                  <InputTextarea rows={5} cols={54} onChange={(e) => this.setState({ outrasInfo: e.target.value })}/>           
                </div>  
               

              
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
