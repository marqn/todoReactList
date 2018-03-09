import React, {Component} from 'react';
import './App.css';

const TodoForm = ({addTodo}) => {
    let input;

    return (
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="" aria-label="" ref={node => {
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
        <li class="nav-link">
            {todo.text}
        </li>
    )
};

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });
    return (<ul>{todoNode}</ul>);
};

const Title = () => {
    return (
        <div>
            <div>
                <h1>Task list</h1>
            </div>
        </div>
    );
};

window.id = 0;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    addTodo(val) {
        const todo = {text: val, id: window.id};
        this.state.data.push(todo);
        this.setState({data: this.state.data});
    }

    handleRemove(id) {
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
                    <Title/>
                    <TodoForm addTodo={this.addTodo.bind(this)}/>
                    <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}/>

                    {/*<div id="container" class="col-md-8 col-md-offset-2">
                        <button class="btn btn-outline-danger">click me!</button>
                        <button class="btn btn-outline-danger">click me two!</button>
                    </div>*/}
                </div>


            </div>
        );
    }
}

export default App;
