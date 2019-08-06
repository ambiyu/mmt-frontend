import * as React from "react";
import MovieListing from "./MovieListing";

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
                console.log(movies);
                this.setState({ movies, loading: false });
            });
        })
    }

    public render() {
        if (!this.state.loading && this.state.movies !== null) {
            return (
                <div>
                    <header>FINISHED</header>
                    {this.state.movies.map((movie: any) =>
                        <MovieListing key={movie.id} data={movie} />
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <header>LOADING</header>
                </div>
            );
        }

    }
}