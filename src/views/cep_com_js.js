import React from "react";

import FormGroup from "../components/form-group";




class CEP_COM_JS extends React.Component {

    state = {  
        cep:"",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",    
      };


      limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
        
    }



      meu_callback(conteudo) {
        if(!('erro' in conteudo)){

            //Atualiza os campos com os valores
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } // and if
        else {
            //CEP nao encontrado
            //this.limpa_formulário_cep();
            alert('CEP nao encontrado')
        }
      }


      pesquisacep(valor){

        //Nova variável "cep" somente com dígitos
        var cep = valor;

        //Verifica se campo cep possui valor informado
        if(cep !== ''){
            //Expressão regular para validar o CEP
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";

                //Cria um elemento javascript
                var script = document.createElement('script');

                //Sincroniza com o callback
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo
                document.body.appendChild(script);

            } //and if
            else {
                this.limpa_formulário_cep();
                //alert('formato invalido')
            }
        } //and if
            else {
                //cep sem valor, limpa formulário
                this.limpa_formulário_cep();
            }
      }


      checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
          console.log(data);
          document.getElementById('rua').value=(data.logradouro);
          document.getElementById('bairro').value=(data.bairro);
          document.getElementById('cidade').value=(data.localidade);
          document.getElementById('uf').value=(data.uf);
        });
      }


    render() {
        return (
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
                    <input type="text"  className="form-control" id="cidade" name="cidade" onChange={(e) => this.setState({ cidade: e.target.value })} />
                </FormGroup>

                <FormGroup label="UF:" htmlFor="cidade">
                    <input type="text"  className="form-control" id="uf" name="uf" onChange={(e) => this.setState({ uf: e.target.value })} />
                </FormGroup>
            </form>
        )
    }


}

export default CEP_COM_JS;