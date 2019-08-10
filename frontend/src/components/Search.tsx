import * as React from "react";
import MovieCard from "./MovieCard";
import "./stylesheet.css"

interface IProps {
    getFavouritesForUser(type: string): any;
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
                        var results = data.results;
                        results.forEach((mv: any) => {
                            mv.media_id = mv.id;
                            delete mv.id;
                        });
                        this.setState({ results, loading: false, prevSearchTerm: this.props.searchTerm });
                    });
                }
            });
        }
    };

    public render() {
        this.searchMoviesByTerm();
        if (!this.state.loading) {
            return (
                <div className="search-page">
                    <header className="search-header">SEARCH RESULTS FOR "{this.props.searchTerm.toLocaleUpperCase()}"</header>>
                    <div className="search-result">
                        {this.state.results.map((movie: any) =>
                            <MovieCard key={movie.media_id} data={movie} updateDb={this.props.updateDb} media_type={movie.media_type} />
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <header className="loading">Loading...</header>
            );
        }
    }
}