import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
    this.increaseScore = this.increaseScore.bind(this);
    console.log('Constructor 1');
  }

  increaseScore() {
    this.setState({
      score: this.state.score + 2,
    });
  }
  componentWillMount() {
    console.log('componentWillMount 2');
  }
  componentDidMount() {
    console.log('componentDidMount 4');
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate 5');
    return true;
  }
  componentWillUpdate() {
    console.log('componentWillUpdate 6');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate 7');
  }
  componentWillUnmount() {
    alert('componentWillUnmount 8');
  }
  render() {
    console.log('render 3');
    if (this.state.score > 4) {
      return '';
    }
    return (
      <React.Fragment>
        <h2>{this.props.name}</h2>
        <h1>{this.state.score}</h1>
        <button onClick={this.increaseScore}>+2</button>
      </React.Fragment>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Team name="Eagles"></Team>
        <Team name="Hawks"></Team>
      </div>
    );
  }
}

export default App;
