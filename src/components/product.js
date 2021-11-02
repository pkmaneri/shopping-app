import React,{useState, useEffect} from 'react';
import axios from 'axios';

const Product = () =>{
    const[name , pickName] = useState("");
    const[price , pickPrice] = useState("");
    const[photo , pickPhoto] = useState("");
    const[details , pickDetails] = useState("");
    
    const[msg , updateMessage] = useState("");
    const save = () =>{
        var data={
            "pname":name, 
            "pprice":price, 
            "pphoto":photo, 
            "details":details, 
            "vid":localStorage.getItem("id")
        };
        var url = "http://localhost:4000/v1/product";
        axios.post(url , data).then(response=>{
            updateMessage("Product Save Successfully !");
            getProduct();
        })
    }

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
    
    const handleDelete=(id)=>{
        
        axios.delete("http://localhost:4000/v1/product/"+ id)
        .then(response => {
            console.log(response)
            getProduct();
        })
}


    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <h4 className="text-center text-primary">Add New Product</h4>
                    <div className="mb-2">
                        <label>Product Name</label>
                        <input type="text" className="form-control" 
                        onChange={obj=>pickName(obj.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Product Price</label>
                        <input type="text" className="form-control"
                        onChange={obj=>pickPrice(obj.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Product Photo</label>
                        <input type="text" className="form-control"
                        onChange={obj=>pickPhoto(obj.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Product Details</label>
                        <textarea className="form-control"
                        onChange={obj=>pickDetails(obj.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={save}>Save Product</button>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h4 className="text-center"> {allProduct.length} Available Products </h4>
                    <p className="text-danger text-center"> {msg} </p>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="bg-light text-primary">
                                <th>Product Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allProduct.map((pinfo , index)=>{
                                    const _id=pinfo._id
                                    return(
                                        <tr key={index}>
                                            <td> {index} </td>
                                            <td> {pinfo.pname} </td>
                                            <td> {pinfo.pprice} </td>
                                            <td> 
                                                <img src={pinfo.pphoto} height="50" width="50" alt=""/>
                                            </td> 
                                            <td> {pinfo.details} </td>
                                            <td >
                                            <button className="btn btn-danger" 
                                            onClick={handleDelete.bind(this,_id)}>Delete</button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product;