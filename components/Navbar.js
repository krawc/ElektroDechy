import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";
import { slide as Menu } from 'react-burger-menu';
import  { Redirect } from 'react-router-dom'

const menuStyle = {
    position: 'fixed',
    width: '90%',
    display: 'flex',
    padding: '10px 5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
    zIndex: 9999
}

const logoStyle = {
    width: '100px',
    padding: '10px'
}

const linkStyle = {
    marginRight: 15,
    fontFamily: 'Oswald, sans-serif',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.2em',
    marginBottom: '0.6em',
    cursor: 'pointer'
};

class Navbar extends Component {
  constructor() {
      super();
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        auth: false,
        user: {},
        isOpen: false,
      }
  }

  handleClick() {
    this.setState({
      isOpen: false
    });
  }

  handleLogoutClick() {
    this.handleClick();
    localStorage.removeItem("user_data");
    this.props.history.push(`${Config.homeUrl}`);
    //Router.push(`${Config.homeUrl}`);
  }

  getSlug(url) {
      const parts = url.split("/");
      return parts.length > 2 ? parts[parts.length - 2] : "";
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
      const menuItems = this.props.menu.items.map((item, index) => {
        if (item.object === "custom") {
            return (
                <Link href={item.url} key={item.ID}>
                    <a  onClick={this.handleClick} style={linkStyle}>{item.title}</a>
                </Link>
            );
        }
        const slug = this.getSlug(item.url);
        const actualPage = item.object === "category" ? "category" : "post";
        return (
            <Link
                className="menu-item"
                as={`/${item.object}/${slug}`}
                href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                key={item.ID}
            >
                <a onClick={this.handleClick} style={linkStyle}><i className={"ion " + (item.classes ? item.classes[0] : 'ion-android-star-outline')}></i> {item.title}</a>
            </Link>
        );
    });

  const menuSliderStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '5%',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#fff'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#111',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    left: '0',
    top: '0'
  }
}

const logout = this.state.auth ?
                (<Link href={Config.homeUrl} className="menu-item" id="logout">
                <a style={linkStyle} onClick={this.handleLogoutClick}>
                  <i className="ion ion-log-out"></i> Wyloguj
                </a>
                </Link>)
                : '';

    return(
      <div style={menuStyle}>
        <img src={this.props.logo} style={logoStyle}/>
        <Menu stack right className="menu-links" styles={menuSliderStyles} isOpen={this.state.isOpen}>
          {menuItems}
          {logout}
        </Menu>
      </div>
    )
  }


}

export default Navbar;
