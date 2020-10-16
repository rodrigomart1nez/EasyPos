import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header'
import Home from './Home'
import POS from './POS'
import history from '../history';
import ProductCreate from './products/ProductCreate';
import ProductEdit from './products/ProductEdit';
import ProductDelete from './products/ProductDelete';
import ProductList from './products/ProductList';
import PosDelete from './POS/PosDelete'
import Recipt from './POS/Recipt'



const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                    <div>
                            <Header />
                        
                            <Route path="/" exact component={Home}/>
                            <Route path="/products" exact component={ProductList} />
                            <Route path="/products/new" exact component={ProductCreate} />
                            <Route path="/products/edit/:id" exact component={ProductEdit} />
                            <Route path="/products/delete/:id" exact component={ProductDelete} />

                            <Route path="/register" exact component={Recipt} />
                            <Route path="/pos" exact component={POS} />
                            <Route path="/pos/delete/:id" exact component={PosDelete} />
                        
                    </div>
            </Router>
        </div>
    );
};

export default App