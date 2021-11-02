import React ,{useState, useEffect} from 'react';
import axios from 'axios';
const ProductList = () =>{
   
    const[allProduct , UpdateProduct] = useState([]);
    const getProduct = () =>{
        var url = "http://localhost:4000/v1/products";
        axios.get(url).then(response=>{
            UpdateProduct(response.data)
        })
    }
    useEffect(()=>{
        getProduct();
    },[])

    const[msg , updateMessage] = useState("");
    const addToCart = (itemInfo) =>{
        var url = "http://localhost:4000/v1/mycart";
        axios.post(url , itemInfo).then(response=>{
            updateMessage("Item Added in Cart Successfully");
            window.location.reload();
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3 className="text-danger"> {allProduct.length}  - Products for purchage </h3>
                   <p className="text-center"> {msg} </p>
                </div>
            </div>
            <div className="row mt-3 text-center">
                {
                    allProduct.map((pinfo , index)=>{
                        return(
                        <div className="col-lg-3 mb-3" key={index}>
                            <div className="bg-light p-2 rounded">
                                <h4> {pinfo.pname} </h4>
                                <img src={pinfo.pphoto} height="120" width="100%" className="rounded" alt=""/>
                                <p> {pinfo.details}  </p>
                                <small className="text-primary"> {pinfo.pprice} </small>
                                <br/>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={addToCart.bind(this, pinfo)}> 
                                    + Add To Cart 
                                </button>
                            </div>
                        </div>  
                        )
                    })
                }
               
            </div>
        </div>
    )
}
export default ProductList;