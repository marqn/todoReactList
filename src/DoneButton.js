import React from 'react';

export default class DoneButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'btn btn-secondary', text: 'Wykonaj'};
    }

    changeState() {
        if (this.state.status == 'btn btn-secondary')
            this.setState({status: 'btn btn-success', text:'Zrobione'});
        else if (this.state.status == 'btn btn-success')
            this.setState({status: 'btn btn-secondary', text:'Wykonaj'});

        console.log(this.state);
    }

    render() {
        return (
            <button class={this.state.status} onClick={this.changeState.bind(this)}>{this.state.text}</button>
        )
    }
}