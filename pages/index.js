import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Slider from "react-slick";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Navbar from "../components/Navbar.js";
import Join from "../components/Join.js";
import SignIn from "../components/SignIn.js";
import { compose, withProps, withStateHandlers } from "recompose";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
//
// var global = require("global");
// var document = require("global/document");
// var window = require("global/window");

import {isMobile} from 'react-device-detect';

import { StyleSheet, css } from 'aphrodite';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Config } from "../config.js";

const fancyMapStyles = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#f22626"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","stylers":[{"color":"#ffeb3b"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f2b926"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];


class Index extends Component {

    constructor(props) {
      super(props);
      this.toggleSignIn = this.toggleSignIn.bind(this);
      this.video = React.createRef();
      this.state = {
        signIn: 'off',
        videoUrl: '',
      }
    }

    componentDidMount() {
      const userData = JSON.parse(localStorage.getItem('user_data'));

      if (userData) {
        this.setState({
          auth: (userData.token) ? true : false,
          user: userData,
        });
      }
    }


    toggleSignIn(e) {
      var signIn = this.state.signIn;
      if (signIn === 'off') {
        this.setState({
          signIn: 'on'
        });
      } else {
        this.setState({
          signIn: 'off'
        });
      }
    }

    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
        );
        const page = await pageRes.json();

        const postsRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/posts?_embed`
        );
        const posts = await postsRes.json();
        const pagesRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`
        );
        const pages = await pagesRes.json();
        const eboardsRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/eboards?_embed`
        );
        const eboards = await eboardsRes.json();
        const routesRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/routes?_embed`
        );
        const routes = await routesRes.json();

        return { page, posts, pages, eboards, routes };
    }

    render() {

        const boardsHeader = 'WYBIERZ ELEKTRODECHĘ:';

        const routesHeader = 'SUGEROWANE TRASY:';

        const eboardsSlickSettings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: (isMobile) ? 1 : 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15%'
        };

        const routesSlickSettings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: (isMobile) ? 1 : 3,
          slidesToScroll: 1,
        };

        const welcomePagesContStyle = {
          backgroundImage: (isMobile) ? 'url(' + this.props.options.acf.welcome_pages_background + ')' : ''
        }

        const boardsRoutesStyle = {
          backgroundImage: 'url(' + this.props.options.acf.boards_routes_background + ')'
        }

        const newsletterStyle = {
          backgroundImage: 'url(' + this.props.options.acf.newsletter_background + ')'
        }

        const eboards = this.props.eboards.map((post, index) => {
            return (
              <div className="eboard" key={index}>
                <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}/>
                <h1 className="boardHeadingStyle">{post.title.rendered}</h1>
                <div className="boardCopyStyle" dangerouslySetInnerHTML={{
                      __html: post.content.rendered
                    }}/>
                <Join onClick={this.toggleSignIn} content="Wybierz" background="#f22626" color="#fff" size="1.2em"/>
              </div>
            );
        });
        const routes = this.props.routes.map((post, index) => {
            return (
              <div className="route" key={index}>
                <h1 className="routeHeadingStyle">{post.title.rendered}</h1>
                <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}/>
                <div className="boardCopyStyle" dangerouslySetInnerHTML={{
                      __html: post.content.rendered
                    }}/>
                <Join onClick={this.toggleSignIn} content="Wybierz" background="#F2B926" color="#fff" size="1.5em"/>
              </div>
            );
        });
        const pages = this.props.pages.map((page, index) => {
          if (page.parent !== 0) {
            if (index%2 === 0 && !isMobile) {
              return (
                  <div className="welcomePageStyle" key={index}>
                    <div className="welcomePageSideStyle">
                    <h1 style={{fontFamily: 'Oswald', color: '#f22626', fontSize: '2.2em', textAlign: 'right', flex: '0 0 100%'}}>{page.title.rendered}</h1>
                    <div style={{textAlign: 'right'}} dangerouslySetInnerHTML={{
                          __html: page.content.rendered
                        }}/>
                    </div>
                    <div className="welcomePageSideStyle">
                    <img style={{width: '100%'}}src={page._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}/>
                    </div>
                  </div>
              );
            } else {
              return (
                  <div className="welcomePageStyle" key={index}>
                    <div className="welcomePageSideStyle">
                    <img style={{width: '100%'}}src={page._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}/>
                    </div>
                    <div className="welcomePageSideStyle">
                    <h1 style={{fontFamily: 'Oswald', fontSize: '2.2em', color: '#f22626'}}>{page.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{
                          __html: page.content.rendered
                        }}/>
                    </div>
                  </div>
              );
            }
          }
        });

        const StyledMapWithAnInfoBox = compose(
          withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8nArJqoE1l-Inx3IIVXD6AhEsynpuY-4&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
            center: { lat: parseFloat(this.props.options.acf.adres.lat), lng: parseFloat(this.props.options.acf.adres.lng) },
          }),
          withStateHandlers(() => ({
            isOpen: false,
          }), {
            onToggleOpen: ({ isOpen }) => () => ({
              isOpen: !isOpen,
            })
          }),
          withScriptjs,
          withGoogleMap
        )(props =>
          <GoogleMap
            defaultZoom={14}
            defaultCenter={props.center}
            defaultOptions={{ styles: fancyMapStyles }}
          >
            <InfoBox
              defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
            <div style={{ backgroundColor: `#111`, padding: `12px`, borderRadius: '0px 10px 10px 10px' }}>
              <div style={{ fontSize: `16px`, color: `#fff`, fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
                <img style={{width: '120px'}} src={this.props.options.acf.main_logo}/>
                {this.props.options.acf.adres.address}
              </div>
            </div>
            </InfoBox>
            <Marker
              position={{ lat: 52.2298089, lng: 21.0141863 }}
              onClick={props.onToggleOpen}
            >
              {props.isOpen && <InfoBox
                onCloseClick={props.onToggleOpen}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
              >
                <div style={{ backgroundColor: `#111`, padding: `12px`, borderRadius: '10px' }}>
                  <div style={{ fontSize: `16px`, color: `#fff`, fontFamily: 'Roboto, sans-serif' }}>
                    <img src={this.props.options.acf.main_logo}/>
                    {this.props.options.acf.adres.address}
                  </div>
                </div>
              </InfoBox>}
            </Marker>
          </GoogleMap>
        );

        return (
            <Layout options={this.props.options}>
                <Navbar menu={this.props.headerMenu} logo={this.props.options.acf.main_logo} />
                <div className="heading">
                  <div className="headerVideo" style={{overflow: 'hidden'}}>
                    {
                      (!isMobile) ?
                      <video
                          width="815"
                          className="headerImageStyle"
                          autoPlay="autoPlay"
                          muted
                          loop
                      >
                      <source src={this.props.options.acf.main_page_video} type="video/mp4" />
                    </video>
                      :
                      <img src={this.props.options.acf.main_page_image} className="headerImageStyle"/>
                    }
                  </div>
                  <div className="header-content headerStyle">
                    <h1 className="h1headerStyle">{this.props.page.title.rendered}</h1>
                    <Join onClick={this.toggleSignIn} content={(!this.state.auth) ? 'Dołącz' : 'Zarezerwuj jazdę'} background="#f22626" color="#fff" size="2em"/>
                  </div>
                </div>
                <div className="welcome-pages welcomePagesContStyle" style={welcomePagesContStyle}>
                  {pages}
                </div>
                <div className="container boards-routes boardsRoutesStyle"  style={boardsRoutesStyle}>
                  <h1 title={boardsHeader} className="bigAssRedHeader redOutline">{boardsHeader}</h1>
                  <Slider {...eboardsSlickSettings}>
                    {eboards}
                  </Slider>
                  <h1 title={routesHeader} className="bigAssRedHeader redOutline">{routesHeader}</h1>
                  <Slider {...routesSlickSettings}>
                    {routes}
                  </Slider>
                </div>
                <StyledMapWithAnInfoBox />
                <div className="newsletterStyle" style={newsletterStyle}>
                  <h1 style={{fontFamily: 'Oswald, sans-serif', color: "#fff"}}>CHCESZ WIĘCEJ?</h1>
                  <div className="newsletterFormStyle">
                    <input className="newsletterInputStyle" name="newsletter-email" type="email" placeholder="wpisz adres email"/>
                    <button className="newsletterButtonStyle">DOŁĄCZ DO LISTY</button>
                  </div>
                </div>
                <SignIn signIn={this.state.signIn} onClick={this.toggleSignIn}/>
            </Layout>
        );
    }
}

export default PageWrapper(Index);
