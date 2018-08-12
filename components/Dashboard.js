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
import Placeholder from '../components/Placeholder.js';
import Link from "next/link";



class Dashboard extends Component {

    constructor(props) {
      super(props);
      this.getFormatDate = this.getFormatDate.bind(this);
      this.handlePoints = this.handlePoints.bind(this);
      this.state = {
        auth: false,
        user: null,
        loadingDone: false,
        points: 0,
        orders: null
      }
    }

    handlePoints(response) {
      let points = 0;
      for(var i = 0; i < response.length; i++) {
        let singlePoints = response[i]['products']['xp'];
        points += parseInt(singlePoints);
      }
      this.setState({
        points: points
      });
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
          loadingDone: true,
        });
        fetch(`${Config.apiUrl}/wp-json/postlight/v1/users/user_orders?id=${userData.ID}`)
        .then(response => {
          if (response.ok) {
            return response.json()
            .then(response => {
              this.setState({
                orders: response
              });
              // console.log(response);
              this.handlePoints(response);
            });
          }
        });
      } else {
        this.setState({
          loadingDone: true,
        });
      }
    }

    render() {

        const layoutStyle = {
          background: 'radial-gradient(494.00px at 50% 50%, #3C3C3C 0%, #111111 100%)',
          padding: '100px 20px',
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
          margin: '0.5em auto 0em',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: '15px',
          background: '#f2b931',
          fontFamily: 'Oswald, sans-serif',
          cursor: 'pointer'
        }

        const purchaseItemStyles = {
          maxWidth: '560px',
          margin: '20px auto',
          display: 'flex',
          background: '#111',
          borderRadius: '15px',
          padding: '20px',
          fontFamily: 'Oswald, sans-serif',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          flexDirection: 'row',
        }

        const h2Style = {
          margin: '0em 0.2em',
          color: '#fff'
        }

          const orderItems = this.state.orders ? this.state.orders.map((item, index) => {
            var date = item.booked_start_date;
            var hour = item.booked_start_time;
            var monthSlice = date.slice(4,6);
            var daySlice = date.slice(6,8);
            var hourSlice = hour.slice(0,5);
            return (
              <div style={purchaseItemStyles}>
                <div>
                  <h2 style={h2Style}>{daySlice + '/' + monthSlice + ', ' + hourSlice}</h2>
                </div>
                <div>
                  <h2 style={h2Style}>{item.products.xp + ' XP'}</h2>
                </div>
              </div>
            );
          })
          : '';


      if (this.state.auth) {
        if (this.state.orders) {
          return (
            <div className="wrapper" style={layoutStyle}>
                <h1 style={h1headerStyle}>Witaj!</h1>
                <AccountInfo user={this.state.user} points={this.state.points} levels={this.props.options.acf.levels}/>
                <h1 style={h1headerStyle}>Twoje jazdy:</h1>
                {orderItems}
                <Link href='order'>
                <div style={addNewStyle}>
                  <a><h2><i class="ion ion-plus"></i> ZAMÓW NOWĄ JAZDĘ</h2></a>
                </div>
                </Link>
            </div>
          );
        } else {
          return ( <Placeholder/> );
        }
      } else {
        return (
          <SignIn signIn='on' onClick='on' overlayCover="true"/>
        );
      }
    }
}

export default Dashboard;
