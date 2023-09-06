import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  capitalizeFirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("hello am constructor of news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstletter(this.props.category)} - NewMonkeyy`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=277b71e35e224af084f252ba6c20096e &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ Loader: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      Loader: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    console.log("cdm");
    this.updateNews();
   
  }

  handlenextbtn = async () => {
   
    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  handleprevbtn = async () => {
    
    this.setState({page:this.state.page-1});
    this.updateNews();
  }

   fetchMoreData = async() => {
   this.setState({page:this.state.page +1});
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=277b71e35e224af084f252ba6c20096e &page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //  this.setState({ Loader: true });
   let data = await fetch(url);
   let parseddata = await data.json();
   console.log(parseddata);
   this.setState({
     articles: this.state.articles.concat(parseddata.articles),
     totalResults: parseddata.totalResults,
   
   });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px", marginTop:'90px' }}>
          NewsMonkeyy - Top { this.capitalizeFirstletter(this.props.category)} Headlines
        </h1>
        {this.state.Loader && <Spinner />}
        {/* This is a News Component. */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>}
        >    
        <div className="container">        
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : " "}
                  description={
                    element.description ? element.description.slice(0, 88) : " "
                  }
                  imageurl={element.urlToImage}
                  url={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name}
                ></NewsItem>
              </div>
            );
          })}
        </div></div>
        </InfiniteScroll>
       
      </div>
    );
  }
}

export default News;
