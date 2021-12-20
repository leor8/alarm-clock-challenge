import logo from '../logo.svg';
import '../App.css';
import '../style/clock.css';
import React, { useState, useEffect } from 'react';

function InformationPanel(props) {
  // A list of states for calculating and displaying information 
  const [degree, setDegree] = useState(0);
  const [alarmCounter, setAlarmCounter] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [alarmMin, setAlarmMin] = useState(-1);
  const [alarmHour, setAlarmHour] = useState(-1);
  const [alarmSecond, setAlarmSecond] = useState(-1);

  // This useEffect runs ever second 
  useEffect(() => {
  	// Using the math provided to calculate the angles
  	let mapMinHand = props.min * 6;
  	let mapHourHand = props.hour > 12 ? props.hour - 12 : props.hour;

  	mapHourHand = (mapHourHand * 60 + props.min)*0.5;

  	let diff = Math.abs(mapHourHand - mapMinHand);
  	
  	// Set the angles to state to display
  	setDegree(diff);

  	// Check for if the alarm time matches the current time, if so calls the trigger alarm method
  	if(alarmHour == props.hour &&
  	   alarmMin == props.min &&
  	   alarmSecond == props.second
  		) {
  		triggerAlarm();
  	}
  });

  // This useEffect runs once when component is mounted
  useEffect(() => {
  	// Sets the next alarm to be in one hour 
  	let date = new Date();
    let minute = date.getMinutes();
    let hour = date.getHours();
    let second = date.getSeconds();

    // Set the start time of the application
  	setStartMin(minute);
  	setStartHour(hour);
  	setStartSecond(second);

  	// Trigger the alarm on load
  	alert("ALARM TRIGGERED");
  	setAlarmHour(over24Hour(hour + 1));
  	setAlarmMin(minute);
  	setAlarmSecond(second);
   }, []);

  function triggerAlarm() {
  	// NOTE: Some cases for fibonacci sequence are not handled, for instance, if the alarm will ring in over 24 hours, 
  	// then it might create some problems as it might ring on the same day
  	// With that being said, this software can only handle any cases up to t9, since days is not in the consideration of the question

  	// Trigger the alarm by using alert method.
  	alert("ALARM TRIGGERED");

  	// Calcuate the next hour the alarm will sound using fibonacci function
  	let nextAlarmHour = over24Hour(alarmHour + fibonacci(alarmCounter));

  	// Increase the counter, t(n)
  	let nextCounter = alarmCounter + 1;

  	// Update the states of the counter and next alarm hour
  	setAlarmCounter(nextCounter);
  	setAlarmHour(nextAlarmHour);
  }

  // A basic recursive fibonacci function
  function fibonacci(count) {
  	if(count <= 1) return 1;

  	return fibonacci(count - 1) + fibonacci(count - 2);
  }

  // A helper function to check if the hours are over 24
  function over24Hour(hour) {
  	if(hour < 24) return hour;
  	if(hour == 24) return 0;

  	// If the hours are over 24, we handle the case by subtracting the hour by 24
  	// This method can get very ugly as fibonacci sequence gets larger
  	// I'm not taking it into consideration because this function will be omitted if the clock is day-based
  	return over24Hour(hour - 24);
  }

  return (
    <div className='information_panel'>
    	<p>Application running since:</p>
        <p>{startHour}:{startMin}:{startSecond}</p>
        <p>Degree between hour and min hand</p>
        <p>{degree}</p>
        <p>Next Alarm is at</p>
        <p>{alarmHour}:{alarmMin}:{alarmSecond}</p>
    </div>
  );
}

export default InformationPanel;