import React, { useEffect, useState } from "react";

const ExpiryDate = ({ newItem }) => {
  const [dateExpired, setDateExpired] = useState(
    Math.floor((newItem.expiryDate - Date.now()) / 1000)
  );

  useEffect(() => {
    setTimeout(() => {
        
        setDateExpired(dateExpired - 1);
    }, 1000);
  }, []);

  function timeCountdown() {
    if (dateRelease > 0) {
        const seconds = dateExpired
        const minutes = seconds /60
        const hours = Math.floor(minutes / 60)
        console.log(hours)
    }
    
  }
  timeCountdown();

  return <div className="de_countdown">{newItem.expiryDate}</div>;
};

export default ExpiryDate;
