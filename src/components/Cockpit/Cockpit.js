import React, { useEffect, useRef, useContext } from 'react';
import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context"


const cockpit = (props) => {

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

   /* useEffect((() => {
        console.log("cockpit useEffect");
        setTimeout(() => {
            alert('Saved data');
        }, 1000);
        return () => {
            console.log("cockpit useEffect CLEANUP");
        }
    }), [props.persons]);*/

    useEffect((() => {
        console.log("cockpit useEffect");
        toggleBtnRef.current.click();
        return () => {
            console.log("cockpit useEffect BTN click");
        }
    }), []);

    const assignedClasses = [];
    if (props.personsLength < 3) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength < 2) {
        assignedClasses.push(classes.bold);
    }

    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>It is working</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default React.memo(cockpit);