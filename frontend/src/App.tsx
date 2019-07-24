import React from "react";
import "./App.css";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import NavStructure from "./components/NavStructure/NavStructure";

interface IState {
    currentPage: string;
    searchTerm: string;
    watchlater: any;
    favourites: any;
    tracking: any;
}

class App extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            currentPage: "home",
            searchTerm: "",
            watchlater: [],
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

    public updateDb = (data: any, type: string, operation: string) => {
        console.log(operation + " ", data);
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
                    <SearchResult searchTerm={this.state.searchTerm} updateDb={this.updateDb} />
                </div>
            );
        }

    }
};

export default App;
