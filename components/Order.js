import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Navbar from "../components/Navbar.js";
import { Config } from "../config.js";
import Router from 'next/router';
import {reactLocalStorage} from 'reactjs-localstorage';
import SignIn from "../components/SignIn.js";
import AccountInfo from "../components/AccountInfo.js";
import SchedulerContainer from '../components/SchedulerContainer.js';
import Terms from '../components/Terms.js';
import Payment from '../components/Payment.js';
import Placeholder from '../components/Placeholder.js';
import Link from "next/link";
import StepZilla from 'react-stepzilla';


class Order extends Component {

    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.getFormatDate = this.getFormatDate.bind(this);
      this.state = {
        auth: false,
        user: null,
        loadingDone: false,
        points: null
      }
    }

    onClick(e) {
      this.setState({
        chosenDate: e.target.getAttribute('date'),
        chosenTime: e.target.getAttribute('start_time'),
        chosenWorker: e.target.getAttribute('worker'),
      });
      // console.log(this.state.chosenDate);
    }

    getFormatDate(d) {
      var d = new Date();
      var year = d.getFullYear().toString();
      var month = (d.getMonth() + 1).toString();
      if (month.length === 1) {
        month = '0' + month;
      }
      var day = d.getDate().toString();
      var date = year + month + day;
    }

    componentDidMount() {

      const userData = JSON.parse(localStorage.getItem('user_data'));

      if (userData) {
        this.setState({
          auth: (userData.token) ? true : false,
          user: userData,
        });
        fetch(`${Config.apiUrl}/wp-json/wc/v2/products/${this.props.productId}`, {
          headers: {
             'Authorization': 'Bearer ' + userData.token,
             'Content-Type': 'application/json'
           },
          method: 'GET',
        })
        .then(response => {
          if (response.ok) {
            return response.json()
            .then(response => {
              // console.log(response.price);
              this.setState({
                loadingDone: true,
                product_id: response.id,
                price: response.price,
                price_html: response.price_html,
                product_name: response.name
              });
            });
          }
        });
      } else {
        this.setState({
          loadingDone: true,
        })
      }
    }

    render() {

        const steps =
          (this.state.loadingDone) ?
          [
            {name: 'Wybierz datę i godzinę', component: <SchedulerContainer productId={this.state.product_id} productPrice={this.state.price} onSingleSlotClick={this.onClick}/>},
            {name: 'Zaakceptuj Regulamin', component: <Terms/>},
            {name: 'Płatność', component: <Payment productId={this.state.product_id} productPrice={this.state.price} productPriceHTML={this.state.price_html} chosenDate={this.state.chosenDate} chosenTime={this.state.chosenTime} chosenWorker={this.state.chosenWorker} productName={this.state.product_name} user={this.state.user}/>}
          ] : [];

        const layoutStyle = {
          background: 'radial-gradient(494.00px at 50% 50%, #3C3C3C 0%, #111111 100%)',
          padding: '100px 20px'
        }

        const h1headerStyle = {
          fontSize: '3em',
          color: '#fff',
          fontFamily: 'Lobster, sans-serif',
          textAlign: 'center',
          margin: '1em'
        }

        const addNewStyle = {
          maxWidth: '600px',
          margin: '0.5em auto',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: '15px',
          background: '#f2b931',
          fontFamily: 'Oswald, sans-serif'
        }

      if (this.state.auth) {
          if (this.state.loadingDone) {
            return (
              <div className="wrapper" style={layoutStyle}>
              <h1 style={h1headerStyle}>Zarezerwuj nową trasę</h1>
              {(this.state.loadingDone) && <StepZilla style={{textAlign: 'center'}} steps={steps} backButtonText={"Poprzedni Krok"} nextButtonText={"Następny Krok"}/>}
              </div>
            );
          } else {
            return ( <Placeholder/> );
          }
      } else if (this.state.loadingDone) {
        return (
          <SignIn signIn='on' onClick='on' overlayCover="true"/>
        );
      } else {
        return null;
      }
    }
}

export default Order;
