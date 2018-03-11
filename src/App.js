import React, {Component} from 'react';
import './App.css';
import moment from 'moment';

console.clear();

const TodoForm = ({addTodo}) => {
    let input;

    // Return JSX
    return (
        <div class="input-group mb-3">
            <input type="text" class="form-control" onKeyPress={(e) => {
                if (e.key == 'Enter') {
                    addTodo(input.value);
                    input.value = '';
                }
            }} placeholder="add task..." ref={node => {
                input = node;
            }}/>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" onClick={() => {
                    addTodo(input.value);
                    input.value = '';
                }}>+ Add task
                </button>
            </div>
        </div>
    )
};

const Todo = ({todo, remove}) => {
    // Each Todo
    return (
        <li class="list-group-item d-flex justify-content-between align-items-center">
            {todo.time}<b>{todo.text}</b>
            <button type="button" class="btn btn-danger" onClick={() => {
                remove(todo.id)
            }}>Usuń
            </button>
        </li>
    )
};

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
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
            data: []
        }
    }

    addTodo(val) {
        var time = moment()
            .format('DD.MM.YYYY - HH:mm:ss')
            .toString();

        const todo = {text: val, id: this.id, time: time};
        this.state.data.unshift(todo);
        this.setState({data: this.state.data});
        this.id++;
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

    render() {
        return (
            <div className="App">
                <div class="container">
                    <Title todoCount={this.state.data.length}/>
                    <TodoForm addTodo={this.addTodo.bind(this)}/>
                    <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}/>

                </div>
            </div>
        );
    }
}

export default App;
