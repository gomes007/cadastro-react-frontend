import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:8080"
  });

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl;
      }
    
    post(url, objeto) { /* aciona o end point no back end (http://localhost:8080/apiurl/url) ver detalhes em: cadastroService.js */
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto); 
      }


    put(url, obj){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, obj);
    }


    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl);
    }


}

export default ApiService;