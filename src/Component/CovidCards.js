import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage,MDBCardText,MDBRow,MDBCol, MDBCardTitle, MDBContainer, MDBCardHeader } from 'mdbreact';

export default class CovidCard extends React.Component{
    render(){
        var jxsit = Object.keys(this.props.data).map((key)=>{
            return <MDBCol sm="4"  className="pink lighten-1 text-center my-2 mx-auto ">
                    <div className="headerColor">{key.replace(/([A-Z])/g," $1").trim()}</div>
                    <div className="text-white mt-1">{this.props.data[key]}</div>
                </MDBCol>
        })
        if(this.props.type === "global"){
            return  (<React.Fragment>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol size="8">
                        <MDBCard className="d-flex justify-content-center">
                            <MDBCardHeader className="blue lighten-1 text-white text-center">
                                <h4 className="m-0">Global Record</h4>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBContainer>
                                    <MDBRow>{jxsit}</MDBRow>
                                </MDBContainer>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </React.Fragment>);
        }
    }
}

