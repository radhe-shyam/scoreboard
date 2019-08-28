import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

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
	UNSAFE_componentWillMount() {
		console.log('componentWillMount 2');
	}
	componentDidMount() {
		console.log('componentDidMount 4');
	}
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate 5');
		return true;
	}
	UNSAFE_componentWillUpdate() {
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

class Scoreboard extends Component {
	constructor() {
		super();
		this.state = {
			teams: []
		};
	}
	UNSAFE_componentWillMount() {
		fetch('http://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then((data) => {
				data = data.map(x => { x.active = true; return x; });
				this.setState({
					teams: data
				});
			})
			.catch(console.log)
	}
	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/users', { 
			method: 'post', 
			headers: { 'content-type': 'application/json' }, 
			body: JSON.stringify({ "data": "radhe" }) 
		})
			.then(res => res.json())
			.then((data) => {
				data = data.map(x => { x.active = true; return x; });
				this.setState({
					teams: data
				});
			})
			.catch(console.log)
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
	render = () => (
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
class App extends Component {
	render = () => (
		<Router>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/topics">Topics</Link>
				</li>
				<li>
					<Link to="/protected/hum">Protected</Link>
				</li>
				<li>
					<Link to="/protected2/tum">Protected2</Link>
				</li>
			</ul>
			<Switch>
				<Route exact={true} path={"/"} component={Scoreboard} ></Route>
				<Route path={"/about"} render={() => (<h4>About page</h4>)} ></Route>
				<Route path={"/topics"} render={() => (<h4>topics page</h4>)} ></Route>
				<PrivateRoute path={"/protected/:id"} component={protectedRoute}>Protected</PrivateRoute>
				<PrivateRoute path={"/protected2/:id"} component={protectedRoute}>Protected</PrivateRoute>
			</Switch>
		</Router>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => (<Route render={props => (true ? <Component {...props} {...rest} /> : <Redirect to={"/"} />)} />);

const protectedRoute = (props, rest) => (<h4>{props.location.pathname}</h4>);

export default App;