import * as React from "react";
import Movie from "./Movie";
import "./stylesheet.css"

interface IProps {
    handleMovieSelect(): any;
    searchTerm: string;
}

interface IState {
    results: any;
}

export default class SearchResult extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            results: []
        }
    }

    public getMoviesByTerm = (term: any) => {
        const APIKey = "5001541809100a7e7385e7c891e817d2";
        fetch(
            "https://api.themoviedb.org/3/search/multi?api_key=" + APIKey + "&query=" + term, {
                method: "GET"
            }
        ).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({ results: data.results });
                });
            }
        });
    };

    public render() {
        this.getMoviesByTerm(this.props.searchTerm);
        if (this.state.results.length !== 0) {
            return (
                <div>
                    <header className="searchHeader">SEARCH RESULTS FOR "{this.props.searchTerm.toLocaleUpperCase()}"</header>>
                    <div className="searchResult">
                        {this.state.results.map((result: any) =>
                            <Movie key={result.id} data={result} handleMovieSelect={this.props.handleMovieSelect} displayType={0} />
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <header>loading</header>
            );
        }
    }
}