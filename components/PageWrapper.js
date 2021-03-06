import React from "react";
import { Config } from "../config.js";
import Router from 'next/router';

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      const optionsRes = await fetch(
          `${Config.apiUrl}/wp-json/acf/v3/options/headless-settings`
      );
      const options = await optionsRes.json();
      return {
        headerMenu,
        options,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }



    render() {
      return (
        <Comp {...this.props} />
      )
    }
  }
)

export default PageWrapper;
