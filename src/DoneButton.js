import React, {Component} from 'react';

export default class DoneButton extends Component {
    constructor(props) {
        super(props);
        this.state = {status: 'btn btn-secondary', text: 'Wykonaj'};
    }

    changeState() {
        if (this.state.status === 'btn btn-secondary')
            this.setState({status: 'btn btn-success', text: 'Zrobione'});
        else if (this.state.status === 'btn btn-success')
            this.setState({status: 'btn btn-secondary', text: 'Wykonaj'});
    }

    render() {
        return (
            <button className={this.state.status} onClick={this.changeState.bind(this)}>{this.state.text}</button>
        )
    }
}