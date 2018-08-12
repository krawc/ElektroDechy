import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Config } from "../config.js";
import InlineSVG from 'svg-inline-react';


const terms1 = '<svg width="31" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="31" height="37" fill="black" fill-opacity="0"/><path d="M8.8069 35.7457L9.44081 31.6726L8.02877 31.6395H1.28613L5.97192 1.58412C5.98646 1.49339 6.03373 1.40879 6.10282 1.34871C6.17191 1.28863 6.26039 1.25552 6.3525 1.25552H17.7215C21.4959 1.25552 24.1005 2.05004 25.4605 3.61822C26.098 4.35388 26.504 5.12264 26.7004 5.96865C26.9064 6.85635 26.9101 7.91692 26.7089 9.21046L26.6943 9.30487V10.1337L27.3319 10.4991C27.8688 10.7872 28.2955 11.117 28.6227 11.4947C29.1681 12.1237 29.5208 12.9231 29.6699 13.8709C29.8238 14.8456 29.7729 16.0055 29.5208 17.3187C29.2299 18.8292 28.7597 20.1448 28.1246 21.2213C27.5403 22.2132 26.7961 23.036 25.9126 23.6735C25.069 24.2792 24.0666 24.739 22.9333 25.0333C21.8352 25.3226 20.5832 25.4685 19.2099 25.4685H18.3251C17.6924 25.4685 17.0779 25.699 16.5955 26.1122C16.1119 26.534 15.7919 27.1103 15.6938 27.7405L15.6271 28.1071L14.5072 35.2859L14.4563 35.5495C14.4429 35.6329 14.4199 35.6746 14.386 35.7028C14.3557 35.7285 14.312 35.7457 14.2696 35.7457H8.8069Z" fill="#253B80"/><path d="M27.9357 9.4005C27.9018 9.61997 27.863 9.84435 27.8194 10.0749C26.3201 17.8618 21.1907 20.5519 14.6395 20.5519H11.304C10.5028 20.5519 9.82771 21.1404 9.70287 21.9398L7.99509 32.8962L7.51148 36.002C7.43027 36.5267 7.83025 37 8.35386 37H14.2699C14.9704 37 15.5656 36.485 15.6758 35.7862L15.734 35.4821L16.8479 28.3315L16.9194 27.9391C17.0285 27.2378 17.6248 26.7228 18.3254 26.7228H19.2102C24.942 26.7228 29.429 24.3687 30.7404 17.5565C31.2883 14.7107 31.0047 12.3346 29.555 10.6634C29.1163 10.1595 28.5721 9.74135 27.9357 9.4005Z" fill="white"/><path d="M26.3666 8.76784C26.1375 8.7004 25.9012 8.6391 25.6588 8.58392C25.4152 8.52997 25.1655 8.48216 24.9085 8.44047C24.0092 8.29334 23.0238 8.22345 21.9681 8.22345H13.0571C12.8377 8.22345 12.6292 8.27372 12.4426 8.36445C12.0317 8.56431 11.7263 8.95788 11.6523 9.43974L9.75669 21.5855L9.70215 21.9398C9.82699 21.1404 10.5021 20.5519 11.3033 20.5519H14.6388C21.19 20.5519 26.3194 17.8606 27.8187 10.0749C27.8635 9.84435 27.9011 9.61998 27.935 9.40051C27.5556 9.19697 27.1448 9.02287 26.7024 8.87451C26.5933 8.83773 26.4806 8.80217 26.3666 8.76784Z" fill="white" fill-opacity="0.6"/><path d="M11.6526 9.43974C11.7266 8.95788 12.032 8.56431 12.4429 8.36568C12.6308 8.27495 12.838 8.22468 13.0574 8.22468H21.9684C23.0241 8.22468 24.0095 8.29457 24.9088 8.4417C25.1658 8.48338 25.4155 8.5312 25.6591 8.58515C25.9015 8.64032 26.1378 8.70163 26.3669 8.76906C26.4809 8.8034 26.5936 8.83895 26.7039 8.87451C27.1463 9.02287 27.5572 9.1982 27.9365 9.40051C28.3826 6.52285 27.9329 4.56354 26.3948 2.78938C24.6991 0.8362 21.6387 0 17.7226 0H6.35355C5.5536 0 4.87122 0.588528 4.74759 1.38917L0.012107 31.7535C-0.0812209 32.3543 0.376934 32.8963 0.975687 32.8963H7.99467L9.75699 21.5855L11.6526 9.43974Z" fill="white" fill-opacity="0.8"/></svg>';

const terms2 = '<svg width="45" height="37" viewBox="0 0 45 37" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="37" fill="black" fill-opacity="0"/><path d="M0.264087 15.3137C-0.27179 16.7253 0.173716 17.9642 0.173716 17.9642C0.730599 19.4277 1.39446 19.6666 2.78911 19.6666C3.25709 19.6666 3.69429 19.5654 4.06994 19.3936V37H22.5242V26.322H34.0566V37H40.9781V19.3936C41.3552 19.5659 41.7914 19.6666 42.2604 19.6666C43.654 19.6666 44.5709 18.4998 44.7844 17.715C44.7844 17.715 45.2695 16.2372 44.7844 15.3137C43.9603 13.7456 37.7384 0 37.7384 0H7.30963L0.264087 15.3137ZM5.32586 17.714V17.4889H5.31413V15.3137L10.0853 3.00144H13.896L10.1409 15.3137V17.715V17.716C10.14 18.7924 9.06234 19.6656 7.73315 19.6656C6.40396 19.6656 5.32586 18.7924 5.32586 17.714ZM14.4436 30.3574H8.2026V24.052H14.4431V30.3574H14.4436ZM20.0056 15.3137V17.4889V17.714C20.0056 18.792 18.9275 19.6656 17.5988 19.6656C16.2681 19.6656 15.1905 18.7924 15.1905 17.714V17.4889V15.3137L17.185 3.00144H20.9845L20.0056 15.3137ZM27.4629 19.6656C26.1337 19.6656 25.0561 18.7924 25.0561 17.714V17.4889V15.3137L24.0762 3.00144H27.864L29.8575 15.3137V17.715C29.8575 17.7471 29.8629 17.7801 29.8648 17.8117C29.8008 18.8438 28.7511 19.6656 27.4629 19.6656ZM39.7349 17.4889H39.7226V17.714C39.7226 18.792 38.645 19.6656 37.3149 19.6656C35.9857 19.6656 34.908 18.7924 34.908 17.714V17.4889V15.3137L31.1525 3.00144H34.9637L39.7353 15.3137V17.4889H39.7349Z" fill="white"/></svg>';


export default class Payment extends Component {

    constructor(props) {
      super(props);
      this.switchToPayPal = this.switchToPayPal.bind(this);
      this.switchToOnSite = this.switchToOnSite.bind(this);
      this.processOnSiteOrder = this.processOnSiteOrder.bind(this);
      this.state = {
        processing: 'no',
        result: null,
        option: 'PayPal'
      }
    }

    switchToPayPal(e) {
      this.setState({
        option: 'PayPal'
      })
    }


    switchToOnSite(e) {
      this.setState({
        option: 'onSite'
      })
    }

    processOnSiteOrder() {
        this.setState({
          processing: 'yes'
        });

        var submit = {
          customer_id: this.props.user.ID,
          payment_method: 'PayPal',
          status: 'pending',
          set_paid: true,
          billing: {
            email: this.props.user.user_email,
          },
          line_items: [
            {
              product_id: this.props.productId,
              quantity: 1
            }
          ],
          meta_data: [
            {
              key: "booked_start_date",
              value: this.props.chosenDate
            },
            {
              key: "booked_start_time",
              value: this.props.chosenTime
            },
            {
              key: "worker",
              value: this.props.chosenWorker
            }
          ]
        }

        fetch(`${Config.apiUrl}/wp-json/wc/v2/orders`, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + this.props.user.token,
           },
          method: 'POST',
          body: JSON.stringify(submit),
        })
        .then(response => {
          if (response.ok) {
            return response.json()
            .then(response => {
              // console.log(response.price);
              this.setState({
                processing: 'done',
                result: response
              });
            });
          }
        });
        // Congratulation, it came here means everything's fine!
        //console.log("The payment was succeeded!", payment);

        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data


    }

    render() {
        const onSuccess = (payment) => {

            this.setState({
              processing: 'yes'
            });

            var submit = {
              customer_id: this.props.user.ID,
              payment_method: 'PayPal',
              status: 'processing',
              set_paid: true,
              billing: {
                email: this.props.user.user_email,
              },
              line_items: [
                {
                  product_id: this.props.productId,
                  quantity: 1
                }
              ],
              meta_data: [
                {
                  key: "booked_start_date",
                  value: this.props.chosenDate
                },
                {
                  key: "booked_start_time",
                  value: this.props.chosenTime
                },
                {
                  key: "worker",
                  value: this.props.chosenWorker
                }
              ]
            }

            fetch(`${Config.apiUrl}/wp-json/wc/v2/orders`, {
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + this.props.user.token,
               },
              method: 'POST',
              body: JSON.stringify(submit),
            })
            .then(response => {
              if (response.ok) {
                return response.json()
                .then(response => {
                  // console.log(response.price);
                  this.setState({
                    processing: 'done',
                    result: response
                  });
                });
              }
            });
            // Congratulation, it came here means everything's fine!
            // console.log("The payment was succeeded!", payment);

            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            // console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            // console.log("Error!", err);
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'PLN'; // or you can set this value from your props or state
        let total = parseInt(this.props.productPrice); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox:    'ATsZcjdOVrxCR12uS6xh9hfPEVli-TpExKaSSYlf1erWXs1mwYtgWkZkCyZuiCqWEwYife_sCiu5UeB6'
        }

        const containerStyle = {
          maxWidth:'600px',
          margin: '3em auto 0em',
          paddingBottom: '2em'
        }

        const date = this.props.chosenDate;
        const hour = this.props.chosenTime;

        const monthSlice = date.slice(4,6);
        const daySlice = date.slice(6,8);
        const hourSlice = hour.slice(0,5);

        const purchaseItemStyles = {
          display: 'flex',
          background: '#111',
          borderRadius: '15px',
          padding: (this.state.processing === 'no') ? '20px' : '60px 20px',
          margin: '0px 10px',
          fontFamily: 'Oswald, sans-serif',
          justifyContent: (this.state.processing === 'no') ? 'space-between' : 'center',
          alignItems: 'center',
          position: 'relative',
          flexDirection: (this.state.processing === 'no') ? 'row' : 'column',
        }

        const h2Style = {
          margin: '0em 0.2em',
          color: '#fff'
        }

        const optionButton = {
          width: '90px',
          height: '90px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          borderRadius: '5px',
          background: 'rgb(0, 0, 0)',
          alignItems: 'center',
          padding: '5px',
          margin: '5px',
          boxSizing: 'border-box',
          cursor: 'pointer'
        }

        const bookBtnStyle = {
          color: '#fff',
          fontFamily: 'Oswald, sans-serif',
          background: '#f2b926',
          padding: '5px 12px',
          borderRadius: '4px',
          border: '0px',
          margin: '10px',
          fontSize: '20px'
        }

        const optionsCont = {display: 'flex', maxWidth: '250px', textAlign: 'center', justifyContent: 'center', margin: '1em auto'}

              if (this.state.processing === 'no') {
                return (
                    <div style={containerStyle}>
                      <div style={optionsCont}>
                        <div style={optionButton} onClick={this.switchToPayPal} className={(this.state.option === 'PayPal') ? 'payment-option-active' : ''}>
                          <InlineSVG src={terms1}/>
                          <p style={{fontFamily: 'Oswald, sans-serif', color: '#fff'}}>Karta/PayPal</p>
                        </div>
                        <div style={optionButton} onClick={this.switchToOnSite} className={(this.state.option === 'onSite') ? 'payment-option-active' : ''}>
                          <InlineSVG src={terms2}/>
                          <p style={{fontFamily: 'Oswald, sans-serif', color: '#fff'}}>Na miejscu</p>
                        </div>
                      </div>
                      <div style={purchaseItemStyles}>
                        <div>
                          <h2 style={h2Style}>{this.props.productName}</h2>
                          <h2 style={h2Style}>{daySlice + '/' + monthSlice + ', ' + hourSlice}</h2>
                        </div>
                        <div>
                          <h2 style={h2Style}>{this.props.productPrice + ' PLN'}</h2>
                        </div>
                      </div>
                      {
                        this.state.option === 'PayPal'
                        ? <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                      : <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}><button style={bookBtnStyle} onClick={this.processOnSiteOrder}>ZAREZERWUJ</button></div>
                      }
                  </div>
                )
              } else if (this.state.processing === 'yes') {
                return (
                  <div style={containerStyle}>
                    <div style={purchaseItemStyles}>
                      <i style={{animation: 'rotating 2s linear infinite', position: 'absolute', top: 'calc(50% - 25px)', left: 'calc(50% - 25px)', fontSize: '50px', color: '#fff'}} className="ion ion-load-d"></i>
                    </div>
                  </div>
                )
              } else if (this.state.processing === 'done') {
                return (
                  <div style={containerStyle}>
                    <div style={purchaseItemStyles}>
                        <i style={{ fontSize: '50px', color: '#fff'}} className="ion ion-checkmark-circled"></i>
                        <h2 style={{color: "#fff", fontFamily: 'Lobster, sans-serif'}}>W drogę!</h2>
                        <p style={{color: "#fff", fontFamily: 'Roboto, sans-serif'}}> Rezerwacja przebiegła pomyślnie.</p>
                    </div>
                  </div>
                )
              } else {
                return null;
              }
    }
}
