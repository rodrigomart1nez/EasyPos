import React from "react";
import { Link } from 'react-router-dom'
import './Home.css'

export default class Home extends React.Component {



    render () {
        return (
            <React.Fragment>
                <br />
                <h1 className='ui huge centered header' style={{'fontSize': '60px'}}>EASY POS</h1>
                <br />
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">Or</div>
                        <div className="middle aligned row">
                            <div className="column">
                                <div className="ui icon header">
                                    <i className="boxes icon"></i>
                                    My Products
                                </div>
                                <Link to='/products' className="ui primary button">
                                    Manage
                                </Link>
                            </div>
                            <div className="column">
                                <div className="ui icon header">
                                    <i className="shopping cart icon"></i>
                                    Point Of Sale
                                </div>
                                <Link to='/pos' className="ui primary button">
                                    Start Selling
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
