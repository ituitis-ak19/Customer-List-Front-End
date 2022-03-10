import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Button } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';


class User extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],

            userNameRequest:{
                userName:""
            }

        };

        
        this.give = this.give.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/users').then(response => response.json())                                          
        .catch(err => {console.log(err)});
    
        if(typeof response === "undefined"){this.props.history.push("/login")} 
        else if (response.status == 403){
            this.props.history.push("/");
        }
        const body = response;
        this.setState({
            users: body,
        });
    }
    
    async give(event){
        const userNameRequest = this.state.userNameRequest;
        userNameRequest.userName=event.target.value;

        await fetch('/users', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userNameRequest),
        });
        const response = await fetch('/users').then(response => response.json())                                          
                                                .catch(err => {console.log(err)});
        const body = response;
        this.setState({
            users: body,
        })
        this.props.history.push('/user');
    }
    
    
    render() {
        
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-intro">
                        <h2>Users</h2>
                        <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">User Id:</th>
                                <th scope="col">First Name:</th>
                                <th scope="col">Last Name:</th>
                                <th scope="col">User Role:</th>
                                <th scope="col">Username</th>
                                <th scope="col">Admin Authority</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {this.state.users.map(user =>
                            
                                <tr>
                                <th>{user.id}</th>
                                <th>{user.firstName}</th>
                                <th>{user.lastName}</th>
                                <th>{user.userRole}</th>
                                <th>{user.email}</th>
                                <th>
                                <Button color="primary" value={user.email}
                                                        
                                                        onClick={this.give} >Give</Button>{' '}
                                
                                </th>
                                
                                </tr>
                            
                        )}
                        </tbody>
                        </table>    
                        
                        <Button color="link"><Link to="/">Books</Link></Button>
                        <Button color="link"><Link to="/create">Add Book</Link></Button>
                                      
                    </div>
                </header>
            </div>
        );
    }

}

export default User;
