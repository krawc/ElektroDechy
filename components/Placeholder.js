import React, { Component } from "react";
import InlineSVG from 'svg-inline-react';

class Placeholder extends Component {

  render() {

    const thunder = '<svg width="100%" height="100%" viewBox="0 0 361 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><rect width="361" height="400" fill="transparent"/><rect width="400" height="400" fill="transparent"/><path d="M215.748 0H117.089L23.8515 171.373H84.5644L0 346L219 106.295H144.193L215.748 0Z" transform="translate(71 27)" fill="black"/><path d="M215.748 0H117.089L23.8515 171.373H84.5644L0 346L219 106.295H144.193L215.748 0Z" transform="translate(71 27)" fill="#F2B926" style="clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); animation: thunder 4s forwards;"/></g><defs><clipPath id="clip0"><rect width="361" height="400" fill="black"/></clipPath></defs></svg>';

    const wrapperStyle = {
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(494.00px at 50% 50%, #3C3C3C 0%, #111111 100%)',
    }

    return (
      <div style={wrapperStyle}>
        <InlineSVG src={thunder}/>
      </div>
    )
  }

}

export default Placeholder;
