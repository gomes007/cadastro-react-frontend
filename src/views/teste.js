import React from 'react';
import EventEmitter from 'react-event-emitter';


class Store extends EventEmitter {
  constructor() {
    super()

    this.data = [ 'a', 'b', 'c' ]
  }

  onChange() {
    this.emit( 'update', this.data )
  }

  mutate( index, value ) {
    this.data[ index ] = value
    this.onChange()
  }
}

var store = new Store()

class ChildComponent extends React.Component {
  constructor( props ) {
    super( props )
  }

  // You probably want to use a dispatcher rather than directly accessing the store
  onClick = event => {
    store.mutate( this.props.index, this.props.value + 'Z' )
  }

  render() {
    return <button onClick={ this.onClick }>{ this.props.value }</button>
  }
}

class ParentComponent extends React.Component {
  constructor( props ) {
    super( props )

    // You probably want to be smarter about initially populating state
    this.state = {
      data: store.data
    }
  }

  componentWillMount() {
    store.on( 'update', data => this.setState({ data: data }) )
  }

  render() {
    let cells = this.state.data.map( ( value, index ) => <ChildComponent index={ index } value={ value } /> )

    return (
      <div>
        { cells }
      </div>
    )
  }
}