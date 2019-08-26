import React, { Component } from 'react';
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
				<button onClick={this.props.onRemoveTeam}>Close</button>
				<button onClick={this.props.onDisableTeam}>Disable</button>
			</React.Fragment>
		);
	}
}
class App extends Component {
	constructor() {
		super();
		this.state = {
			teams: [{
				name: "Eagles",
				active: true
			}, {
				name: "Hawks",
				active: true
			}]
		};
	}

	onRemoveTeam(team) {
		// To work on direct state variable - Not as per the best practise
		// var teamIndex = this.state.teams.findIndex((x => x.name === team.name));
		// this.state.teams.splice(teamIndex, 1);
		// this.setState({}); // it works

		//Clone the team array and work on it - as per the best practise this is right
		var teams = JSON.parse(JSON.stringify(this.state.teams)); //To deep copy an array
		var teamIndex = teams.findIndex(x => x.name === team.name);
		teams.splice(teamIndex, 1);
		this.setState({
			teams: teams
		});
	}

	onDisableTeam(team) {
		var teams = JSON.parse(JSON.stringify(this.state.teams));
		var teamIndex = teams.findIndex((x => x.name === team.name));
		teams[teamIndex].active = false;
		this.setState({ teams });
	}
	render() {
		return (
			<div className="App">
				{this.state.teams.map((team, index) => {
					return team.active ? <Team
						key={index}
						onDisableTeam={this.onDisableTeam.bind(this, team)}
						onRemoveTeam={this.onRemoveTeam.bind(this, team)}
						name={team.name}
					></Team> : '';
				})}
			</div>
		);
	}
}

export default App;
