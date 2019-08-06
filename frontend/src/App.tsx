import React from "react";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";
import NavStructure from "./components/NavStructure/NavStructure";
import Favourites from "./components/Favourites";

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
            currentPage: "home",
            searchTerm: "",
        };
    }

    public handleSearch = (e: any) => {
        e.preventDefault();
        const searchTerm = e.target.search.value;
        this.setState({ currentPage: "search", searchTerm });
    }

    public handlePageChange = (page: string) => {
        this.setState({ currentPage: page });
    }

    public movieExistsInDb = (id: number, media_type: string) => {
        fetch("https://mmtapi.azurewebsites.net/api/Movies/GetByIdAndType/" + media_type + "/" + id, {
            method: "GET"
        }).then(result => {
            if (result.ok) {
                result.json().then((movie: any) => {
                    console.log(movie);
                    if (movie !== null) {
                        console.log("true");
                        return true;
                    }
                })
            }
        });
        return false;
    }

    private alterFavourites = (data: any, type: string) => {
        const body = {
            "user_id": this.state.userId,
            "media_id": data.id,
            "media_type": data.media_type
        };

        fetch("https://mmtapi.azurewebsites.net/api/User" + type, {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === body) { // remove favourites or tracking if already exists
                        fetch("http://mmtapi.azurewebsites.net/api/User" + type, { method: "DELETE" });
                        console.log("deleted record from db");
                        return;
                    }
                });
            }
        })

        // add to favourites/tracking if it is not already
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
                    <Home updateDb={this.updateDb} />
                </div>
            );
        } else if (this.state.currentPage === "search") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Search searchTerm={this.state.searchTerm} updateDb={this.updateDb} />
                </div>
            );
        } else if (this.state.currentPage === "favourites") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} handlePageChange={this.handlePageChange} />
                    <Favourites type="favourites" user_id={this.state.userId} updateDb={this.updateDb} />
                </div>
            );
        }

    }
};

export default App;
