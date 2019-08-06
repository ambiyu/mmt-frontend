import * as React from "react";
import "./NavStructure.css";

interface IProps {
    handlePageChange(page: string): any;
}

export default class Navbar extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="nav-wrapper">
                <nav className="navbar">
                    <li><a href="#" onClick={() => this.props.handlePageChange("home")}>Home</a></li>
                    <li><a href="#" onClick={() => this.props.handlePageChange("favourites")} > Movies</a></li>
                    <li><a href="#">TV Series</a></li>
                </nav>
            </div>
        );
    }
}