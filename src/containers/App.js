import React, {Component} from 'react';
import styled from 'styled-components';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilliary';
import AuthContext from '../context/auth-context';

const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
        color: black;
    }
`;

class App extends Component {

    constructor(props) {
        super(props);
        console.log("App.js - constructor")

    }

    static getDerivedStateFromProps(props, state) {
        console.log("App.js - getDerivedStateFromProps", props);
        return state;
    }

    componentDidMount() {
        console.log("App.js - componentDidMount");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("App.js - shouldComponentUpdate");
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("App.js - componentDidUpdate");
    }

    state = {
        persons: [
            {id: 'asd123', name: 'Aleks', age: 30},
            {id: 'adfg43', name: 'Petr', age: 66},
            {id: 'hrt43', name: 'Oma', age: 16}
        ],
        showPersons: false,
        changeCounter: 0,
        authenticated: false
    };

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            };
        });
    };

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    loginHandler = () => {
        console.log("click login");
        this.setState({authenticated: true});
    };

    render() {
        console.log("App.js - render");
        let persons = null;
        if (this.state.showPersons) {
            persons =
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangeHandler}
                    isAuthenticated={this.state.authenticated}
                />;
        }


        return (
            <Aux>
                <AuthContext.Provider value={{
                    authenticated: this.state.authenticated,
                    login: this.loginHandler
                }}>
                    <Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonHandler}
                    />
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
};

export default withClass(App, classes.App);
