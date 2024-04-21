import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = endTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Reload the page if timeLeft is empty (countdown timer reached zero)
    if (Object.keys(timeLeft).length === 0 && timeLeft.constructor === Object) {
      window.location.reload();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, endTime]);

  return (
    <div>
      time left for attendance to close is {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s
    </div>
  );
};

export default CountdownTimer;
