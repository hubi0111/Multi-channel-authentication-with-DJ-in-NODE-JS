import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class loginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        axios
            .get('http://localhost:9000/auth/local/callback', {
                params: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(() =>
                this.props.history.push('/profile')
            )
            .catch(err => {
                this.props.history.push('/error')
            });


    };

    render() {
        return (
            <div className="row row-container">
                <div className="col-12">
                    <h1>Login</h1>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="password" md={2}>Password</Label>
                            <Col md={10}>
                                <Input type="password" id="password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div className="col-12">
                <NavLink to="/signup">Signup</NavLink>
                </div>
            </div>
        );
    }
}

export default loginComponent;