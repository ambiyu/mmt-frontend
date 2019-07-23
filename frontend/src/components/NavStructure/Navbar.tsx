import * as React from "react";
import "./NavStructure.css";

export default class Navbar extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="nav-wrapper">
                <nav className="navbar">
                    <li><a href="/">Home</a></li>
                    <li><a href="/movies">Movies</a></li>
                    <li><a href="/series">TV Series</a></li>
                </nav>
            </div>
        );
    }
}