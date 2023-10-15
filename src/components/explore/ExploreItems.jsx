import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ExpiryDateNft from "../UI/ExpiryDateNft";
import Skeleton from "../UI/Skeleton";
import NewItems from "../home/NewItems";

const ExploreItems = () => {
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const [expItem, setExpItem] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    async function getExpItems() {
      const { data } = await axios.get(url);
      setExpItem(data);
      setLoaded(true);
      setVisibleItems(data.slice(0, 8));
    }

    getExpItems();
  }, []);

  function filterItems(event) {
    const value = event.target.value;
    const lowToHigh = [...expItem].sort((a, b) => a.price - b.price);
    const highToLow = [...expItem].sort((a,b) => b.price - a.price) 
    const likes = [...expItem].sort((a,b)=> b.likes - a.likes)

    if (loaded) {
      if ((value === "")) {
        setVisibleItems(visibleItems.length);
      }
      if ((value === "price_low_to_high")) {
        setVisibleItems(lowToHigh.slice(0, visibleItems.length));
      }
      if ((value === "price_high_to_low")) {
        setVisibleItems(highToLow.slice(0, visibleItems.length));
      }
      if ((value === "likes_high_to_low")) {
        setVisibleItems(likes.slice(0, visibleItems.length));
      }
      
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" onChange={filterItems} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loaded
        ? visibleItems.map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ExpiryDateNft nft={nft} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={"100%"} height={"440px"} />
            </div>
          ))}
      {visibleItems.length !== 16 ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            onClick={() => {
              if (visibleItems.length === 8) {
                setVisibleItems(expItem.slice(0, 12));
              } else if (visibleItems.length === 12) {
                setVisibleItems(expItem.slice(0, 16));
              } else {
                setVisibleItems(visibleItems);
              }
            }}
            id="loadmore"
            className="btn-main lead"
            data-aos="fade"
            data-aos-duration="1000" 
          >
            Load more
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExploreItems;
