import React, {Component, useContext} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import witClass from '../../../hoc/withClass'
import AuthContext from "../../../context/auth-context"

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        // console.log(this.authContext.authenticated);
    }

    render() {
        console.log("Person.js - rendering...");
        return (
            <React.Fragment>
                <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
                </AuthContext.Consumer>
                <p key="i1" onClick={this.props.click}>I'm {this.props.name}. Age is {this.props.age}</p>,
                <p key="i2" ><b>{this.props.children}</b></p>,
                <input key="i3"
                       // ref={(inputEl) => {this.inputElement = inputEl}}
                        ref={this.inputElementRef}
                       type="text"
                       onChange={this.props.changed} value={this.props.name}/>
            </React.Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default witClass(Person, classes.Person);