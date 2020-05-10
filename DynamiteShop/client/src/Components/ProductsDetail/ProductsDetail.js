import React, { Component } from 'react';
import ProductItem from '../cpn/ProductItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { connect } from 'react-redux';
import { actFetchDataAllProductsRequest } from '../../actions/actFetchData';
import TitlePage from '../TitlePage/TitlePage';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  landscape: {
    breakpoint: { max: 767.98, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
class ProductsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      defaultBigImage: true,
      BigImage: '',
    };
  }
  listItems = () => {
    return <p>XIn chao</p>;
  };
  toggleBigImage = (idimg) => {
    this.setState({ defaultBigImage: false, BigImage: idimg });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({
      isRedirect: true,
    });
  };

  componentDidMount() {
    this.props.fetchDatabaseAllProducts();
  }
  showProductDetail = () => {
    return this.props.DbAllProducts.filter(
      (item) => item.id === this.props.match.params.id
    ).map((value, key) => {
      return (
        <div className="productDetail" key={key}>
          <div className="container">
            <div className="row">
              <div className="col-md-1 productDetail__smallImg">
                {value.src.map((img, key) => (
                  <img
                    onClick={(imgid) => this.toggleBigImage(img)}
                    key={key}
                    src={require('../../assets/img/products/' + img)}
                    alt="Small img"
                    className="img-fluid "
                  />
                ))}
              </div>
              <div className="col-md-5 productDetail__BigImage">
                {this.state.defaultBigImage ? (
                  <img
                    src={require('../../assets/img/products/' + value.src[0])}
                    alt="Big img"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src={require('../../assets/img/products/' +
                      this.state.BigImage)}
                    alt="Big img"
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="col-md-6">
                <h2 className="productDetail__name">{value.name}</h2>
                <span className="productDetail__status">
                  {value.status ? 'Stock up' : 'Sold out'}
                </span>
                <div className="productDetail__price">
                  <span>${value.price}</span>
                  {value.sale === true ? (
                    <span className="productDetail__price--oldPrice">
                      ${value.oldPrice}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div className="productDetail__description">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sunt eum tempora cupiditate cum dolor consequuntur beatae,
                    maiores illo autem neque sed unde, voluptatem veritatis
                    reprehenderit suscipit voluptates quas. Incidunt, molestiae!
                  </p>
                </div>
                {/* <form action="./addtocart" method="POST"> */}
                <form>
                  <div className="productDetail__quantity">
                    <div className="decrement">
                      <input
                        onClick={() =>
                          this.setState({
                            count:
                              this.state.count > 1 ? this.state.count - 1 : 1,
                          })
                        }
                        type="button"
                        value="-"
                        disabled={this.state.disabled}
                      />
                    </div>
                    <input
                      onChange={(event) =>
                        this.setState({
                          count: parseInt(event.target.value) || '',
                        })
                      }
                      type="number"
                      value={this.state.count}
                      step="1"
                    />
                    <div className="increment">
                      <input
                        onClick={() =>
                          this.setState({
                            count:
                              this.state.count > 0 ? this.state.count + 1 : 1,
                          })
                        }
                        type="button"
                        value="+"
                      />
                    </div>
                  </div>
                  <button
                    onClick={(event) => this.submitForm(event)}
                    type="submit"
                    className="single_add_to_cart_button"
                  >
                    ADD TO CART
                  </button>
                </form>
                <span className="posted_in">
                  Category:
                  <Link
                    className="tags"
                    to={'/product-category/' + value.productPortfolio}
                  >
                    {value.productPortfolio}
                  </Link>
                </span>
                <div className="social-icon">
                  <Link className="social-icon__item" to="#">
                    <FontAwesomeIcon
                      className="social-icon__item--facebook"
                      icon={faFacebookF}
                    />
                  </Link>
                  <Link className="social-icon__item" to="#">
                    <FontAwesomeIcon
                      className="social-icon__item--twitter"
                      icon={faTwitter}
                    />
                  </Link>
                  <Link className="social-icon__item" to="#">
                    <FontAwesomeIcon
                      className="social-icon__item--whatsapp"
                      icon={faWhatsapp}
                    />
                  </Link>
                  <Link className="social-icon__item" to="#">
                    <FontAwesomeIcon
                      className="social-icon__item--instagram"
                      icon={faInstagram}
                    />
                  </Link>
                  <Link className="social-icon__item" to="#">
                    <FontAwesomeIcon
                      className="social-icon__item--youtube"
                      icon={faYoutube}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    let count = 1;

    if (this.state.isRedirect === true) {
      console.log('  redirect to products');
      return <Redirect to="/all-products">;</Redirect>;
    }
    // console.log(this.props);     in ra tat ca cac props cua component nay
    // console.log(this.props.match.params.id);
    // console.log(this.props.match.params.name);
    return (
      <section className="Detail">
        <TitlePage
          slug={this.props.match.params.slug}
          name={this.props.match.params.name}
        ></TitlePage>
        {/* <h1>DAY LA TRANG DETAIL</h1> */}

        {this.showProductDetail()}
        <div className="related-product">
          <div className="container">
            <div className="heading-secondary">
              <h2 className="heading-secondary__title">RELATED PRODUCTS</h2>
              <div className="heading-secondary__icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
            <div className="list-products">
              <div className="container">
                <Carousel
                  arrows={true}
                  swipeable={true}
                  draggable={true}
                  // showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={this.props.deviceType !== 'mobile' ? true : false}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  // customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {this.props.DbAllProducts.filter(
                    (item) => item.id !== this.props.match.params.id
                  ).map((value, key) => {
                    if (count <= 9) {
                      count++;
                      return (
                        <ProductItem
                          key={key}
                          id={value.id}
                          src={value.src}
                          name={value.name}
                          price={value.price}
                          oldPrice={value.oldPrice}
                        ></ProductItem>
                      );
                    }
                    return false;
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    DbAllProducts: state.DbAllProducts,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDatabaseAllProducts: () => {
      dispatch(actFetchDataAllProductsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
