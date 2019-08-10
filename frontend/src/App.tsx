import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import NavStructure from "./components/NavStructure/NavStructure";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Watchlist from "./components/Watchlist";

interface IState {
    user_id: number;
    username: string;
    currentPage: string;
    searchTerm: string;
}

class App extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            user_id: 1,
            username: "",
            currentPage: "",
            searchTerm: "",
        };
    }

    public handleSearch = (e: any) => {
        e.preventDefault();
        const searchTerm = e.target.search.value;
        this.setState({ searchTerm });
        this.handlePageChange("search");
    }

    public handleLogin = (user_id: number, username: string) => {
        this.setState({ user_id, username });
        this.handlePageChange("home");
    }

    public handlePageChange = (page: string) => {
        this.setState({ currentPage: page });
        var curr = document.getElementById("nav-" + this.state.currentPage);
        var next = document.getElementById("nav-" + page);
        if (next != null && curr != null) {
            curr.classList.remove("current-page");
            next.classList.add("current-page");
        } else if (curr != null && next == null) { // to search
            curr.classList.remove("current-page");
        } else if (curr == null && next != null) { // from search
            next.classList.add("current-page");
        }
    }

    public movieExistsInDb = (id: number, media_type: string) => {
        fetch("https://mmtapi.azurewebsites.net/api/Media/GetByIdAndType/" + media_type + "/" + id, {
            method: "GET"
        }).then(result => {
            if (result.ok) {
                return true;
            }
        });
        return false;
    }

    private alterFavourites = (data: any, type: string) => {
        const body = {
            "user_id": this.state.user_id,
            "media_type": data.media_type,
            "media_id": data.media_id
        };

        fetch("https://mmtapi.azurewebsites.net/api/User" + type + "/" + this.state.user_id + "/" + data.media_type + "/" + data.media_id, {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    fetch("https://mmtapi.azurewebsites.net/api/User" + type + "/" + result.user_id + "/" + result.media_type + "/" + result.media_id, { method: "DELETE" });
                    console.log("deleted record from db");
                    return;
                });
            } else { // add to favourites/tracking if it is not already
                fetch("https://mmtapi.azurewebsites.net/api/User" + type, {
                    body: JSON.stringify(body),
                    headers: {
                        Accept: "text/plain",
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                }).then((response) => {
                    if (response.ok) {
                        console.log("added record to db");
                    }
                });
            }
        })
    }

    private addMovieToDb = (data: any) => {
        const body = {
            "media_type": data.media_type,
            "media_id": data.media_id
        };

        fetch("https://mmtapi.azurewebsites.net/api/Media", {
            body: JSON.stringify(body),
            headers: {
                Accept: "text/plain",
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(response => {
            if (response.ok) {
                console.log("added movie to db");
            }
        })
    }

    public setFavourite = (data: any, type: string, operation: string) => {
        if (!this.movieExistsInDb(data.media_id, data.media_type)) {
            this.addMovieToDb(data);
            this.alterFavourites(data, type);
        } else {
            this.alterFavourites(data, type);
        }
    }

    public render() {
        if (this.state.currentPage === "home") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Home setFavourite={this.setFavourite} user_id={this.state.user_id} />
                </div>
            );
        } else if (this.state.currentPage === "search") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Search searchTerm={this.state.searchTerm} setFavourite={this.setFavourite} user_id={this.state.user_id} />
                </div>
            );
        } else if (this.state.currentPage === "favourites") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Favourites user_id={this.state.user_id} setFavourite={this.setFavourite} />
                </div>
            );
        } else if (this.state.currentPage === "watchlist") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Watchlist user_id={this.state.user_id} setFavourite={this.setFavourite} />
                </div>
            )
        } else { // login
            return (
                <div>
                    <Login handleLogin={this.handleLogin} />
                </div>
            );
        }

    }
};

export default App;
