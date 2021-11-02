import React,{useState, useEffect} from 'react';
import axios from 'axios';
const VendorHome = () =>{

    const[allProduct , UpdateProduct] = useState([]);
    const getProduct = () =>{
        var url = "http://localhost:4000/v1/products";
        axios.get(url).then(response=>{
            UpdateProduct(response.data)
        })
    }

    
    const[allOrder , UpdateOrder] = useState([]);
    const getOrder = () =>{
        var url = "http://localhost:4000/v1/myorders";
        axios.get(url).then(response=>{
            UpdateOrder(response.data)
        })
    }
    useEffect(()=>{
        getProduct();
        getOrder(); // this line too
    },[])

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 mb-5">
                    <h2 className="text-center text-warning"> Welcome Vendor </h2>
                </div>

                <div className="col-lg-6">
                    <div className="p-5 bg-light text-center rounded">
                        <h3 className="text-primary"> {allProduct.length} <br/> My Total Products </h3>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-5 bg-light text-center rounded">
                        <h3 className="text-primary"> {allOrder.length} <br/> My Total Orders </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorHome;

