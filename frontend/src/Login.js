import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button} from 'reactstrap';
import { Link} from 'react-router-dom';




class Login extends Component {

    state = {
        username: ""
    };

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

    }

    

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let username = { ...this.state.username };
        username = value;
        this.setState({ username });
        reactLocalStorage.setObject('username', username)
    }



    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-intro">
            <div class="container">
                <form class="form-signin" method="post" action="/login">
                    <h2 class="form-signin-heading">Please sign in</h2>
                   <p>
                        <label for="username" class="sr-only">Username</label>
                        <input onChange={this.handleChange}  autoComplete="username" type="text" id="username" name="username" class="form-control" placeholder="Username" required="" autofocus=""></input>
                    </p>
                    <p>
                        <label for="password" class="sr-only">Password</label>
                        <input type="password" id="password" name="password" class="form-control" placeholder="Password" required=""></input>
                    </p>
                    <input name="_csrf" type="hidden" value="3ec8e2e8-f7ef-4d02-8130-6546f82a8d23"></input>
                    <button class ="btn btn-lg btn-primary btn-block" type ="submit">Sign in</button>
                </form>
            </div>
            </div>
            </header>
            </div>
        );
    }
}
export default Login