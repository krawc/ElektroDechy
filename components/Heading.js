import React, { Component } from "react";
import {isMobile} from 'react-device-detect';
import Join from "../components/Join.js";


let h1headerStyle = {
  fontSize: '4em',
  color: '#fff',
  margin: (isMobile) ? '1em auto' : 'auto',
  fontSize: (isMobile) ? '2.5em' : '4em',
  textAlign: 'center',
  maxWidth: (isMobile) ? 'initial' : '60vw'
}

const headerImageStyle = {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
};

const headerStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Oswald',
  textTransform: 'uppercase',
  flexDirection: 'column',
  overflow: 'hidden'
}

const buttonStyle = {
  padding: '6px 12px',
  fontFamily: 'Lobster',
  color: '#fff',
  fontSize: '1.2em',
  background: '#f22626',
  borderRadius: '3px',
  border: '0px'
}

class Heading extends Component {

    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }

    onClick() {
      this.props.onButtonClick();
    }

    render() {
      return(
        <div className="heading">
          <div className="headerVideo" style={{overflow: 'hidden'}}>
            {
              (this.props.videoUrl && !isMobile) ?
              <video
                  width="815"
                  style={headerImageStyle}
                  autoPlay="autoPlay"
                  muted
                  loop
              >
              <source src={this.props.videoUrl} type="video/mp4" />
            </video>
              :
              <img src={this.props.image} style={headerImageStyle}/>
            }
          </div>
          <div className="header-content" style={headerStyle}>
            <h1 style={h1headerStyle}>{this.props.header}</h1>
            <Join onClick={this.onClick} content="Dołącz" background="#f22626" color="#fff" size="2em"/>
          </div>
        </div>
      )
    }
}

export default Heading;
