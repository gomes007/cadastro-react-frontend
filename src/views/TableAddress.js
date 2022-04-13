import React from "react";

class TableAddress extends React.Component {
  render() {
    const items = this.props.items;
    
    return (
      <div id="Table">
        <form onSubmit={this.props.onChange}> 
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>cep</th>
              <th>logradouro</th>
              <th>numero</th>
              <th>complemento</th>
              <th>bairro</th>
              <th>nome_cidade</th>
              <th>uf</th>
            </tr>
            {items.map((item, index) => { 
                           
              return (
                <tr key={index}>                  
                  <td>{item.cep}</td>
                  <td>{item.logradouro}</td>
                  <td>{item.numero}</td>
                  <td>{item.complemento}</td>
                  <td>{item.bairro}</td>
                  <td>{item.cidade.nome_cidade}</td>
                  <td>{item.cidade.estado.uf}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default TableAddress;
