import React,{useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row,Col,ListGroup,Button,Image, ListGroupItem, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductsDetails } from "../actions/productActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/shared/Loader";

const ProductDetails = () =>{
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);   
  // const [quantity, setQuantity] = useState(0);   
  const dispatch = useDispatch(); 
  const productWithDetails = useSelector(state=>state.productDetails);
  const { loading, error, products } = productWithDetails;
  var check = false;
  /*eslint-disable */
  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [qty]);
  /*eslint-enable */
  

  const addToCartHandler = () => {
    if (check === false) {
      toast.warn("Product Unavailable!", {position: toast.POSITION.BOTTOM_RIGHT});
    }
    else {    
      navigate(`/cart/${id}/${qty}`);
    }
  }

  return(
    <>
    {
        loading ? <Loader />: error ?<h2>{error}</h2>:
      <>
        <Link to="/" className="btn btn-light">
            <i className="fas fa-arrow-left">&nbsp;</i>
            GO BACK</Link><Row>
              <Col md={6}>
                <Image src={products.image} alt={products.name} fluid></Image>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h1>{products.name}</h1>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating value={products.rating} text={`${products.numReviews} reviews`} />
                  </ListGroupItem>
                  <ListGroupItem>
                    Price : ${products.price}
                  </ListGroupItem>
                  <ListGroupItem>
                    {products.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Status :</Col>
                      <Col>{products.countInstock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                  </ListGroupItem>
                  {
                    products.countInstock > 0 ? <ListGroupItem>
                      {
                        check = true
                      }
                      <Row>
                        <Col md={4}>Quantity</Col>
                        <Col>
                          <Form.Group>
                            <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                              {[...Array(products.countInstock).keys()].map((x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                              )}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroupItem>
                      : <span></span>
                  }
                  <ListGroupItem>
                      <Row>
                      <Button className="btn-block" type="button" onClick={addToCartHandler}>
                        Add to cart</Button>
                      <ToastContainer />
                      </Row>
                  </ListGroupItem>
                  
                </ListGroup>
              </Col>
            </Row>
      </>
    }
    </>
  )
};

export default ProductDetails;