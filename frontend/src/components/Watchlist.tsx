import * as React from "react";
import MovieListing from "./MovieListing";
import "./stylesheet.css";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
    setFavourite(data: any, type: string, operation: string): any;
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

    public handleRemove = () => {

    }

    public componentDidMount = () => {
        if (this.state.loading) {
            fetch("http://mmtapi.azurewebsites.net/api/Media/GetWatchlist/" + this.props.user_id, {
                method: "GET"
            }).then((result: any) => {
                result.json().then((movies: any) => {
                    this.setState({ movies, loading: false });
                });
            })
        }
    }

    public render() {
        if (!this.state.loading && this.state.movies !== null) {
            return (
                <div>
                    {this.state.movies.map((data: any) =>
                        <MovieListing key={data.media_id} data={data} />
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <header className="loading">Loading...</header>
                </div>
            );
        }

    }
}