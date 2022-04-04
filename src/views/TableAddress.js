import React from "react";

class TableAddress extends React.Component {
  render() {
    const items = this.props.items;
    
    return (
      <div id="Table">
        <form onSubmit={this.props.onChange}> 
        <table>
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
            {items.map((item) => { 
                           
              return (
                <tr>                  
                  <td>{item.cep}</td>
                  <td>{item.logradouro}</td>
                  <td>{item.numero}</td>
                  <td>{item.complemento}</td>
                  <td>{item.bairro}</td>
                  <td>{item.nome_cidade}</td>
                  <td>{item.uf}</td>
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
