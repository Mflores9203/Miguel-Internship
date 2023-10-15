import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import AuthorNft from "../UI/AuthorNft";

const AuthorItems = ({authorData, authorImg, authorId}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorData?.map((authorData)=> (
            <AuthorNft
            key={authorData.id}
            authorData={authorData}
            authorId={authorId}
            authorImg={authorImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
