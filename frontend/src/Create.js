import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import toastr from 'toastr';
import './toastr.css';


class Create extends Component {


    constructor(props) {
        super(props);
        this.state = {
            customerDto: {
                name: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
       
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let customerDto = { ...this.state.customerDto };
        customerDto[name] = value;
        this.setState({ customerDto });
    }


    async handleSubmit(event) {
        event.preventDefault();
        const customerDto = this.state.customerDto;

        let response = await fetch('/customer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerDto),
        });
        if(!response.ok){
            toastr["error"]("An error occured while creating customer")
        }
        else{
            toastr["success"]("Customer created successfully")
            this.props.history.push('/');
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
                    <div className="Create-Customer">
                        <h2>Create Customer</h2>


                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <div style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                <div className="form-group form-inline">
                                    <Label style={{marginRight: '50px'}} for="name">Cutomer Name</Label>
                                    <Input type="text" name="name" id="name" value={this.state.customerDto.name}
                                        onChange={this.handleChange} autoComplete="name" />
                                </div>
                                <div className="form-group form-inline">
                                    <Label style={{marginRight: '10px'}} for="surname">Cutomer Surname</Label>
                                    <Input type="text" name="surname" id="surname" value={this.state.customerDto.surname}
                                        onChange={this.handleChange} autoComplete="surname" />
                                </div>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Create</Button>{' '}
                            </FormGroup>

                        </Form>

                    </div>
                </header>
            </div>
        );
    }

}

export default Create;
