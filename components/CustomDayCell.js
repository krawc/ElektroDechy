import React from 'react';

const customDayCell = (props) => {
  const hour = props.startTime.hour();
  return (<div className="dayCell customCell customCell_10" onMouseDown={props.startSelection}></div>);
}


export default customDayCell;
