import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';
import ProductList from './homeproduct';
import CartList from "./cart"

const Home = () => {
    
    const [show, setShow] = useState(false);
    const [cartitem, updateCart] = useState([]);
    const getCart = () => {
        var url = "http://localhost:4000/v1/mycarts";
        axios.get(url).then(response => {
            updateCart(response.data)
        })
    }

    useEffect(() => {
        getCart();
    }, [])

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
                             Shopping App
                        </Link>
                        <div class={`collapse navbar-collapse ${show ? "show" : ""}`}>
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/mycart">My Cart ( {cartitem.length} ) </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/login" target="_new">Vendor Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
            <br /><br /><br />
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/mycart" component={CartList} />

            </Switch>
        </>
    )
}

export default Home;




