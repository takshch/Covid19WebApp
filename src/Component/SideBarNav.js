import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';

export default function SideBarNav(){
    return (<React.Fragment>
            
                <div className="SideBarNav">
                    <div className="inner-container">
                        <li className="active">
                            <a href="#b">
                                <img alt="" src="https://img.icons8.com/nolan/50/coronavirus.png"/>
                            </a>
                        </li>
                        <li><a href="#a"></a></li>
                        <li><a href="#d"></a></li>
                        <li><a href="#d"></a></li>
                    </div>
                </div>
    </React.Fragment>);
}