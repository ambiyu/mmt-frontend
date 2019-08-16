import * as React from "react";
import "./NavStructure.css";

interface IProps {
    handlePageChange(page: string): any;
}

export default class Navbar extends React.Component<IProps, {}> {
    private toggleSidebar = () => {
        var nav = document.getElementById("navbar");
        var search = document.getElementById("search-bar");
        if (nav != null && search != null) {
            nav.classList.toggle("active");
            search.classList.toggle("active");
        }
    }

    public render() {
        return (
            <div className="nav-wrapper">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <div className="nav-toggle-btn">
                    <button onClick={this.toggleSidebar} >
                        <i className="material-icons">dehaze</i>
                    </button>
                </div>

                <div id="navbar" className="navbar">
                    <div className="nav-home">
                        <a id="nav-home" onClick={() => this.props.handlePageChange("home")} ><i className="material-icons">home</i>Home</a>
                    </div>

                    <div className="nav-library">
                        <header>Library</header>
                        <a id="nav-movies"><i className="material-icons">local_movies</i>Movies</a>
                        <a id="nav-series"><i className="material-icons">tv</i>TV Series</a>
                    </div>

                    <div className="nav-user">
                        <header>User</header>
                        <a id="nav-favourites" onClick={() => this.props.handlePageChange("favourites")} ><i className="material-icons">star</i>Favourites</a>
                        <a id="nav-watchlist" onClick={() => this.props.handlePageChange("watchlist")}><i className="material-icons">remove_red_eye</i>Watchlist</a>
                    </div>

                </div>
            </div>
        );
    }
}