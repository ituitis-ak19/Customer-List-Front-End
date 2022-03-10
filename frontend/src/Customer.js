import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Button, Form } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import toastr from 'toastr';
import './toastr.css';



class Customer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            }
            this.deleteCustomer = this.deleteCustomer.bind(this);
        };


    async componentDidMount() {
        const response = await (await fetch('http://localhost:8080/customer')).json();
        const body = response.body
        this.setState({
            customers:body,
        });
    }

    async deleteCustomer(event) {
        event.preventDefault();
        const customerId = event.target.name.value; 
        let response = await fetch('/customer/'+customerId, {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            toastr["success"]("Customer deleted successfully")
            this.componentDidMount();
            }
        else{
            toastr["error"]("An error occured while deleting customer")
        }
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
        }
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <div className="Customer-Div">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Customer Id:</th>
                                    <th scope="col">Name:</th>
                                    <th scope="col">Surname:</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.customers.map(customer =>

                                    <tr>
                                        <th>{customer.id}</th>
                                        <th>{customer.name}</th>
                                        <th>{customer.surname}</th>
                                        <th></th>
                                        <th>
                                            <Form onSubmit={this.deleteCustomer}>
                                                <input type="hidden" name="name" value={customer.id}></input>
                                                <Button color="primary" type="submit">Delete</Button>{' '}
                                            </Form>

                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Button color="link"><Link to="/Create">Create User</Link></Button>
                    </div>
                </header>
            </div>
        );
    }

}

export default Customer;
