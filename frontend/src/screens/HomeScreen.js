import React, { useEffect } from 'react';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';


export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProduct({}));
    }, [dispatch]);
    return (
    <div>
        {loading ? <LoadingBox></LoadingBox>
        :
        error ? <MessageBox variant = "danger">{error}</MessageBox>
        :<div className="row center">
        {products.map((product) =>(
            <Product key={product._id} product= {product}></Product>
        ))}  
   </div> 
   }
        
    </div>
    );
}
