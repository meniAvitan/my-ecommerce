import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';


export default function SearchScreen(props) {
    const {name = 'all', category = 'all'} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;
    
    useEffect(()=>{
        dispatch(
            listProduct({
              name: name !== 'all' ? name : '',
              category: category !== 'all' ? category : '',
            })
          );
        }, [category, dispatch, name]);

    const getFilterUrl = (filter) =>{
        const filterCtegory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCtegory}/name/${filterName}`;

    }
    return (
        <div>
            <div className="row">
                {loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant = "danger">{error}</MessageBox>)
                : (
                    <div>{products.length} Result</div>
                )}
            </div>
                <div className="row top">
                    <div className="col-1">
                        <h3>Department</h3>
                        {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                <ul>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'active' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
                    
                </div>
                <div className="col-3">
                    {loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<MessageBox variant = "danger">{error}</MessageBox>)
                    : (
                        <>
                        {products.length === 0 && (
                          <MessageBox>No Product Found</MessageBox>
                        )}
                        <div className="row ">
                          {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                          ))}
                        </div>
                      </>
                    )}
                </div>
            </div>
            
        </div>
        
    )
}
