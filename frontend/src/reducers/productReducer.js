import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILS, PRODUCT_DETAILS_FAILS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state={products:[]},action) =>{
  switch(action.type){
    case PRODUCT_LIST_REQUEST:
      return {loading:true, products:[]};
    case PRODUCT_LIST_SUCCESS:
      return {loading:false, products:action.payload};
    case PRODUCT_LIST_FAILS:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
};

export const productDetailsReducer = (state={products:{reviews:[]}},action) =>{
  switch(action.type){
    case PRODUCT_DETAILS_REQUEST:
      return {loading:true,products:{products:{reviews:[]}}};
    case PRODUCT_DETAILS_SUCCESS:
      return {loading:false, products:action.payload};
    case PRODUCT_DETAILS_FAILS:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
};