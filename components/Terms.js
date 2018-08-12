import React, { Component } from "react";
import { Config } from "../config.js";
import Router from 'next/router';
import InlineSVG from 'svg-inline-react';
import Switch from "react-switch";

const terms1 = '<svg width="72" height="96" viewBox="0 0 72 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.00142 16C12.4205 16 16.0028 12.4183 16.0028 8C16.0028 3.58172 12.4205 0 8.00142 0C3.58236 0 0 3.58172 0 8C0 12.4183 3.58236 16 8.00142 16Z" transform="translate(28.8052)" fill="black"/> <path d="M46.6707 6.4L68.3385 18.7776L71.5135 13.2224L48.3734 0H16.9406L1.36743e-06 27.1072L5.42816 30.4928L20.4932 6.4H21.9175V28.8H12.3158V57.6H21.9175V38.4H44.3215V57.6H53.9232V28.8H44.3215V6.4H46.6707Z" transform="translate(0.48584 19.2)" fill="black"/> <path d="M67.2119 0H0V3.2H67.2119V0Z" transform="translate(0 80)" fill="black"/> <path d="M4.80085 9.6C7.45229 9.6 9.60171 7.45097 9.60171 4.8C9.60171 2.14903 7.45229 0 4.80085 0C2.14942 0 0 2.14903 0 4.8C0 7.45097 2.14942 9.6 4.80085 9.6Z" transform="translate(6.40137 86.4)" fill="black"/> <path d="M4.80085 9.6C7.45229 9.6 9.60171 7.45097 9.60171 4.8C9.60171 2.14903 7.45229 0 4.80085 0C2.14942 0 0 2.14903 0 4.8C0 7.45097 2.14942 9.6 4.80085 9.6Z" transform="translate(51.209 86.4)" fill="black"/> </svg>';
const terms2 = '<svg width="86" height="81" viewBox="0 0 86 81" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M54.5535 0H34.8343C34.2263 0 33.6182 0 32.9232 0.086631C20.4141 0.779679 9.72929 9.61604 5.8202 21.5711L0 39.4171C5.21212 42.8824 11.1192 45.0481 17.2869 45.7412L27.4505 46.8674C29.1879 47.0406 30.6646 47.9936 31.6202 49.3797L34.2263 53.2781C35.2687 54.9241 37.0929 55.877 39.0909 55.877H42.305L49.8626 73.9829C50.6444 73.2898 51.6869 72.7701 52.903 72.7701H53.2505L46.2141 55.877H48.1253L48.4727 56.0503L50.7313 52.4118C52.1212 50.0727 54.6404 48.6866 57.4202 48.6866H60.6343C63.3273 48.6866 65.5859 50.5059 66.2808 53.0182L67.5838 58.216L55.0747 73.03C56.2909 73.3765 57.2465 74.2428 57.8545 75.2824L69.1475 62.0278C70.3636 63.2406 72.1879 63.5872 73.7515 62.7209L85.0444 54.3176C85.0444 54.3176 86 36.9914 86 33.1797V31.4471C86 14.1209 71.8404 0 54.5535 0ZM51.6 9.70267C51.6 11.1754 50.3838 12.3882 48.9071 12.3882H42.305C40.8283 12.3882 39.6121 11.1754 39.6121 9.70267V9.09626C39.6121 7.62353 40.8283 6.4107 42.305 6.4107H48.9071C50.3838 6.4107 51.6 7.62353 51.6 9.09626V9.70267Z" fill="black"/> <path d="M3.64848 -2.64377e-06H2.69293C1.21616 -2.64377e-06 -6.62755e-07 1.21284 -6.62755e-07 2.68556V3.6385C-6.62755e-07 5.11123 1.21616 6.32406 2.69293 6.32406H3.64848C5.12525 6.32406 6.34141 5.11123 6.34141 3.6385V2.68556C6.34141 1.21284 5.12525 -2.64377e-06 3.64848 -2.64377e-06Z" transform="translate(50.21 74.6759)" fill="black"/> </svg>';
const terms3 = '<svg width="146" height="57" viewBox="0 0 146 57" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M119.873 57L64.4223 49.4299L51.7052 33.2959L25.286 34.885L13.5844 16.8991L5.44617e-07 4.08267L19.3022 1.20011e-06L33.3239 18.1468L63.6746 15.5048L67.1474 33.7463L93.5309 37.1354L94.1341 24.2529L124.149 28.584L116.431 16.7185L121.663 14.2321L132.248 18.2451L132.351 18.3899L146 37.3696L110.922 40.4012L119.873 57ZM131.504 19.2193L121.719 15.5084L118.15 17.2048L126.551 30.1177L126.726 37.8576L131.336 37.4572L131.504 19.2193ZM125.566 29.9747L96.2239 25.7419L95.0889 51.9002L108.696 53.9022L109.039 39.3859L125.723 37.9416L125.566 29.9747ZM62.7234 16.7686L33.3881 19.3212V33.219L52.2442 32.0875L62.7394 45.3991L62.7234 16.7686ZM19.3897 2.0324L18.8258 1.30131L2.43598 4.76728L14.4803 16.1519L19.3968 23.6934L19.3897 2.0324Z" fill="black"/> </svg>';
const terms4 = '<svg width="69" height="80" viewBox="0 0 69 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M40 3.9C40 1.7 38.2 0 36.1 0H3.9C1.7 0 0 1.8 0 3.9V76C0 78.2 1.8 79.9 3.9 79.9H36C38.2 79.9 39.9 78.1 39.9 76V3.9H40ZM20 73.5C14.7 73.5 10.4 69.2 10.4 63.9C10.4 58.6 14.7 54.3 20 54.3C25.3 54.3 29.6 58.6 29.6 63.9C29.6 69.2 25.3 73.5 20 73.5ZM20 49.5C14.7 49.5 10.4 45.2 10.4 39.9C10.4 34.6 14.7 30.3 20 30.3C25.3 30.3 29.6 34.6 29.6 39.9C29.6 45.2 25.3 49.5 20 49.5ZM20 25.5C14.7 25.5 10.4 21.2 10.4 15.9C10.4 10.6 14.7 6.3 20 6.3C25.3 6.3 29.6 10.6 29.6 15.9C29.6 21.2 25.3 25.5 20 25.5Z" transform="translate(14.1001)" fill="black"/> <path d="M-3.8147e-07 0.1C-3.8147e-07 10.6 2.1 19.1 12.5 19.1V-3.8147e-07L-3.8147e-07 0.1C-3.8147e-07 0 -3.8147e-07 0 -3.8147e-07 0.1Z" transform="translate(0 6.4)" fill="black"/> <path d="M-3.8147e-07 0.1C-3.8147e-07 10.6 2.1 19.1 12.5 19.1V1.52588e-06L-3.8147e-07 0.1C-3.8147e-07 0 -3.8147e-07 0 -3.8147e-07 0.1Z" transform="translate(0 30.4)" fill="black"/> <path d="M-3.8147e-07 0.1C-3.8147e-07 10.6 2.1 19.1 12.5 19.1V1.52588e-06L-3.8147e-07 0.1C-3.8147e-07 0 -3.8147e-07 0 -3.8147e-07 0.1Z" transform="translate(0 54.4)" fill="black"/> <path d="M12.6 0.1C12.6 0 12.6 0 12.6 0.1L0 -3.8147e-07V19.1C10.6 19.1 12.6 10.6 12.6 0.1Z" transform="translate(55.6001 6.4)" fill="black"/> <path d="M-1.52588e-06 19.1C10.5 19 12.6 10.5 12.6 0.1V1.52588e-06H-1.52588e-06V19.1Z" transform="translate(55.7002 30.4)" fill="black"/> <path d="M-1.52588e-06 19.1C10.5 19 12.6 10.5 12.6 0.1V1.52588e-06H-1.52588e-06V19.1Z" transform="translate(55.7002 54.4)" fill="black"/> </svg>';
const terms5 = '<svg width="92" height="86" viewBox="0 0 92 86" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M39.0268 -7.38281e-06C34.609 -7.38281e-06 31.0277 3.58167 31.0277 7.99987C31.0277 12.4181 34.609 15.9997 39.0268 15.9997C43.4446 15.9997 47.0259 12.4181 47.0259 7.99987C47.0259 3.58167 43.4446 -7.38281e-06 39.0268 -7.38281e-06ZM71.617 13.031L52.7128 13.9998C51.7188 13.9998 49.4014 15.3132 47.7446 15.9686C45.7565 17.9344 41.7903 19.9059 38.8081 19.9059C35.8259 19.9059 32.8596 18.9344 30.8715 16.9686H15.9356L1.03099 20.9059C-0.95713 23.8547 0.0485997 26.7808 3.03077 26.7808L14.967 23.8435L27.8718 24.8122L22.9036 41.5306C21.9095 45.4625 23.8956 49.4112 27.8718 53.3431L19.9352 66.0929C19.9352 70.0246 23.8897 71.0104 26.8719 68.0616L36.8083 53.3431L42.7764 54.3117L32.84 70.0303C32.84 72.9793 36.8258 73.9649 39.808 71.999L53.7127 52.3431C54.7068 50.3772 53.7264 47.4198 50.7443 46.4369L41.8078 44.4682L46.776 25.8121C49.7581 24.8293 52.7303 22.5442 55.7125 20.9059L72.6169 18.9372C74.605 16.9714 74.5992 14.014 71.617 13.031ZM1.96311 67.7754C1.87331 68.718 2.54969 69.6752 3.46822 69.9053L10.5924 71.999C10.251 72.5881 10.03 73.2691 10.03 73.999C10.03 76.208 11.8207 77.9989 14.0296 77.9989C16.1717 77.9989 17.8942 76.3031 17.9979 74.1865L36.7458 79.7178C36.2995 80.363 36.0272 81.1548 36.0272 81.9989C36.0272 84.2079 37.8178 85.9988 40.0267 85.9988C42.5183 86.0528 43.9549 84.2958 44.0263 81.8739C48.5538 83.404 52.9512 81.8039 55.4625 79.4051C56.2069 78.6606 56.2069 77.3059 55.4625 76.5614C54.7181 75.8169 53.3635 75.8169 52.6191 76.5614C51.3263 77.8543 47.7007 78.8084 45.8073 78.2489L4.62434 66.0616C3.41379 65.7229 2.09133 66.5122 1.96311 67.7754Z" transform="translate(18)" fill="black"/> <line x1="1.5" y1="-1.5" x2="22.8311" y2="-1.5" transform="translate(25 34) rotate(-170.538)" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/> <line x1="1.5" y1="-1.5" x2="22.8311" y2="-1.5" transform="translate(25 43) rotate(-170.538)" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/> <line x1="1.5" y1="-1.5" x2="22.8311" y2="-1.5" transform="translate(25 52) rotate(-170.538)" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
const terms6 = '<svg width="68" height="96" viewBox="0 0 68 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M67.2119 0H0V3.2H67.2119V0Z" transform="translate(0 80)" fill="black"/> <path d="M4.80085 9.6C7.45229 9.6 9.60171 7.45097 9.60171 4.8C9.60171 2.14903 7.45229 0 4.80085 0C2.14942 0 0 2.14903 0 4.8C0 7.45097 2.14942 9.6 4.80085 9.6Z" transform="translate(6.40137 86.4)" fill="black"/> <path d="M4.80085 9.6C7.45229 9.6 9.60171 7.45097 9.60171 4.8C9.60171 2.14903 7.45229 0 4.80085 0C2.14942 0 0 2.14903 0 4.8C0 7.45097 2.14942 9.6 4.80085 9.6Z" transform="translate(51.209 86.4)" fill="black"/> <path d="M0.927803 2.37263H1.01215L5.39813 1.86653C5.90421 1.78218 6.24159 1.36042 6.24159 0.854313C6.15724 0.348206 5.73551 -0.0735494 5.22944 0.0108017L0.843459 0.516909C0.337384 0.60126 1.28701e-06 1.02302 1.28701e-06 1.52912C1.28701e-06 2.03523 0.421729 2.37263 0.927803 2.37263Z" transform="translate(46.3184 1.63576)" fill="black"/> <path d="M4.48693 0.116261L0.522687 2.05634C0.100958 2.30939 -0.152079 2.8155 0.100958 3.3216C0.269649 3.65901 0.607033 3.82771 0.944416 3.82771C1.11311 3.82771 1.19745 3.82771 1.36614 3.74336L5.33039 1.80328C5.75212 1.55023 6.00516 1.04412 5.75212 0.538016C5.49908 0.0319095 4.90866 -0.136793 4.48693 0.116261Z" transform="translate(47.4829 4.14519)" fill="black"/> <path d="M52.8584 11.0095C52.3524 10.4191 51.6776 9.99732 51.0028 9.82862C51.0028 9.74427 51.0028 9.65992 51.0028 9.57557L48.3881 0.718694C48.2194 0.212587 47.7133 -0.124818 47.1229 0.0438845L46.9542 0.128236C46.4482 0.296938 46.1108 0.803045 46.2795 1.3935L48.8098 10.0817C48.5568 10.166 48.3038 10.3347 48.1351 10.5034C48.0507 10.5878 42.1465 15.2271 39.1101 17.0828C37.2545 18.1794 33.2902 19.3603 29.7477 19.3603H20.6384C16.4211 19.3603 13.975 23.3248 12.2881 26.1927C12.0351 26.6145 11.6977 27.1206 11.4447 27.6267C10.4325 26.5301 8.91429 24.8431 7.73345 23.1561C7.05868 22.2282 6.04654 21.7221 5.03439 21.7221L4.52831 18.3481C4.44397 17.842 3.93789 17.5046 3.43182 17.5889C2.92574 17.6733 2.58836 18.1794 2.67271 18.6855L3.01009 20.963L1.66056 18.9385C1.40752 18.5168 0.817099 18.4324 0.39537 18.6855C-0.0263587 18.9385 -0.110704 19.529 0.142333 19.9508L2.33532 23.1561C1.49187 24.2527 1.49187 25.8553 2.33532 27.0363C7.56476 34.4592 10.2638 35.134 11.6134 35.134C11.782 35.134 11.9507 35.134 12.0351 35.134C14.6498 34.9653 16.168 32.9408 17.5176 30.6634L17.6863 45.1718L15.7463 76.0443C15.5776 78.2374 17.2645 80.0931 19.4575 80.1775C19.5419 80.1775 19.6262 80.1775 19.7105 80.1775C21.7348 80.1775 23.5061 78.5748 23.5905 76.466L25.3617 48.6301C25.4461 48.7145 25.5304 48.7989 25.6148 48.8832C26.8799 51.4137 29.2416 56.3061 30.0007 58.4992C30.5068 60.1863 30.6755 68.9588 30.4225 76.1286C30.3381 78.3218 32.025 80.0931 34.218 80.1775C36.411 80.2618 38.1823 78.5748 38.2666 76.3817C38.4353 71.405 38.6883 59.4271 37.4232 55.8C36.411 52.9321 33.6276 47.2805 32.6154 45.2561L33.0372 25.771C37.0014 25.2649 40.6283 23.9153 42.6526 22.7343C46.0264 20.7099 52.015 15.9019 52.268 15.7332C53.7019 14.6366 53.9549 12.4435 52.8584 11.0095Z" transform="translate(7.46143)" fill="black"/> <path d="M7.84416 15.6893C12.1764 15.6893 15.6883 12.1771 15.6883 7.84466C15.6883 3.51217 12.1764 0 7.84416 0C3.51195 0 0 3.51217 0 7.84466C0 12.1771 3.51195 15.6893 7.84416 15.6893Z" transform="translate(24.8105 1.30915)" fill="black"/> </svg>';

class Terms extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.state = {
      width: window.innerWidth,
      terms: [
        {
          title: 'STÓJ POPRAWNIE',
          description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms1,
        },
        {
          title: 'NOŚ KASK',
          description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms2,
        },
        {
          title: 'JEDŹ OSTROŻNIE',
          description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms3,
        },
        {
          title: 'PRZESTRZEGAJ ZASAD RUCHU',
          description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms4,
        },
        {
          title: 'UTRZYMUJ OPTYMALNĄ PRĘDKOŚĆ',
          description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms5,
        },
        {
          title: 'NO SELFIES',
          description: 'lorem ipsum lorem ipsum lorem ipsum ',
          icon: terms6,
        },
      ]
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleChange(e) {
    var check = this.state.checked === true ? false : true;
    this.setState({
      checked: check
    })
  }

  isValidated() {
    if (this.state.checked) {
      return true;
    } else {
      return false;
    }
  }

  render() {



    const terms = this.state.terms.map((term, index) => {

      var itemStyle = {
        display: 'flex',
        flex: (this.state.width <= 500) ? '0 0 48%' : '0 0 31.3%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%',
        flexWrap: 'wrap',
        background: (index % 2 === 1) ? '#f22626' : '#f2b926',
        padding: '15px 0px',
        height: '150px'
      }

      var headerStyle = {
        textAlign: 'center',
        margin: '0em',
        flex: '0 0 100%',
        fontFamily: 'Oswald, sans-serif',
      }

      return(
        <div className="single-term" style={itemStyle} data-description={term.description}>
          <InlineSVG src={term.icon}/>
          <h3 style={headerStyle}>{term.title}</h3>
        </div>
      )
    });

    const containerStyle = {
      margin: '3em auto 0em',
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '600px'
    }

    const switchContStyle = {
      gridColumn: '1/4',
      display: 'flex',
      justifyContent: 'center',
      color: '#fff',
      margin: '2em 0em'
    }

    return(
      <div className="terms-container" style={containerStyle}>
        {terms}
        <label htmlFor="normal-switch" style={switchContStyle}>
          <span style={{order: '2', margin: '0em 1em', fontFamily: 'Oswald, sans-serif'}}>Akceptuję Regulamin</span>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            id="accept-terms"
          />
        </label>
      </div>
    )
  }
}

export default Terms;
