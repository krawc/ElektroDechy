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
import Dashboard from '../components/Dashboard.js';
import Order from '../components/Order.js';
import {isMobile} from 'react-device-detect';



class Post extends Component {

    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();
        return { slug, post };
    }

    constructor(props) {
      super(props);
      this.state = {
        auth: false,
        user: null,
        loadingDone: false,
        points: null
      }
    }

    componentDidMount() {

      const userData = JSON.parse(localStorage.getItem('user_data'));

      if (userData) {
        this.setState({
          auth: (userData.token) ? true : false,
          user: userData,
          loadingDone: true,
        });
        fetch(`${Config.apiUrl}/wp-json/acf/v3/users/${userData.ID}`, )
        .then(response => {
          if (response.ok) {
            return response.json()
            .then(response => {
              this.setState({
                points: response
              });
            });
          }
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
          padding: '1em'
        }

        const copyStyle = {
          background: '#fff',
          maxWidth: '50em',
          margin: 'auto',
          padding: (!isMobile) ? '3em': '1em',
          boxShadow: '0 2px 10px 5px rgba(0, 0, 0, 0.24)',
          fontFamily: 'Roboto, sans-serif',
          lineHeight: '1.5'
        }


          if (this.props.slug === 'konto') {
            return (
                <Layout options={this.props.options} style={layoutStyle}>
                    <Navbar menu={this.props.headerMenu}  logo={this.props.options.acf.main_logo} />
                    <Dashboard options={this.props.options}/>
                </Layout>
            );
          } else if (this.props.slug === 'order'){
            return (
                <Layout options={this.props.options} style={layoutStyle}>
                    <Navbar menu={this.props.headerMenu}  logo={this.props.options.acf.main_logo} />
                    <Order productId={this.props.options.acf.appointment_product_id}/>
                </Layout>
            );
          } else {
              return (
                <Layout options={this.props.options} style={layoutStyle}>
                  <Navbar menu={this.props.headerMenu}  logo={this.props.options.acf.main_logo} />
                  <div className="wrapper" style={layoutStyle}>
                      <h1 style={h1headerStyle}>{this.props.post.title.rendered}</h1>
                      <div style={copyStyle}>
                        <div
                          dangerouslySetInnerHTML={{
                              __html: this.props.post.content.rendered
                          }}
                          />
                      </div>
                  </div>
                </Layout>
              );
          }
    }
}

export default PageWrapper(Post);
