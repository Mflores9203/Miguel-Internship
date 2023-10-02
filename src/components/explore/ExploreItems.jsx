import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ExpiryDate from "../UI/ExpiryDate";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const [expItem, setExpItem] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getExpItems() {
      const { data } = await axios.get(url);
      console.log(data);
      setExpItem(data);
      setLoaded(true);
    }

    getExpItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loaded
        ? expItem.map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ExpiryDate nft={nft} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
                <Skeleton width={'100%'}
                height={'440px'}/>
            </div>
          ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
