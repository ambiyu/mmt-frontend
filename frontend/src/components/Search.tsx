import * as React from "react";
import "./stylesheet.css"
import MovieCardList from "./MovieCardList";

interface IProps {
    setFavourite(data: any, type: string, operation: string): any;
    searchTerm: string;
    user_id: number;
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
                    <header className="search-header">SEARCH RESULTS FOR "{this.props.searchTerm.toLocaleUpperCase()}"</header>
                    <MovieCardList data={this.state.results} setFavourite={this.props.setFavourite} media_type={null} user_id={this.props.user_id} />
                </div>
            );
        } else {
            return (
                <header className="loading">Loading...</header>
            );
        }
    }
}