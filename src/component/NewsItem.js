import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    //destructuring using js
    let { title, description, url, imageurl, author, date ,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
         <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
         <span className="badge rounded-pill bg-danger" style={{left:"90%" ,zIndex:'1'}} > {source} </span>
         </div>
          <img src={!imageurl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
               </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={url}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
