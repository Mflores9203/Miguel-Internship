import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExpiryDate = ({ nft, authorId }) => {
  const [dateExpired, setDateExpired] = useState(
    Math.floor((nft.expiryDate - Date.now()) / 1000)
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
    <div key={nft.id} className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${nft.authorId}`}data-bs-toggle="tooltip" data-bs-placement="top">
          <img className="lazy" src={nft.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {nft.expiryDate ? (
        <div className="de_countdown">{timeCountdown(dateExpired)}</div>
      ) : null}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <Link to={`/item-details/${nft.nftId}`}>
          <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${nft.nftId}`}>
          <h4>{nft.title}</h4>
        </Link>
        <div className="nft__item_price">{nft.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{nft.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpiryDate;
