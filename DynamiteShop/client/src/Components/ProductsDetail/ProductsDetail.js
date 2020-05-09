import React, { Component } from 'react';
import ProductItem from '../cpn/ProductItem';
import { connect } from 'react-redux';
import { actFetchDataAllProductsRequest } from '../../actions/actFetchData';
import TitlePage from '../TitlePage/TitlePage';
import Test from '../../Test/TestCounter';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
class ProductsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

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
        // <ProductItem
        // 	key={key}
        // 	id={value.id}
        // 	src={value.src}
        // 	name={value.name}
        // 	price={value.price}
        // 	oldPrice={value.oldPrice}
        // 	sale={value.sale}
        // ></ProductItem>
        <div className="productDetail" key={key}>
          <div className="container">
            <div className="row">
              <div className="col-md-1 productDetail__smallImg">
                {value.src.map((img, key) => (
                  <img
                    key={key}
                    src={require('../../assets/img/products/' + img)}
                    alt="Small img"
                    className="img-fluid "
                  />
                ))}
              </div>
              <div className="col-md-5 productDetail__bigImg">
                <img
                  src={require('../../assets/img/products/' + value.src[0])}
                  alt="Big img"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h2 className="productDetail__name">{value.name}</h2>
                <span className="productDetail__status">
                  {value.status ? 'Stock up' : 'Sold out'}
                </span>
                <div className="productDetail__price">
                  <span>{value.price}</span>
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
                <span className="span posted_in">
                  Category:
                  <Link
                    className="tags"
                    to={'/product-category/' + value.productPortfolio}
                  >
                    {value.productPortfolio}
                  </Link>
                </span>
                <div className="social-icon">
                  <Link className="social-icon__item" to="/clothes-footwear">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Link>
                  <Link className="social-icon__item" to="/clothes-footwear">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                  <Link className="social-icon__item" to="/clothes-footwear">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </Link>
                  <Link className="social-icon__item" to="/clothes-footwear">
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link className="social-icon__item" to="/clothes-footwear">
                    <FontAwesomeIcon icon={faYoutube} />
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
    if (this.state.isRedirect === true) {
      console.log('  redirect to products');
      return <Redirect to="/all-products">;</Redirect>;
    }
    // console.log(this.props);     in ra tat ca cac props cua component nay
    // console.log(this.props.match.params.id);
    // console.log(this.props.match.params.name);
    console.log(this.state.count);
    return (
      <section className="Detail">
        <TitlePage
          slug={this.props.match.params.slug}
          name={this.props.match.params.name}
        ></TitlePage>
        <h1>DAY LA TRANG DETAIL</h1>

        {this.showProductDetail()}
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
