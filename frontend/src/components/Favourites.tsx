import * as React from "react";
import MovieCard from "./MovieCard";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
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
            result.json().then((movies: any) => this.setState({ movies, loading: false }));
        })
    }

    public render() {
        if (!this.state.loading && this.state.movies !== null) {
            return (
                <div>
                    <header>FINISHED</header>
                    {this.state.movies.map((result: any) =>
                        <MovieCard key={result.id} data={result} updateDb={this.props.updateDb} mediaType={result.media_type} />
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