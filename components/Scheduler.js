import React, { Component } from "react";
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import customDayCell from '../components/CustomDayCell.js';
import customHeaderCell from '../components/CustomHeaderCell.js';
import { Config } from "../config.js";


class Scheduler extends Component {

    constructor(props) {
      super(props);
      this.getTheSchedule = this.getTheSchedule.bind(this);
      this.getRandomInt = this.getRandomInt.bind(this);
      this.onSlotClick = this.onSlotClick.bind(this);

      this.state = {
        // date: date,
        schedule: {},
        responseLoaded: false,
        chosenDate: '',
        chosenTime: '',
        chosenWorker: '',
      }
      this.getTheSchedule();
    }

    componentDidUpdate(nextProps) {
      if(JSON.stringify(this.props.date) !== JSON.stringify(nextProps.date)) { // Check if it's a new user, you can also use some unique, like the ID
        this.getTheSchedule();
      }
    }

    getTheSchedule() {
      this.setState({
        responseLoaded: false
      })
      fetch(`${Config.apiUrl}/wp-json/postlight/v1/products/daily_schedule?id=${this.props.productId}&date=${this.props.date}`, {
        method: 'GET',
      }).then(response => {
        return response.json().then(response => {
          this.setState({
            schedule: response,
            responseLoaded: true
          });
          // console.log(this.props.date)
        });
      });
    }

    onSlotClick(e) {
      this.setState({
        chosenDate: e.target.getAttribute('date'),
        chosenTime: e.target.getAttribute('start_time'),
        chosenWorker: e.target.getAttribute('worker'),
      });
      this.props.onSlotClick(e);
    }

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {

      // console.log(this.state.schedule);

      let menuItems = (this.state.responseLoaded) ?
      this.state.schedule.map((day, index) => {
        return(
          <div className="schedule-DayColumn" style={{display: 'flex', flex: '1', flexWrap: 'wrap', flexDirection: 'column', background: '#fff', border: '1px solid #ccc'}}>
            {day.slots.map((slot, index) => {
              if (slot.workers[0] !== '0') {
                return (
                  <div is
                    onClick={this.onSlotClick}
                    style={{borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'}}
                    className={"schedule-slot slot-available" + (((this.state.chosenDate === slot.date) && (this.state.chosenTime === slot.start_time)) ? ' picked' : '')}
                    worker={slot.workers[this.getRandomInt(0, (slot.workers.length - 1))]}
                    date={slot.date}
                    data-prettydate={slot.prettydate}
                    start_time={slot.start_time}>
                    <h4 style={{textAlign: 'center', pointerEvents: 'none', margin: '0.5em 0em', color: 'transparent'}}>{slot.workers[0] !== '0' ? 'Available' : 'Unavailable'}</h4>
                  </div>
                )
              } else {
                return (
                  <div style={{borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', backgroundImage: 'linear-gradient(-45deg, #999 25%, transparent 25%, transparent 50%, #999 50%, #999 75%, transparent 75%, transparent)', backgroundSize: '4px 4px'}} className="schedule-slot">
                    <h4 style={{textAlign: 'center', margin: '0.5em 0em', color: 'transparent'}}>{slot.workers[0] !== '0' ? 'Available' : 'Unavailable'}</h4>
                  </div>
                )
              }
            })}
          </div>
        )
      })
      : '';

      let days = (this.state.responseLoaded) ?
      this.state.schedule.map((day, index) => {
        return(
          <div className="schedule-day" style={{flex: '1', border: '1px solid #000', fontFamily: 'Oswald, sans-serif', textAlign: 'center', color: '#fff', background: '#111'}}>{day.day + ', ' + day.date}</div>
        )
      })
      : '';

      let hours = (this.state.responseLoaded) ?
      this.state.schedule[0].slots.map((hour, index) => {
        return(
          <div style={{ background: '#222', borderTop: '1px solid #111', borderBottom: '1px solid #111'}} className="schedule-slot">
            <h4 style={{textAlign: 'center', color: '#fff', margin: '0.5em 0em'}}>{hour.start_time.substring(0, hour.start_time.length - 3)}</h4>
          </div>
        )
      })
      : '';

        return (
          <div style={{maxWidth:'60em', margin: '3em auto 1em', position: 'relative'}}>
            <div style={{height: '40em', overflow: 'scroll'}}>
              <div style={{display: 'flex', position: 'absolute', top: '0', width: '100%'}}>
              <div className="schedule-day-empty" style={{flex: '1'}}></div>
              {days}
              </div>
              <div style={{display: 'flex', fontFamily: 'Roboto, sans-serif', marginTop: '25px'}}>
                {
                  (!this.state.responseLoaded)
                  ? <div style={{position: 'absolute', width: '100%', height: 'calc(40em - 1.5em)', background: '#fff', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <i style={{animation: 'rotating 2s linear infinite', position: 'absolute', top: 'calc(50% - 25px)', left: 'calc(50% - 25px)', fontSize: '50px'}} className="ion ion-load-d"></i>
                  </div>
                  : ''
                }
                <div className="schedule-DayColumn" style={{display: 'flex', flex: '1', flexWrap: 'wrap', flexDirection: 'column', background: '#fff', border: '1px solid #000'}}>
                  {hours}
                </div>
                {menuItems}
              </div>
            </div>
            <input type="hidden" value={this.state.chosenDate} name="chosenDate"/>
            <input type="hidden" value={this.state.chosenTime} name="chosenTime"/>
            <input type="hidden" value={this.state.chosenWorker} name="chosenWorker"/>
          </div>
        );
    }
}

export default Scheduler;
