import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Order = () => {
    const [orderlist, updateOrder] = useState([]);
    const getOrder = () => {
        
        var url = "http://localhost:4000/v1/myorders";
        
        axios.get(url).then(response => {
            
            updateOrder(response.data)
        })
    }
    useEffect(() => {
        getOrder();
    }, [])

    return (
        <div className="container mt-4">
            {
                orderlist.map((myorder, index) => {
                    console.log(myorder)
                    return (
                        <div className="row mb-4" key={index}>
                            <div className="col-lg-4">
                                <h4 className="text-center text-info"> Customer Details </h4>
                                <p> Name : {myorder.cname} </p>
                                <p> Mobile : {myorder.mobile} </p>
                                <p> Address : {myorder.address} </p>
                            </div>
                            <div className="col-lg-8">
                                <h4 className="text-center text-primary"> Product List </h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="bg-light text-primary">
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Photo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myorder.product.map((ele,index)=>{
                                            console.log(ele)
                                            return(
                                                <tr key={index}>
                                                    <td>{ele.pnane}</td>
                                                    <td>{ele.pprice}</td>
                                                    <td>
                                                        <img src={ele.pphoto} height="30" width="30" alt=""/>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                      
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Order;