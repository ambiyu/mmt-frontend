import * as React from "react";
import "./stylesheet.css";
import MovieCardList from "./MovieCardList";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
    setFavourite(data: any, type: string): any;
    user_id: number;
}


export default class Favourites extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
        };
    }

    public componentDidMount = () => {
        if (this.state.loading) {
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetFavourites/" + this.props.user_id, {
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
                <div className="fav-page">
                    <header className="fav-header">Your Favourites</header>
                    <MovieCardList data={this.state.movies} setFavourite={this.props.setFavourite} media_type={null} user_id={this.props.user_id} />
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