import React, { Component } from 'react';
import fun from '../images/fun.png';
import sport from '../images/sport.png';
import art from '../images/art.png';
class TheCard extends Component {
    state = {
        palyingSound: false,
        editedTitle: '',
        editedDescription: ''
    }
    getClassName = (code) => {
        console.log(code)
        switch (code) {
            case 0:
                return 'card card--picture';
            case 1:
                return 'card card--animation';
            case 2:
                return 'card card--sound';
            default:
                return 'card';
        }
    }
    playSound = () => {
        const audio = document.querySelector("#myAudio");
        if (this.state.palyingSound) {
            audio.pause();
        } else {
            audio.play();            
        }
        this.setState(prevState => ({
            palyingSound: !prevState.palyingSound
        }))
        console.log(this.state.palyingSound);
    }
    addAnimation = () => {
        this.setState({
            playAnimation: true
        })
        setTimeout(() => {
            this.setState({playAnimation:false});
        }, 1000);
    }
    getIcon = (tag) => {
        switch (tag) {
            case 'sport':
                return sport;
            case 'art':
                return art;
            case 'fun':
                return fun;
            default:
                return tag
        }
    }

    changeDescription =  () => {
        this.setState({
            editDescription: true
        })
    }

    changeTitle = () => {
        this.setState({
            editTitle: true
        })
    }
    onChangeTitle = (e) => {
        this.setState({
            editedTitle: e.target.value
        })
    }
    onChangeDescription = (e) => {
        this.setState({
            editedDescription: e.target.value
        })
    }
    onBlurTitle = () => {
        this.setState({
            editTitle: false,
            editedTitle: ''
        })
        this.props.saveToLocalStorage(this.props.card.title, this.state.editedTitle)
    }
    onBlurDescription = () => {
        this.setState({
            editDescription: false,
            editedDescription: ''
        })
        this.props.saveToLocalStorage(this.props.card.description, this.state.editedDescription)
    }
    render() {
        console.log(this.props.localStorage)
        return (
            <div className={`${this.getClassName(this.props.card.code)} ${this.state.playAnimation ? 'flipCard' : ''} card--${this.props.card.tag}`}>
                <div className="card__title">
                    <span className="card__title__icon">
                        <img src={this.getIcon(this.props.card.tag)} alt="icon"/>
                    </span>
                    <h3 onDoubleClick={this.changeTitle}>
                        {this.state.editTitle ?
                            <input 
                                className="card__title__input"
                                onChange={this.onChangeTitle}
                                value={this.state.editedTitle}
                                onBlur={this.onBlurTitle}
                            />
                        :
                            this.props.localStorage[this.props.card.title] ? this.props.localStorage[this.props.card.title] : this.props.card.title  
                        }
                    </h3>
                </div>
                <div className="card__description">
                    <h4 onDoubleClick={this.changeDescription}>
                        {this.state.editDescription ?
                            <input 
                                className="card__description__input"
                                onChange={this.onChangeDescription}
                                value={this.state.editedDescription}
                                onBlur={this.onBlurDescription}
                            />
                            :
                            this.props.localStorage[this.props.card.description] ? this.props.localStorage[this.props.card.description] : this.props.card.description
                        }
                    </h4>
                </div>
                <div className="card__feature">
                    {this.props.card.code === 0 &&
                        <img
                            className="card__feature__picture"
                            src={this.props.card.image}
                            alt={this.props.card.title}
                        />
                    }
                    {this.props.card.code === 1 &&
                        <span
                            className = "card__feature__animation"
                            onClick = {this.addAnimation}
                        >
                            Play Animation
                        </span>
                    }
                    {this.props.card.code === 2 &&
                        <span
                            className = {`card__feature__sound ${this.state.palyingSound ? 'card__feature__sound--play' : 'card__feature__sound--pause'}`}
                            onClick = {this.playSound}
                        >
                            <audio id="myAudio">
                                <source src={this.props.card.sound} type="audio/mpeg"/>
                            </audio>
                            {this.state.palyingSound ? 'Pause Music' : 'Play Music'}
                        </span>
                    }
                </div>
            </div>
        )
    }
}
export default TheCard;