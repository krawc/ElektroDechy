import React, { Component } from "react";

const buttonStyle = {
  borderRadius: '50%',
  background: '#f2b926',
  color: '#111',
  width: '40px',
  height: '40px',
  margin: '20px 10px',
  lineHeight: '40px'
};

class Social extends Component {


  createTable = () => {

    let table = [];

    for (const [key, value] of Object.entries(this.props.links)) {
      table.push (
        <div style={buttonStyle}>
          <a style={{color: '#111', fontSize: '24px'}} href={value}>
            <i className={"ion-social-" + key}></i>
          </a>
        </div>
      )
    }
    return table;
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
      {this.createTable()}
      </div>
    )
  }
}

export default Social;
