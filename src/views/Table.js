import React from 'react';

class Table extends React.Component {
  render() {
    const items = this.props.items;
    return (
      <div id="Table">
        <form onSubmit={this.props.handleInputChange}>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
            {items.map(item => {
              return (
                <tr>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
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

export default Table;