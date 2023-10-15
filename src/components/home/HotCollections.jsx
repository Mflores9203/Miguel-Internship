import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Skeleton from "../UI/Skeleton.jsx";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function getHotCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollection(data);
      setTimeout(() => {
      setLoaded(true)
        
      }, 1000);
    }
    getHotCollections();
  }, []);

  return (
    <section  data-aos="fade"
    data-aos-duration="1000" id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider className="slider" {...settings}>
            {loaded ? 
            
            collection.map((collections) => (
              <div className="nft_coll-wrapper" key={collections.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collections.nftId}`}>
                      <img
                        src={collections.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={collections.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collections.title}</h4>
                    </Link>
                    <span>ERC-{collections.code}</span>
                  </div>
                </div>
              </div>
            )) : new Array(4).fill(0).map((_, index) => (
              <div  key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <div src=''  className="lazy img-fluid skeleton skeleton__hot-collections--img" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <div className="lazy pp-coll skeleton skeleton__hot-collections--author--img" src='' alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4 className="skeleton skeleton__hot-collections--title">NFT TITLE</h4>
                    </Link>
                    <span className="skeleton skeleton__hot-collections--code">NFT CODE</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

function LeftArrow(props) {
  const { onClick } = props;
  return <ChevronLeftIcon className="arrow arrow__left" onClick={onClick} />;
}

function RightArrow(props) {
  const { onClick } = props;
  return <ChevronRightIcon className="arrow arrow__right" onClick={onClick} />;
}
