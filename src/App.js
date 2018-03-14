import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import DoneButton from './DoneButton';

console.clear();

const TodoForm = ({addTodo}) => {
    let input;

    // Return JSX
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    addTodo(input.value);
                    input.value = '';
                }
            }} placeholder="add task..." ref={node => {
                input = node;
            }}/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={() => {
                    addTodo(input.value);
                    input.value = '';
                }}>+ Add task
                </button>
            </div>
        </div>
    )
};

const Todo = ({todo, remove, edit}) => {
    // Each Todo
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {todo.time}<b>{todo.text}</b>
            <div>
                <DoneButton/>
                <button type="button" className="btn btn-warning" onClick={() => {
                    edit(todo.id)
                }}>Edytuj
                </button>
                <button type="button" className="btn btn-danger" onClick={() => {
                    remove(todo.id)
                }}>Usuń
                </button>
            </div>
        </li>
    )
};

const TodoList = ({todos, remove, edit}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove} edit={edit}/>)
    });
    return (<ul>{todoNode}</ul>);
};

const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>Task list: ({todoCount})</h1>
            </div>
        </div>
    );
};

class App extends Component {
    id = 0;
    _inputText;
    onEditedText = (editedText) => {
        this.state({editedText});
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            editedText: ''
        }
    }

    addTodo(val) {
        console.log(this.impucik);
        let time = moment()
            .format('DD.MM.YYYY - HH:mm:ss')
            .toString();

        if (val !== '') {
            const todo = {text: val, id: this.id, time: time};
            this.state.data.unshift(todo);
            this.setState({data: this.state.data});
            this.id++;
        }
    }

    handleRemove(id) {
        console.log('click remove  id:' + id);
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        // Update state with filter
        this.setState({data: remainder});
    }

    edit(id) {
        // console.log('edit:' + id);
        const remainder = this.state.data.filter((todo) => {
            if (todo.id == id) {
                this._inputText = todo.text;
                // console.log(todo);
                // console.log('this._inputText:' + this._inputText);
                this.setState({editedText: todo.text});
            }
        });
        console.log(this);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Test placeholder="mój tekst" />
                    <Title todoCount={this.state.data.length}/>
                    <TodoForm red={(c) => this.impucik = c} addTodo={this.addTodo.bind(this)}/>
                    <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}
                              edit={this.edit.bind(this)}/>

                </div>
            </div>
        );
    }
}

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0, text: null};
    }

    increment() {
        this.state.count = this.state.count + 1;
        this.setState({count: this.state.count});
        this.myInput.value = this.state.count;
    }

    render() {
        const {placeholder} = this.props;
        return (
            <div>
                <input type="text" placeholder={placeholder} ref={(c) => this.myInput = c}/>

                <button onClick={this.increment.bind(this)} type="button" className="btn btn-primary">
                    Notifications <span className="badge badge-light">{this.state.count}</span>
                </button>
            </div>
        )
    }
}

export default App;
