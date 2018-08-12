import React, { Component } from "react";
import { Config } from "../config.js";
import Router from 'next/router';
import {isMobile} from 'react-device-detect';
import Switch from "react-switch";
import Link from "next/link";


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onclick = this.onclick.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.state = {
      validatingEmail: 'no',
      entryAllowed: '',
      validatingForm: 'no',
      validatingRegister: false,
      response: '',
      errorMessage: ''
    }
  }

  handleChange(e) {
    var check = (this.state.validatingRegister === true) ? false : true;
    this.setState({
      validatingRegister: check
    })
  }

  signInSubmit(e){

    e.preventDefault();

    var submit = {
      username: e.target.email.value,
      useremail: e.target.email.value,
      password: e.target.password.value,
      role: 'customer'
    }

    var signInType = this.state.entryAllowed;

    this.setState({
      validatingForm: 'yes'
    });

    if (signInType === 'login') {

      fetch(`${Config.apiUrl}/wp-json/jwt-auth/v1/token`, {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        method: 'POST',
        body: JSON.stringify(submit),
      })
      .then(response => {
         if (response.ok) {
           return response.json()
           .then(function(response) {
             localStorage.setItem('user_data', JSON.stringify(response));
             if (response.token) {
               Router.push(`${Config.homeUrl}/page/konto`)
             }
           });
         } else {
           this.setState({
             validatingForm: 'no',
             errorMessage: 'Niepoprawne dane logowania.'
           });
         }
       }, function(error) {
         this.setState({
           validatingForm: 'no',
           errorMessage: 'Niepoprawne dane logowania.'
         })
       });

    } else if ((signInType === 'register') && (this.state.validatingRegister === true)) {

      fetch(`${Config.apiUrl}/wp-json/postlight/v1/users/register`, {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        method: 'POST',
        body: JSON.stringify(submit),
      })
      .then(response => {
          // console.log(response);
         if (response.ok) {
           return response.json()
           .then(function(response) {
             localStorage.setItem('user_data', JSON.stringify(response));
             if (response.token) {
               Router.push(`${Config.homeUrl}/page/konto`)
             }
           });
         } else {
           this.setState({
             validatingForm: 'no',
             errorMessage: 'Wystąpił błąd. Spróbuj jeszcze raz.'
           });
         }
       }, function(error) {
         this.setState({
           validatingForm: 'no',
           errorMessage: 'Wystąpił błąd. Spróbuj jeszcze raz.'
         })
       });
    } else {
      this.setState({
        errorMessage: 'Wystąpił błąd. Spróbuj jeszcze raz.'
      });
      return null;
    }
  }

  validateEmail(e){
    e.preventDefault();
    var submit = {
      email: e.target.value
    }
    var entryAllowed = this.state.entryAllowed;

    this.setState({
      validatingEmail: 'yes'
    })

    fetch(`${Config.apiUrl}/wp-json/postlight/v1/users/validate`, {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
      method: 'POST',
      body: JSON.stringify(submit),
    })
    .then(response => {
      this.setState({
        validatingEmail: 'done'
      });
       if (response.ok) {
         return response.json()
         .then(function(response) {
           if (response.status === 'OK') {
             entryAllowed = 'register';
           } else if (response.status === 'This user email already exists.') {
             entryAllowed = 'login';
           } else {
             entryAllowed = 'none';
           }
         });
       } else {
         var errorMsg = '';
         return response.json()
           .then(function(err) {
            errorMsg = err.message;
           });
         this.setState({
           errorMessage: errorMsg
         });
       }
     })
     .then (response => {
       this.setState({
         entryAllowed: entryAllowed,
         validatingRegister: (entryAllowed === 'login') ? true : false
       });
     });
  }

  onclick(e) {
    this.props.onClick(e);
  }

  render() {

    const containerStyle = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: '0',
      left: '0',
      transition: 'all 0.3s ease-in-out',
      opacity: (this.props.signIn === 'on' ? '1' : '0'),
      pointerEvents: (this.props.signIn === 'on' ? 'all' : 'none'),
      zIndex: '2'

    }

    const overlayStyle = {
      width: '100%',
      height: '100%',
      background: (this.props.overlayCover === "true" ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)'),
      position: 'absolute'
    }

    const popupStyle = {
      position: 'absolute',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      margin: 'auto',
      maxWidth: (isMobile) ? '90vw' : '25em',
      background: '#fff',
      borderRadius: '10px',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      maxHeight: '280px',
      zIndex: '999'
    }

    const headerStyle = {
      fontFamily: 'Lobster, sans-serif',
      textAlign: 'center',
      flex: '0 0 100%',
      margin: '0.5em 0'
    }

    const formStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0em 2em 2em',
      justifyContent: 'center'
    }

    const inputStyle = {
      flex: '0 0 100%',
      fontSize: '15px',
      marginBottom: '0.5em',
      padding: '0.5em',
      fontFamily: 'Roboto, sans-serif'
    }

    const buttonStyle = {
      background: ((this.state.entryAllowed !== '') && (this.state.entryAllowed !== 'none') && (this.state.validateEmail !== 'yes') && (this.state.validatingRegister !== false)) ? '#f22626' : '#999',
      borderRadius: '4px',
      color: '#fff',
      fontFamily: 'Oswald, sans-serif',
      fontSize: '16px',
      marginTop: '1em',
      transition: 'background: 0.2s linear',
      pointerEvents: ((this.state.entryAllowed !== '') && (this.state.entryAllowed !== 'none') && (this.state.validateEmail !== 'yes') && (this.state.validatingRegister !== false)) ? 'all' : 'none'
    }

    const circleStyle = {
      animation: 'rotating 2s linear infinite',
      position: 'absolute',
      right: '1.5em',
      lineHeight: '2em',
      fontSize: '1.2em'
    }

    const hintStyle = {
      fontFamily: 'Roboto, sans-serif',
      marginBottom: '0.5em',
      transition: 'height 0.2s linear',
      overflow: 'hidden',
      height: (this.state.entryAllowed === '') ? '0em' : '1.5em',
      color: '#ff0000'
    }

    const switchContStyle = {
      gridColumn: '1/4',
      display: 'flex',
      justifyContent: 'center',
      color: '#111',
      margin: '0.3em 0em'
    }

      return(
        <div style={containerStyle} className={"popup " + (this.props.signIn === 'on' ? 'toggled-off' : 'toggled-on') }>
          <div style={overlayStyle} onClick={this.onclick} />
          <div style={popupStyle}>
          <h2 style={headerStyle}>Ruszamy!</h2>
          <form style={formStyle} onSubmit={this.signInSubmit}>
            <input style={inputStyle} type="email"  name="email" onBlur={this.validateEmail} placeholder='Adres email'/>
              {(this.state.validatingEmail === 'yes') ? <i style={circleStyle} className="ion ion-load-d"></i> : ''}
            <input style={inputStyle} type="password" name="password" placeholder='Hasło'/>
            <p style={hintStyle}>{this.state.errorMessage}</p>
              {
                (this.state.entryAllowed === 'register')
                ? <label htmlFor="normal-switch" style={switchContStyle}>
                  <span style={{order: '2', margin: '0em 0em 0em 0.5em', fontSize: '16px', fontFamily: 'Oswald, sans-serif'}}>Akceptuję <Link href='/page/regulamin'>Regulamin</Link> i <Link href='/page/polityka-prywatnosci'>Politykę Prywatności</Link></span>
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.validatingRegister}
                    id="accept-terms"
                  />
                </label>
                : ''
              }
            <input style={buttonStyle} type="submit" value="Zaloguj / Zarejestruj" title="Zaloguj / Zarejestruj"></input>
          </form>
          {
            (this.state.validatingForm === 'yes')
            ? <div style={{position: 'absolute', width: '100%', height: '100%', background: '#fff', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <i style={{animation: 'rotating 2s linear infinite', position: 'absolute', top: 'calc(50% - 25px)', left: 'calc(50% - 25px)', fontSize: '50px'}} className="ion ion-load-d"></i>
            </div>
            : ''
          }
          </div>
        </div>
      )
    }
  }


export default SignIn;
