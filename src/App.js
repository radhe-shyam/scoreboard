import React, { Component } from 'react';
import './App.css';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
    this.increaseScore = this.increaseScore.bind(this);
  }

  increaseScore() {
    this.setState({
      score: this.state.score + 2,
    });
  }
  render() {
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
