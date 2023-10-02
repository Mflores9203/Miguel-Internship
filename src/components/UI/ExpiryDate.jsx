import React, { useEffect, useState } from "react";

const ExpiryDate = ({ newItem }) => {
  const [dateExpired, setDateExpired] = useState(
    Math.floor((newItem.expiryDate - Date.now()) / 1000)
  );

  useEffect(() => {
    setTimeout(() => {
      setDateExpired(dateExpired - 1);
    }, 1000);
  }, [dateExpired]);

  function timeCountdown() {
    if (dateExpired > 0) {
      const seconds = dateExpired;
      const minutes = seconds / 60;
      const hours = Math.floor(minutes / 60);
      const secondsRemain = (seconds % 60) % 60;
      const minutesRemain = Math.floor(minutes % 60);
      return `${hours}h ${minutesRemain}m ${secondsRemain}s`;
    }
    if (dateExpired - Date.now() === 0) {
      return "EXPIRED";
    }
  }
  timeCountdown();

  return (
    <>
      {newItem.expiryDate ? (
        <div className="de_countdown">{timeCountdown(dateExpired)}</div>
      ) : null}
    </>
  );
};

export default ExpiryDate;
