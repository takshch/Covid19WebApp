import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import styled from 'styled-components';
import CovidSearch from './CovidSearch';


export default class MainBody extends React.Component{

    
    render(){
        
         var jxsit = Object.keys(this.props.data.Global).sort(function(a,b){
             if(a.indexOf("Total") !== -1) return -1;
             else if(a.indexOf("New") !== -1) return 1;
             else return 
         }).map((key,index)=>{
            //  console.log("index: ", index);
             let color ="";
             if(index === 0 || index % 3 === 0) color ="#FA528F" 
             else if(index === 1 || index%3 === 1) color = "#FA991C"
             else if(index === 2 || index%3 === 2) color = "#0FCA00"
             return (<MDBCol lg="4" sm="6">
                        <CovDataComp color={color}>
                            <span>{String(this.props.data.Global[key]).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')}</span>
                            <span>{key.replace(/([A-Z])/g,' $1').trim() }</span>
                        </CovDataComp>
                    </MDBCol>);
         });

        return (<React.Fragment>
            <MDBContainer fluid className="main-body">
                <MDBRow style={{"margin-left":"15px"}}>
                    <MDBCol lg="8" md="12" size="12" className="mt-3">
                        <DashBoardTitle>
                            Dashboard Covid<span>-19</span> | Global Record
                        </DashBoardTitle>
                        <MDBRow className="mt-2">
                            {jxsit}
                        </MDBRow>
                        <HrLine />
                    </MDBCol>
                    <MDBCol lg="4" md="12" size="12">
                        <CovidSearch data={this.props.data.Countries} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </React.Fragment>);
    }
}


const DashBoardTitle = styled.div`
            color: #fff;
            font-weight: 400;
            letter-spacing: 1px;
            font-size: 1.05rem;
            position: relative;
            padding-bottom: 5px;
            padding-left: 10px;
            span{
                color: #999999;
            }
            :before{
                position: absolute;
                content: '';
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #242424;
            }
        `;
const CovDataComp = styled.div`
            color: #fff;
            font-size: 1.3rem;
            letter-spacing: 1px;
            margin: auto 10px;
            padding: 15px 0px 5px;
            text-align: center;
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(36,36,36,0.25);
            margin-bottom: 15px;
            span{
                letter-spacing: 1px;
            }
            span:nth-child(1){
                font-size: 1.5rem;
                color: ${props => props.color};
            }
            span:nth-child(2){
                font-size: 0.9rem;
                color: #696969;
            }
         `;   

const HrLine = styled.div`
            position: relative;
            display: block;
            width: 100%;
            height: 2px;
            background: #242424;
        `;
     