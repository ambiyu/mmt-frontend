import * as React from "react";
import "./stylesheet.css";
import MovieCard from "./MovieCard";

interface IProps {
    setFavourite(data: any, type: string): any;
    data: any;
    media_type: any;
    user_id: number;
}

export default class MovieCardList extends React.Component<IProps, {}> {

    private getFavourites = () => {
        Promise.all([
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetFavourites/" + this.props.user_id, { method: "GET" }),
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetWatchlist/" + this.props.user_id, { method: "GET" })
        ]).then(([favData, wlData]) => {
            favData.json().then(fav => this.activateFavButtons(fav, "favourites"));
            wlData.json().then(wl => this.activateFavButtons(wl, "watchlist"));
        })
    }

    private activateFavButtons = (favData: any, type: string) => {
        this.props.data.forEach((movie: any) => {
            favData.forEach((favourite: any) => {
                if (favourite.media_id === movie.media_id && favourite.media_type === (this.props.media_type != null ? this.props.media_type : movie.media_type)) {
                    var elem = document.getElementById(type + favourite.media_type + favourite.media_id);
                    if (elem != null) {
                        elem.classList.add("active");
                    }
                }
            });
        })
    }

    public render() {
        this.getFavourites();
        if (this.props.media_type != null) {
            return (
                <div className="trending" id="trending" >
                    {this.props.data.map((movie: any) =>
                        <MovieCard key={movie.media_id} data={movie} setFavourite={this.props.setFavourite} media_type={this.props.media_type} />
                    )}
                </div>
            );
        } else {
            return (
                <div className="card-list-wrap">
                    <div className="card-list">
                        {this.props.data.map((movie: any) =>
                            <MovieCard key={movie.media_id} data={movie} setFavourite={this.props.setFavourite} media_type={movie.media_type} />
                        )}
                    </div>
                </div>

            );
        }

    }
}