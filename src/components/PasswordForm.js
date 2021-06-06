import React, {Component} from 'react';
import axios from "axios";

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'password': '',
            'confirmPassword': '',
            'passwordErr': '',
            'confirmPasswordErr': '',
            'data': []
        };
    }

    componentDidMount() {
        const apiUrl = 'https://alpha.ubikom.cc:8088';
        let self = this;
        let name = this.props.match.params.name;

        axios.get(apiUrl+'/lookupName',{
            params:{
                name: name
            }
        })
            .then(function (response) {
             /*   console.log(response.data.available);
                console.log(name.length);*/
                if(response.data.available === false){
                    self.props.history.push('/');
                }
            })
            .catch(function (error){
                self.props.history.push('/');
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    keyPressPassword() {
        let password = this.state.password;

        if(password.length >= 6){
            this.setState({'passwordErr' : false});
        }else{
            this.setState({'passwordErr' : true });
        }
    }

    keyPressPasswordConfirm() {
        let password = this.state.password;
        let confirm_pass = this.state.confirmPassword;
        if(password !== confirm_pass){
            this.setState({'confirmPasswordErr' : true});
        }else{
            this.setState({'confirmPasswordErr' : false});
        }
    }

    handleNext() {
        this.props.history.push('/identify/'+this.props.match.params.name+'/'+this.state.password +'/'+this.state.confirmPassword);
    }

    render() {
        return (
            <div>
                <div className="custom-card">
                    <div>
                        <h1 className="card-title">
                            Choose your password
                        </h1>
                        <div className="form-group row">
                            <label className="control-label col-sm-3 mb-10" htmlFor="username">Password:</label>
                            <div className="col-sm-5 mb-10">
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPressPassword.bind(this)}
                                       placeholder="Enter Password"/>
                            </div>

                            <div className="col-sm-offset-3 col-sm-9">
                                {this.state.passwordErr ?
                                    <span className="text-danger">Please lengthen this password to 6 characters or more.</span> : ''}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="control-label col-sm-3 mb-10" htmlFor="username">Confirm Password:</label>
                            <div className="col-sm-5 mb-10">
                                <input type="password"
                                       className="form-control"
                                       name="confirmPassword"
                                       value={this.state.confirmPassword}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPressPasswordConfirm.bind(this)}
                                       placeholder="Enter Confirm Password"/>
                            </div>
                            <div className="col-sm-3 mb-10">
                                <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleNext.bind(this)}
                                        disabled={( this.state.password.length >= 6 && this.state.confirmPassword.length >=6 ) &&
                                        (this.state.password === this.state.confirmPassword ) ? false : true }>
                                    Next
                                </button>
                            </div>
                            <div className="col-sm-offset-3 col-sm-9">
                                {this.state.confirmPasswordErr ?
                                    <span className="text-danger">Password doesn't match</span> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordForm;