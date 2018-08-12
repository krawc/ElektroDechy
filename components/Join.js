import React, { Component } from "react";
import Link from "next/link";


class Join extends Component {

  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.state = {
      auth: false
    }
  }

  onclick(e) {
    this.props.onClick(e);
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

  render() {

    const buttonStyle = {
      background: this.props.background,
      borderRadius: '8px',
      padding: '6px 8px',
      margin: '2em 0em 2em',
      border: '0px',
      cursor: 'pointer'
    };

    const linkStyle = {
      fontSize: this.props.size,
      color: this.props.color,
      fontFamily: 'Lobster, sans-serif',
      textDecoration: 'none'
    };

    if (!this.state.auth) {
      return (
        <button style={buttonStyle} onClick={this.onclick}>
          <a style={linkStyle} href="#login">
            {this.props.content}
          </a>
        </button>
      )
    } else {
      return (
        <Link href='page/order'>
          <button style={buttonStyle}>
            <p style={linkStyle}>
              {this.props.content}
            </p>
          </button>
        </Link>
      )
    }
  };
}

export default Join;
