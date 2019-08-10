import * as React from "react";
import "./stylesheet.css";
import MovieCard from "./MovieCard";

interface IProps {
    getFavouritesForUser(type: string): any;
    updateDb(data: any, type: string, operation: string): any;
    data: any;
    media_type: string;
}

export default class MovieCardList extends React.Component<IProps, {}> {

    activateFavButtons = () => {
        const favourites = this.props.getFavouritesForUser("favourites");
        const watchlist = this.props.getFavouritesForUser("watchlist");
        console.log(favourites);
    }


    public render() {
        this.activateFavButtons();
        return (
            <div>
                {this.props.data.map((movie: any) =>
                    <MovieCard key={movie.media_id} data={movie} updateDb={this.props.updateDb} media_type={movie.media_type} />
                )}
            </div>
        );
    }
}