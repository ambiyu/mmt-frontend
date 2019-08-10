import * as React from "react";
import MovieListing from "./MovieListing";
import MovieCard from "./MovieCard";
import "./stylesheet.css";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
    getFavouritesForUser(type: string): any;
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
        fetch("http://mmtapi.azurewebsites.net/api/Media/Get" + this.props.type + "/" + this.props.user_id, {
            method: "GET"
        }).then((result: any) => {
            result.json().then((movies: any) => {
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
                            {this.state.movies.map((data: any) =>
                                <MovieCard key={data.media_type + data.media_id} data={data} updateDb={this.props.updateDb} media_type={data.media_type} getFavouritesForUser={this.props.getFavouritesForUser} />
                            )}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.state.movies.map((data: any) =>
                            <MovieListing key={data.media_id} data={data} />
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