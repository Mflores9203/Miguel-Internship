import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
  const [topSeller, setTopSeller] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getTop() {
      const { data } = await axios.get(url);
      console.log(data);
      setTopSeller(data);
      setLoaded(true);
    }
    getTop();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loaded
                ? topSeller.map((topSeller) => (
                    <li key={topSeller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSeller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSeller.authorId}`}>
                          {topSeller.authorName}
                        </Link>
                        <span>{topSeller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        
                          <Skeleton
                            width={"50px"}
                            height={"50px"}
                            borderRadius={"50%"}
                          />
                          <i className="fa fa-check"></i>
                        
                      </div>
                      <div className="author_list_info">
                        
                          <Skeleton width={"120px"} height={"20px"} />
                        
                        <span>
                          {" "}
                          <Skeleton width={"50px"} height={"15px"} />
                        </span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
