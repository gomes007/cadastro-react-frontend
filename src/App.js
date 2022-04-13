import React from "react";
import Cadastro from "./views/cadastro";



import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootswatch/dist/cerulean/bootstrap.css";
import "toastr/build/toastr.css";
import "toastr/build/toastr.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Cadastro2 from "./views/cadastro copy";

function App() {
  return (
   
      <Router>                
        <Switch>
          <Route exact path="/" component={Cadastro} />
        </Switch>
      </Router>
    
  );
}

export default App;
