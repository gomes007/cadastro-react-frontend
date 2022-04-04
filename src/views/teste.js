import React from "react";


export default class Teste2 extends React.Component {

  constructor(){
    super();
    this.state = {
      DDL1: [],
      DDL2: [],
      selectddl: '',
    }
  }

  componentDidMount() {
    this.setState({
      DDL1: [
        {name: 'Colors', DDL2:['Red', 'Black', 'Orange']},
        {name: 'Sports', DDL2:['basketball', 'volei', 'tenis']},
        {name: 'Fruits', DDL2:['apple', 'orange', 'grapes']},
        {name: 'CountryNames', DDL2:['Brazil', 'US', 'UK']},
      ]
    })
  }

  selectChange(e) {
    this.setState({selectddl: e.target.value});
    this.setState({DDL2: this.state.DDL1.find(x => x.name === e.target.value).DDL2});
  }


  render() {
    return (
      <div className="container" style={{ position: "relative", top: "10px" }}>

        <select value={this.state.selectddl} onChange={this.selectChange.bind(this)}>
          <option>--select--</option>
          {this.state.DDL1.map(x => {
            return <option>{x.name}</option>
          })}
        </select>
          
        <select>
        <option selected disabled>---</option>
          {
            this.state.DDL2.map(x => {
              return <option>{x}</option>
            })
          }
        </select>

      </div>
      
    );
  }
}
