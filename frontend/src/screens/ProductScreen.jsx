import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating"; 
import { Link } from "react-router-dom";
const ProductScreen = ({products}) =>{
    return(
      <>
        <Card className="my-3 p-3 rounded">
          <Link to={`/product/${products._id}`}>
            <Card.Img src={products.image}/>
          </Link>
          <Card.Body>
            <Link to={`/product/${products._id}`}>
              <Card.Title as='div'>
                <strong>{products.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text as='div'>
              <Rating value={products.rating} text={`${products.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as='div'>
              $ {products.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
}

export default ProductScreen;