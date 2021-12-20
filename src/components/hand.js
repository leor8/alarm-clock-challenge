import logo from '../logo.svg';
import '../App.css';
import '../style/clock.css';
import React, { useState, useEffect } from 'react';

function Hand(props) {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    // Make sure the hour can be mapped to 360 by calculating the hours in 12 hour formate and maps that to 60 (like minute and second)
    let hour = props.time;
    if(props.type == "hour"){
      if(props.time > 12){
        hour = (hour - 12) * 5;
      } 

    }

    // Since 60 is the defaul scale for time, we need to map it to 360 degrees
    let handDegree = hour * 6
    setDegree(handDegree);
  });

  return (
    <div className={`hand ${props.type}`}
         style={{ transform: `rotate(${degree}deg)` }}>
    </div>
  );
}

export default Hand;
