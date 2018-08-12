import React, { Component } from "react";
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import customDayCell from '../components/CustomDayCell.js';
import customHeaderCell from '../components/CustomHeaderCell.js';
import Scheduler from '../components/Scheduler.js';
import SchedulerMobile from '../components/SchedulerMobile.js';
import { Config } from "../config.js";

// import 'react-week-calendar/dist/style.css';

class SchedulerContainer extends Component {

  constructor(props) {
    super(props);
    this.onSlotClick = this.onSlotClick.bind(this);
    this.getFormatDate = this.getFormatDate.bind(this);
    this.incrementDate = this.incrementDate.bind(this);
    this.decrementDate = this.decrementDate.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.state = {
      date: new Date(),
      width: window.innerWidth,
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

  isValidated() {
    var chosenDate = this.state.chosenDate;
    var chosenTime = this.state.chosenTime;
    var chosenWorker = this.state.chosenWorker;

    if (chosenDate && chosenTime && chosenWorker) {
      return true;
    } else {
      return false;
    }

  }

  onSlotClick(e) {
    this.setState({
      chosenDate: e.target.getAttribute('date'),
      chosenTime: e.target.getAttribute('start_time'),
      chosenWorker: e.target.getAttribute('worker'),
    });
    this.props.onSingleSlotClick(e);
  }

  getFormatDate(d) {
    // var d = new Date();
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    var day = d.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    var date = year + month + day;
    return date;
  }

  incrementDate() {
    var now = this.state.date;
    var later = now.setDate(now.getDate()+7);
    this.setState({
      date: new Date(later)
    })
    // console.log(this.state.date);
  }

  decrementDate() {
    var now = this.state.date;
    var later = now.setDate(now.getDate()-7);
    this.setState({
      date: new Date(later)
    })
    // console.log(this.state.date);
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 767;

    if (!isMobile) {
      return(
        <div>
          <Scheduler date={this.getFormatDate(this.state.date)} productId={this.props.productId} onSlotClick={this.onSlotClick}/>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <div style={{color: '#fff', fontFamily: 'Oswald, sans-serif', padding: '1em'}} onClick={this.decrementDate}>
                <i className="ion ion-ios-arrow-back"></i> Poprzedni tydzień
              </div>
              <div style={{color: '#fff', fontFamily: 'Oswald, sans-serif', padding: '1em'}} onClick={this.incrementDate}>
                Następny tydzień <i className="ion ion-ios-arrow-forward"></i>
              </div>
            </div>
        </div>
      )
    } else {
      return(
        <div>
          <SchedulerMobile date={this.getFormatDate(this.state.date)} productId={this.props.productId} onSlotClick={this.onSlotClick}/>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            </div>
        </div>
      )
    }
  }


}

export default SchedulerContainer;
