import * as React from "react";
import "./NavStructure.css";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Header from "./Header";

interface IProps {
    handleSearch(e: any): any;
}

export default class NavStructure extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="nav-structure">
                <Header />
                <SearchBar handleSearch={this.props.handleSearch} />
                <Navbar />
                <div className="box"></div>
            </div>
        );
    }
}