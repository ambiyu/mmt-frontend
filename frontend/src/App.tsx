import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import NavStructure from "./components/NavStructure/NavStructure";
import Favourites from "./components/Favourites";
import Login from "./components/Login";

interface IState {
    userId: number;
    username: string;
    currentPage: string;
    searchTerm: string;
}

class App extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            userId: 1,
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

    public handleLogin = (userId: number, username: string) => {
        this.setState({ userId, username, currentPage: "home" });
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

    public setFavourite = (type: string, media_type: string, media_id: number) => {
        var elem = document.getElementById(type + media_type + media_id);
        fetch("https://mmtapi.azurewebsites.net/api/User" + type + "/Get/" + this.state.userId + "/" + media_type + "/" + media_id, {
            method: "GET"
        }).then(result => {
            if (result.ok) {
                if (elem != null) {
                    elem.classList.add("active");
                }
            }
        });
    }

    public movieExistsInDb = (id: number, media_type: string) => {
        fetch("https://mmtapi.azurewebsites.net/api/Movies/GetByIdAndType/" + media_type + "/" + id, {
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
            "userId": this.state.userId,
            "mediaType": data.media_type,
            "mediaId": data.id
        };

        fetch("https://mmtapi.azurewebsites.net/api/User" + type + "/Get/" + this.state.userId + "/" + data.media_type + "/" + data.id, {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    fetch("https://mmtapi.azurewebsites.net/api/User" + type + "/" + result.id, { method: "DELETE" });
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
                        console.log("added record to db", response);
                    }
                });
            }
        })
    }

    private addMovieToDb = (data: any) => {
        const body = {
            "id": data.id,
            "media_type": data.media_type
        };

        fetch("https://mmtapi.azurewebsites.net/api/Movies", {
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

    public updateDb = (data: any, type: string, operation: string) => {
        if (!this.movieExistsInDb(data.id, data.media_type)) {
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
                    <Home updateDb={this.updateDb} setFavourite={this.setFavourite} />
                </div>
            );
        } else if (this.state.currentPage === "search") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Search searchTerm={this.state.searchTerm} updateDb={this.updateDb} setFavourite={this.setFavourite} />
                </div>
            );
        } else if (this.state.currentPage === "favourites") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Favourites type="favourites" user_id={this.state.userId} updateDb={this.updateDb} setFavourite={this.setFavourite} />
                </div>
            );
        } else if (this.state.currentPage === "watchlist") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Favourites type="watchlist" user_id={this.state.userId} updateDb={this.updateDb} setFavourite={this.setFavourite} />
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
