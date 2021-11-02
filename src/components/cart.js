import React ,{useState, useEffect} from 'react';
import axios from 'axios';
const CartList = () =>{
    const[cartitem , updateCart] = useState([]);
    const getCart = () =>{
        var url = "http://localhost:4000/v1/mycarts";
        axios.get(url).then(response=>{
            updateCart(response.data)
        })
    }
    useEffect(()=>{
        getCart();
    },[])

    // const removeItem = (id) => {
    //     axios.delete("http://localhost:4000/v1/mycart/" + id)
    //         .then(response => {
    //         window.location.reload();
    //         getCart();

    //     })
    // };
    const removeItem =(id)=> {
         fetch("http://localhost:4000/v1/mycart/" + id, {
          method: "delete",
        }).then(response=>{
            console.log(response)
            window.location.reload();
        })
      }
      

    const[cname , PickName] = useState("");
    const[mobile , PickMobile] = useState("");
    const[address , PickAddress] = useState("");
    const[message , updateMessage] = useState("");

    const save = () =>{
        var url = "http://localhost:4000/v1/myorder/";
        var data = { "cname":cname, "mobile":mobile, "address":address,"product":cartitem };
        axios.post(url , data)
        .then(response=>{
            updateMessage("Your Order Placed Successfully!")
            window.location.reload();
        })
    }

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-5">
                    <h4 className="text-center text-info"> Customer Details </h4>
                    <div className="mb-3">
                        <label>Customer Name</label>
                        <input type="text" className="form-control" onChange={obj=>PickName(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label>Mobile No</label>
                        <input type="text" className="form-control" onChange={obj=>PickMobile(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label>Delivery Address</label>
                        <textarea className="form-control" onChange={obj=>PickAddress(obj.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary btn-lg m-2" onClick={save}> Place My Order </button>
                    </div>
                </div>
                <div className="col-lg-7">
                    <h4 className="text-center text-danger"> {cartitem.length} - Items In Cart </h4>
                    <p className="text-center text-success m-2">{message}</p>
                   <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                               cartitem.map((pinfo,index)=>{
                                   const _id=pinfo._id
                                   return(
                                       <tr key={index}>
                                           <td>{pinfo.pname}</td>
                                           <td>{pinfo.pprice}</td>
                                           <td> 
                                                <img src={pinfo.pphoto} height="30" width="30" alt=""/>
                                            </td> 
                                            <td> 
                                                <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={removeItem.bind(this,_id)}>Remove</button> 
                                            </td>
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

export default CartList;