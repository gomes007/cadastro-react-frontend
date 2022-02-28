import ApiService from "./apiServices";

class CadastroService extends ApiService {

    constructor(){
        super("/funcionarios");
    }


    save(funcionario){
        return this.post('/', funcionario)
      }


    update(funcionario){
        return this.put(`/${funcionario.id}`, funcionario);
    }


    find(id){
        return this.get(`/${id}`);
    }


    delete(id){
        return this.delete(`/${id}`);
    }


}

export default CadastroService