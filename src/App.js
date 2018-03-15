import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import DoneButton from './DoneButton';

console.clear();

const TodoForm = ({addTodo}) => {
    // Return JSX
    return (
        <div className="input-group mb-3">
            <input type="text"  ref={(c) => this.impucik = c} className="form-control" onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    addTodo(this.impucik.value, this.impucik);
                    this.impucik.value = '';
                }
            }} placeholder="add task..."/>

            <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={() => {
                    addTodo(this.impucik.value, this.impucik);
                    this.impucik.value = '';
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

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            editedInput: ''
        }
    }

    addTodo = (val, impucik) => {
        console.log(impucik);
        let time = moment()
            .format('DD.MM.YYYY - HH:mm:ss')
            .toString();

        if (val !== '') {
            const todo = {text: val, id: this.id, time: time};
            this.state.data.unshift(todo);
            this.setState({data: this.state.data, editedInput: impucik});
            this.id++;
        }
    };

    handleRemove(id) {
        console.log('click remove  id:' + id);
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        // Update state with filter
        this.setState({data: remainder});
    }

    edit = (id) => {
        const remainder = this.state.data.filter((todo) => {
            if (todo.id === id) {
                this.state.editedInput.value = todo.text;
                this.setState({editedText: todo.text});
            }
        });
        console.log(this.state.editedInput);
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Test placeholder="mój tekst"/>
                    <Title todoCount={this.state.data.length}/>
                    <TodoForm addTodo={this.addTodo}/>
                    <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)} edit={this.edit}/>
                </div>
            </div>
        );
    }
}

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0, text: null};
    }

    increment = (e) => {
        this.state.count = this.state.count + 1;
        this.setState({count: this.state.count});
        this.myInput.value = this.state.count;
    };

    render() {
        const {placeholder} = this.props;
        return (
            <div>
                <input type="text" placeholder={placeholder} ref={(c) => this.myInput = c}/>

                <button onClick={this.increment} type="button" className="btn btn-primary">
                    Notifications <span className="badge badge-light">{this.state.count}</span>
                </button>
            </div>
        )
    }
}

class Todoform extends Component {
    constructor(props) {
        super(props);
        this.state = {mode:'add'};
    }

    render() {
        const {addTodo} = this.props;
        return(
            <div className="input-group mb-3">
            <input type="text"  ref={(c) => this.impucik = c} className="form-control" onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    addTodo(this.impucik.value, this.impucik);
                    this.impucik.value = '';
                }
            }} placeholder="add task..."/>

            <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={() => {
                    addTodo(this.impucik.value, this.impucik);
                    this.impucik.value = '';
                }}>+ Add task
                </button>
            </div>
        </div>
        )
    }
}

export default App;
