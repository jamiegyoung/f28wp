import React, { useRef, useState, useEffect, setState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginScreen.css'


class LoginScreen extends React.Component {
    constructor(props) {

      super();
      this.state={

        username:'',

        password:''

        }

      }
      
      submitEntry(click) {

        // ** TODO **: ADD SQL integration here.
        click.preventDefault();
        // IF PASSWORD AND USER MATCH DB, GO TO /GAME ELSE LOG AND ALERT.
        const history = useHistory();
        history.push('/game'); 
      }
    
      render() { // Rendering a basic barebone form using only react and no libraries only to test for functionality.
        return ( // username and password text and input field
          <form>
            
            <label> 

              Username: 
              <input type = "text" onChange = { (entry, userInput) => this.setState({username: userInput}) } />

            </label>
            
            <label> 

              Password:  
              <input type = "password" onChange = { (entry, passInput) => this.setState({password: passInput}) } />

            </label>

            <button type = "submit" onClick={ (event) => this.submitEntry(event) } >
                Login
            </button>
          </form>

        );
      }
    }
 export default LoginScreen;
