import * as React from "react";
import MovieListing from "./MovieListing";
import MovieCard from "./MovieCard";
import "./stylesheet.css";
import Movies from "./Movies";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
    setFavourite(type: string, media_type: string, media_id: number): void;
    updateDb(data: any, type: string, operation: string): any;
    type: string;
    user_id: number;
}


export default class Favourites extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        };
    }

    componentDidMount = () => {
        fetch("http://mmtapi.azurewebsites.net/api/Movies/Get" + this.props.type + "/" + this.props.user_id, {
            method: "GET"
        }).then((result: any) => {
            result.json().then((movies: any) => {
                movies = JSON.stringify(movies);
                movies = movies.replace("\"posterPath\":", "\"poster_path\":");
                movies = movies.replace("\"releaseDate\":", "\"release_date\":");
                movies = JSON.parse(movies);
                this.setState({ movies, loading: false });
            });
        })
    }

    public render() {
        if (!this.state.loading && this.state.movies !== null) {
            if (this.props.type === "favourites") {
                return (
                    <div className="search-page">
                        <div className="search-result">
                            {this.state.movies.map((movie: any) =>
                                <MovieCard key={movie.id} data={movie} updateDb={this.props.updateDb} mediaType={movie.mediaType} setFavourite={this.props.setFavourite} />
                            )}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.state.movies.map((movie: any) =>
                            <MovieListing key={movie.id} data={movie} />
                        )}
                    </div>
                );
            }

        } else {
            return (
                <div>
                    <header className="loading">Loading...</header>
                </div>
            );
        }

    }
}