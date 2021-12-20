import logo from '../logo.svg';
import '../App.css';
import '../style/clock.css';
import Hand from './hand.js';
import InformationPanel from './informationPanel.js';
import React, { useState, useEffect } from 'react';

function Clock() {
  const [currMin, setCurrMin] = useState(0);
  const [currHour, setCurrHour] = useState(0);
  const [currSecond, setCurrSecond] = useState(0);

  // This useEffect will only be called once on mount
  useEffect(() => {
    updateCurrentTime();
    // Set an interval to call every one second to update the hands
    const timer = setInterval(
      () => updateCurrentTime(),
      1000
    )
  }, []);

  // The interval function to be called every other second to update the clock
  function updateCurrentTime() {
    let date = new Date();
    let minute = date.getMinutes();
    let hour = date.getHours();
    let second = date.getSeconds();

    setCurrMin(minute);
    setCurrHour(hour);
    setCurrSecond(second);
  }

  return (
    <div className="clock">
      <Hand type="min" time={currMin} />
      <Hand type="hour" time={currHour} />
      <Hand type="second" time={currSecond} />

      <p className="digital_time">
        {`${currHour}:${currMin}:${currSecond}`}
      </p>

      <InformationPanel 
        min={currMin}
        hour={currHour}
        second={currSecond}
      />

    </div>
  );
}

export default Clock;
