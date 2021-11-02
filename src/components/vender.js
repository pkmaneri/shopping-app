import React,{useState} from 'react';
import axios from 'axios';

const Vendor = () =>{
    //for register
        const[name , processName] = useState("");
        const[email , processEmail] = useState("");
        const[password , processPassword] = useState("");
        const[mobile , processMobile] = useState("");
        
        const[msg , updateMessage] = useState("");
        const save = () =>{
            var data = {"vendorname":name, "email":email, "password":password, "mobile":mobile};
            var url = "http://localhost:4000/v1/vendor";
            axios.post(url, data).then(response=>{
                updateMessage("Vendor Registered Successfully !");
                processName("");
                processEmail("");
                processPassword("");
                processMobile("");
            })
        }
    // register end here

    const[username , pickUsername] = useState("");
    const[pass , pickPassword] = useState("");
    const[loginMsg , updateLoginMsg] = useState("");

    const goLogin = () =>{
        updateLoginMsg("Please Wait....");
        var loginStatus = false;
        var url = "http://localhost:4000/v1/vendors";
        axios.get(url).then(response=>{
            for(var i=0; i<response.data.length; i++){
                var vemail = response.data[i].email; // this is coming from vendor.json
                var vpass = response.data[i].password; // this is coming from vendor.json
                if(username===vemail && pass===vpass){
                    updateLoginMsg("Success : Please Wait Redirecting...");
                    loginStatus = true;
                    localStorage.setItem("name",  response.data[i].vendorname);
                    localStorage.setItem("id",  response.data[i].id);
                    localStorage.setItem("mobile",  response.data[i].mobile);
                    window.location.href="http://localhost:3000/dashboard"; // redirect to dashboard
                    // window.location.reload();
                    break;
                }
            } // for loop end here
           if(loginStatus===false){
            updateLoginMsg("Fail : Invalid Login Details Or Not Exist !"); 
           } 
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-4"  >
                    <div className="bg-light p-3 rounded" >
                        <h3 className="text-center text-info"> Vendor Login </h3>
                        <hr/>
                        <p className="text-center text-danger">{loginMsg}</p>
                        <div className="mb-3">
                            <label>Email Id</label>
                            <input type="text" className="form-control" autocomplete="off"
                            onChange={obj=>pickUsername(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" autocomplete="off"
                            onChange={obj=>pickPassword(obj.target.value)}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={goLogin}> Login </button>
                        </div>
                    </div>

                </div>
                
                <div className="col-lg-1"></div>
                <div className="col-lg-4">
                    <div className="bg-light p-3 rounded">
                        <h3 className="text-center text-primary"> Vendor Register </h3>
                        <p className="text-danger text-center">{msg}</p>
                        <hr/>
                        <div className="mb-3">
                            <label>Vendor Name</label>
                            <input type="text" className="form-control" value={name}
                            onChange={obj=>processName(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Contact Number</label>
                            <input type="text" className="form-control" value={mobile}
                            onChange={obj=>processMobile(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Email Id</label>
                            <input type="text" className="form-control" value={email}
                            onChange={obj=>processEmail(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password}
                            onChange={obj=>processPassword(obj.target.value)}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}> Register </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vendor;