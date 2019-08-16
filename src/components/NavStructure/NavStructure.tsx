import * as React from "react";
import "./NavStructure.css";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Header from "./Header";

interface IProps {
    handleSearch(e: any): any;
    handlePageChange(page: string): any;
}

export default class NavStructure extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="nav-structure">
                <div className="box"></div>
                <Header />
                <SearchBar handleSearch={this.props.handleSearch} />
                <Navbar handlePageChange={this.props.handlePageChange} />

            </div>
        );
    }
}