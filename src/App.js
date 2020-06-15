import React, {Component} from 'react';
import CovidCard from './Component/CovidCards';
import SideBarNav from './Component/SideBarNav';
import MainBody from './Component/MainBody';
import { MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import styled from 'styled-components';


export default class App extends Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            apiLink: "https://api.covid19api.com/summary",
            staticData: {},
            tempData: [],
            viewMoreLoading: false,
        };
    }
    
    componentDidMount(){
        try{
            fetch(this.state.apiLink).then(data => data.json())
            .then(json=>{
                this.setState({staticData: json},()=>{
                    this.setState({isLoading: false});
                    console.log(json);
                });
            });
        }catch(error){
            console.log(error);
        }
    }

    render(){

        if(this.state.isLoading){
            return <h1 className="d-flex justify-content-center">Loading...</h1>
        }
        return <React.Fragment>
                    <SideBarNav lg="1" size="0" xs="0" sm="0" md="0"/>
                    <MainBody data={this.state.staticData}/>
            {/* <CovidCard data={this.state.staticData.Global} type="global"/> */}
        </React.Fragment>
    }
}

