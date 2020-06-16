import React from "react";
import styled from "styled-components";
import { MDBContainer } from "mdbreact";
import Scrollbar from "react-scrollbars-custom";
import { Scrollbars } from "react-custom-scrollbars";

export default class CovidSearch extends React.Component {
  constructor(props) {
    super(props);
    let tempData = this.props.data
      .sort((a, b) => {
        if (a.TotalConfirmed > b.TotalConfirmed) return -1;
        else if (a.TotalConfirmed < b.TotalConfirmed) return 1;
        else return 0;
      })
      .slice(0, 15);
    this.state = {
      searchStatus: "",
      tempData: tempData,
      searchTempData: this.props.data,
      staticData: this.props.data,
      page: 10,
      listIndex: 15,
    };
  }

  addData = (val) => {
    // console.log("Cahge");
    let prevScrollTop = val.scrollTop;
    if (val.top === 1) {
      this.setState({ searchStatus: "Loading..." });
      let range = this.state.listIndex + 10;
      if (this.state.searchTempData.length > range) {
        let data = this.state.searchTempData.slice(
          0,
          this.state.listIndex + 10
        );
        this.setState({ tempData: data, listIndex: this.state.listIndex + 10 });
      }
      this.setState({ searchStatus: "" });
    }
  };

  searchData = (e) => {
    if (e.target.value !== "") {
      let keyword = e.target.value.toLowerCase();
      // console.log("staticData:",this.state.staticData);
      // console.log(keyword);
      this.setState({ searchStatus: "Loading..." });
      let data = this.state.staticData
        .filter(function (value) {
          if (value["Country"].toLowerCase().indexOf(keyword) !== -1)
            return true;
          else return false;
        })
        .sort((a, b) => {
          if (a.TotalConfirmed > b.TotalConfirmed) return -1;
          else if (a.TotalConfirmed < b.TotalConfirmed) return 1;
          else return 0;
        });

      if (Array.isArray(data) && data.length === 0) {
        // console.log("data: ",data);
        this.setState({ searchStatus: "Record Not Found" });
      } else {
        this.setState({ searchStatus: "" });
      }

      this.setState({ searchTempData: data }, () => {
        if (Array.isArray(data) && data.length !== 0) {
          let temp = data.slice(0, 20);
          this.setState({ listIndex: 20 });
          this.setState({ tempData: temp });
        }
      });
    } else if (e.target.value === "") {
      this.setState({ listIndex: 15 });
      let tempData = this.state.staticData.sort((a, b) => {
        if (a.TotalConfirmed > b.TotalConfirmed) return -1;
        else if (a.TotalConfirmed < b.TotalConfirmed) return 1;
        else return 0;
      });
      this.setState({
        searchTempData: tempData,
        tempData: tempData.slice(0, 15),
        searchStatus: "",
      });
    }
  };

  render() {
    let jxsit = this.state.tempData.map((val) => {
      return (
        <li>
          <span>{val.Country}</span>
          <span>
            {String(val.TotalConfirmed).replace(
              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
              "$1,"
            )}
          </span>
        </li>
      );
    });
    return (
      <React.Fragment>
        <SearchWrapper>
          <span>World Report</span>
          <SearchBoxInput
            type="text"
            placeholder="Search here..."
            onChange={this.searchData}
          />
          <SearchHeading>
            <span>Country</span>
            <span>Cases</span>
          </SearchHeading>
          <SearchCountryWrapper id="SearchCountryList">
            <Scrollbars
              renderThumbVertical={(props) => (
                <div {...props} className="ScrollbarsCustom-Thumb" />
              )}
              onUpdate={this.addData}
            >
              <SearchCountryList>
                {console.log("listIndex: ", this.state.listIndex)}
                {this.state.searchStatus !== "Record Not Found" ? jxsit : ""}
                {this.state.searchStatus !== "" ? (
                  <div className="text-center">{this.state.searchStatus}</div>
                ) : (
                  ""
                )}
              </SearchCountryList>
            </Scrollbars>
          </SearchCountryWrapper>
        </SearchWrapper>
      </React.Fragment>
    );
  }
}

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  color: #fff;
  padding: 8px 0px;
  border: 2px solid #4a4a4a;
  margin-top: 25px;
  > span {
    color: #fff;
    font-weight: 400;
    font-size: 1.05rem;
    position: relative;
    padding-bottom: 3px;
    padding-left: 10px;
  }
`;

const SearchBoxInput = styled.input`
  border: 1px solid #242424;
  background: #000;
  margin: 5px 10px;
  height: 40px;
  outline: 0;
  padding: 3px 5px 0px 10px;
  color: #fff;
  ::placeholder {
    color: #fff;
  }
  :focus {
    border: 1px solid #fff;
  }
`;

const SearchCountryWrapper = styled.div`
  display: block;
  position: relative;
  height: 245px;
  margin: 10px 0px;
  margin-left: 5px;
  margin-top: 0;
  overflow-y: auto;
`;

const SearchCountryList = styled.ul`
  display: block;
  width: 100%;
  margin: 0;
  padding-right: 10px;
  padding-left: 0px;
  top: 0;
  left: 0;
  list-style-type: none;
  li {
    // font-weight:400;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // color: ;
    :hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  li > span {
    color: #a7a7a7;
  }
  li > span:first-child {
    flex: 4;
  }
  li > span:last-child {
    flex: 1;
    text-align: center;
  }

  @media (max-width: 365px) {
    li > span:first-child {
      flex: 6 !important;
    }
    li > span:last-child {
      flex: 2 !important;
      text-align: center;
    }
  }
`;

const SearchHeading = styled.div`
  width: 100%;
  // border: 1px solid #fff;
  padding-left: 10px;
  padding-right: 15px;
  margin-top: 10px;
  margin-bottom: 3px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    flex: 4;
  }
  span:last-child {
    flex: 1;
    text-align: center;
  }
`;
