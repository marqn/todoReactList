import React from 'react';

export default class DoneButton extends React.Component {
    status = 'btn btn-outline-success';

    render() {
        return (
            <button class="btn btn-outline-success">Wykonaj</button>
        )
    }
}