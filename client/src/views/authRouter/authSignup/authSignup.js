import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class signupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            auto: false,
            errors: {
                email: ''
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email = !validEmailRegex.test(value) ? 'Not a Valid Email' : '';
                break;
        }

        this.setState({ errors, [name]: value })

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (validateForm(this.state.errors)) {
            window.location.replace(`http://localhost:3000/auth/signup/callback?email=${this.state.email}&username=${this.state.username}&password=${this.state.password}&auto=${this.state.auto}`);
        }
    };

    render() {
        return (
            <div className="row row-container">
                <div className="col-12">
                    <h1><span className="fa fa-sign-in"></span>Sign Up</h1>
                </div>
                <div className="col-sm-6 col-sm-offset-3">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={7}>
                                <Input type="email" id="email" name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col md={3}>
                                {this.state.errors.email.length > 0 &&
                                    <Alert color="danger">
                                        {this.state.errors.email}
                                    </Alert>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="username" md={2}>Username</Label>
                            <Col md={7}>
                                <Input type="username" id="username" name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange} />
                            </Col>
                            <Col md={3}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="password" md={2}>Password</Label>
                            <Col md={7}>
                                <Input type="password" id="password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="auto" md={2}>Auto?</Label>
                            <Col md={7}>
                                <Input type="checkbox" id="auto" name="auto"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type='submit' color="warning">
                                    Sign Up
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Col md={{ size: 10, offset: 2 }}>
                        <NavLink to="/auth">Login</NavLink>
                    </Col>
                </div>

            </div>
        );
    }
}

export default signupComponent;