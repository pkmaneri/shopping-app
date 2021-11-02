import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Order from './order';
import Product from './product';
import VendorHome from './venderhome';
const Dashboard = () => {
    const [show, setShow] = useState(false);
    
    
    return (
        <>
            <section className="navbar-bg">
                <nav class="navbar navbar-expand-lg navbar-light ">
                    <div class="container">
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setShow(!show)}>
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <Link class="navbar-brand" href="#">
                            Vendor App
                        </Link>
                        <div class={`collapse navbar-collapse ${show ? "show" : ""}`}>
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/dashboard/product">Products </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/dashboard/myorder" target="_new">Orders</Link>
                                </li>
                                <button className="btn btn-warning" onClick={logout}>
                                    Welcome - {localStorage.getItem("name")} Logout
                                </button>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>


            <Switch>
                <Route exact path="/dashboard" component={VendorHome} />
                <Route exact path="/dashboard/product" component={Product} />
                <Route exact path="/dashboard/myorder" component={Order} />
            </Switch>
        </>
    )
}
export default Dashboard;

const logout = () => {
    localStorage.clear(); // it will delete all contents from local storage
    window.location.href = "http://localhost:3000/#/login";
    window.location.reload();
}