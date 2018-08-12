import React, { Component } from "react";
import InlineSVG from 'svg-inline-react';

class AccountInfo extends Component {

  render() {

    const thunderHeight = (this.props.points > 1000) ? '100' : Math.abs((this.props.points / 10) - 100);

    const thunder = '<svg width="100%" height="100%" viewBox="0 0 361 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><rect width="361" height="400" fill="#111111"/><rect width="400" height="400" fill="#111111"/><path d="M215.748 0H117.089L23.8515 171.373H84.5644L0 346L219 106.295H144.193L215.748 0Z" transform="translate(71 27)" fill="#fff"/><path d="M215.748 0H117.089L23.8515 171.373H84.5644L0 346L219 106.295H144.193L215.748 0Z" transform="translate(71 27)" fill="#F2B926" style="clip-path: polygon(0% 100%, 100% 100%, 100% ' + thunderHeight + '%, 0% ' + thunderHeight + '%)"/></g><defs><clipPath id="clip0"><rect width="361" height="400" fill="white"/></clipPath></defs></svg>';

    const wrapperStyle = {
      background: '#111',
      maxWidth: '600px',
      display: 'flex',
      margin: '2em auto 0em',
      borderRadius: '15px',
      overflow: 'hidden'
    }

    let level = '';

    var levels = this.props.levels;
    var currentLevel = '';

    function* values(levels) {
        for (let prop of Object.keys(levels)) // own properties, you might use
                                           // for (let prop in obj)
            yield levels[prop];
    }
    let arr = Array.from(values(levels));

    var result = arr.filter(obj => {
      return obj.level_xp_number <= this.props.points;
    })

    if (result) {
      currentLevel = result[result.length - 1].level_name;
    }

    return (
      <div style={wrapperStyle}>
        <div style={{flex: '0 0 30%', position: 'relative', background: '#111'}}>
          <InlineSVG src={thunder} />
        </div>
        <div style={{flex: '0 0 70%'}}>
          <h3 style={{color: '#ccc', fontFamily: 'Oswald, sans-serif', margin: '1em 0 0'}}>{this.props.user.user_email}</h3>
          <h2 style={{color: '#fff', fontFamily: 'Oswald, sans-serif', margin: '0'}}><span style={{fontSize: '2.5em'}}>{this.props.points}</span><span style={{fontSize: '1.5em'}}> XP</span></h2>
          <h2 style={{color: '#fff', fontFamily: 'Oswald, sans-serif', margin: '0px 0px 15px', textTransform: 'uppercase'}}>LVL: {currentLevel}</h2>
        </div>
      </div>
    )
  }

}

export default AccountInfo;
