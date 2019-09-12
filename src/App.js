import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCards, getLocalStorage, saveToLocalStorage } from './redux/actions/cards-action';
import { bindActionCreators } from 'redux';
import TheCard from './components/card';
import { createRipple } from './functions/ripple';

class App extends Component {
	constructor() {
		super();
		this.state = {randomIndex: 0}
	}

	componentDidMount() {
		this.props.getCards();
		this.props.getLocalStorage();
		const buttons = document.getElementsByTagName('button');
		// ripple effect for buttons
        Array.prototype.forEach.call(buttons, function (b) {
            b.addEventListener('click', createRipple);
        });
	}

	changeRandomIndex = () => {
		if (this.props.cards.allCards) {
			const randomIndex = Math.floor(Math.random() * (this.props.cards.allCards.length));
			if (randomIndex === this.state.randomIndex) return this.changeRandomIndex();
			this.setState({
				randomIndex
			})
		}
	}

	render() {
		return (
			<div className="App">
				<div className="App-line"></div>
				<header className="App-header">
					<h1>
						card app
         	 		</h1>
				</header>
				<div className="App-body">
					{
						this.props.cards.allCards ?
						<TheCard 
							card={this.props.cards.allCards[this.state.randomIndex]}
							saveToLocalStorage = {this.props.saveToLocalStorage}
							localStorage={this.props.cards.localStorage}
						/>
						:
						<p> There is no card to show :(</p>
					}
				</div>
				<div className="App-footer">
					<button className="footer__button" onClick={this.changeRandomIndex}>Try</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cards: state.cards
})

const mapDispatchToProps = (dispatch, props) => {
	return bindActionCreators({
		getCards, saveToLocalStorage, getLocalStorage
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
