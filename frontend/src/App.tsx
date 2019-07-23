import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavStructure from "./components/NavStructure/NavStructure";

interface IState {
    currentPage: string;
    searchTerm: string;
}

class App extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            currentPage: "home",
            searchTerm: ""
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

    public handleMovieSelect = () => {
        console.log("clicked");
    }


    public render() {
        if (this.state.currentPage === "home") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} />
                </div>
            );
        } else if (this.state.currentPage === "search") {
            return (
                <div>
                    <NavStructure handleSearch={this.handleSearch} />
                    <SearchResult searchTerm={this.state.searchTerm} handleMovieSelect={this.handleMovieSelect} />
                </div>
            );
        }

    }
};

export default App;
