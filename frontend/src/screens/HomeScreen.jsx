import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import {Row, Col} from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../components/shared/Loader";

const Homescreen = () =>
{
  const dispatch = useDispatch(); 
  const productList = useSelector(state=>state.productList);
  const { loading, error, products } = productList;
  
  /*eslint-disable */

  useEffect(() => {
    dispatch(listProducts());
  },[]);

  /*eslint-enable */

  return(
    <>
    {
        loading ? <Loader /> : error ?<h2>{error}</h2>:<Row>
          {
            products.map((product)=>(
              <Col key={product._id} md='3'><ProductScreen products={product}/></Col>
            ))
          }
        </Row>
    }   
    </>
  )
}

export default Homescreen;