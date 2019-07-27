import React from "react";
import "./App.css";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import NavStructure from "./components/NavStructure/NavStructure";

interface IState {
    userId: number;
    username: string;
    currentPage: string;
    searchTerm: string;
    favourites: any;
    tracking: any;
}

class App extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            userId: 0,
            username: "",
            currentPage: "home",
            searchTerm: "",
            favourites: [],
            tracking: []
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
        fetch("https://localhost:44339/api/Movies", {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    data.forEach((movie: any) => {
                        console.log(movie.media_type + "/" + movie.id);
                        if (movie.id === id && movie.media_type === media_type) {
                            return true;
                        }
                    })
                });
            }
        });
        return false;
    }

    private alterFavourites = (data: any, type: string) => {
        const body = {
            user_id: this.state.userId,
            media_id: data.id,
            media_type: data.media_type
        };

        fetch("https://localhost:44339/api/User" + type, {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === body) { // remove favourites or tracking if already exists
                        fetch("https://localhost:44339/api/User" + type, { method: "DELETE" });
                        console.log("deleted record from db");
                        return;
                    }
                });
            }
        })

        // add to favourites/tracking if it is not already
        fetch("https://localhost:44339/api/User" + type, {
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
            media_id: data.id,
            media_type: data.media_type
        };

        fetch("https://localhost:44339/api/Movie", {
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
                    <NavStructure handleSearch={this.handleSearch} />
                    <Home updateDb={this.updateDb} />
                </div>
            );
        } else if (this.state.currentPage === "search") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} />
                    <SearchResult searchTerm={this.state.searchTerm} updateDb={this.updateDb} />
                </div>
            );
        }

    }
};

export default App;
