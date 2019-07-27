import * as React from "react";
import MovieCard from "./MovieCard";
import "./stylesheet.css"

interface IProps {
    updateDb(data: any, type: string, operation: string): any;
    searchTerm: string;
}

interface IState {
    prevSearchTerm: string;
    results: any;
    loading: boolean;
}

export default class SearchResult extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            prevSearchTerm: "",
            loading: true,
            results: []
        }
    }

    public searchMoviesByTerm = () => {
        if (this.state.prevSearchTerm !== this.props.searchTerm) {
            const APIKey = "5001541809100a7e7385e7c891e817d2";
            fetch("https://api.themoviedb.org/3/search/multi?api_key=" + APIKey + "&query=" + this.props.searchTerm, {
                method: "GET"
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.setState({ results: data.results, loading: false, prevSearchTerm: this.props.searchTerm });
                    });
                }
            });
        }
    };

    public render() {
        this.searchMoviesByTerm();
        if (!this.state.loading) {
            return (
                <div>
                    <header className="searchHeader">SEARCH RESULTS FOR "{this.props.searchTerm.toLocaleUpperCase()}"</header>>
                    <div className="searchResult">
                        {this.state.results.map((result: any) =>
                            <MovieCard key={result.id} data={result} updateDb={this.props.updateDb} mediaType={result.media_type} />
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