import * as React from "react";
import "./stylesheet.css";
import MovieCard from "./MovieCard";

interface IProps {
    updateDb(data: any, type: string, operation: string): any;
    data: any;
    media_type: any;
    user_id: number;
}

export default class MovieCardList extends React.Component<IProps, {}> {

    public activateFavButtons = () => {
        Promise.all([
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetFavourites/" + this.props.user_id, { method: "GET" }),
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetWatchlist/" + this.props.user_id, { method: "GET" })
        ]).then(([favData, wlData]) => {
            favData.json().then(fav => {
                this.props.data.forEach((movie: any) => {
                    fav.forEach((favourite: any) => {
                        if (favourite.media_id === movie.media_id && favourite.media_type === movie.media_type) {
                            var elem = document.getElementById("favourites" + favourite.media_type + favourite.media_id);
                            if (elem != null) {
                                elem.classList.add("active");
                            }
                        }
                    });
                })
            });

            wlData.json().then(wl => {
                this.props.data.forEach((movie: any) => {
                    wl.forEach((watchlist: any) => {
                        if (watchlist.media_id === movie.media_id && watchlist.media_type === movie.media_type) {
                            var elem = document.getElementById("watchlist" + watchlist.media_type + watchlist.media_id);
                            if (elem != null) {
                                elem.classList.add("active");
                            }
                        }
                    });
                })
            });
        })
    }

    // activateFavButtons = () => {
    //     const favourites = this.props.getFavouritesForUser("favourites");
    //     const watchlist = this.props.getFavouritesForUser("watchlist");
    //     console.log(favourites);
    // }


    public render() {
        this.activateFavButtons();
        if (this.props.media_type != null) {
            return (
                <div>
                    {this.props.data.map((movie: any) =>
                        <MovieCard key={movie.media_id} data={movie} updateDb={this.props.updateDb} media_type={this.props.media_type} />
                    )}
                </div>
            );
        } else {
            return (
                <div className="card-list">
                    {this.props.data.map((movie: any) =>
                        <MovieCard key={movie.media_id} data={movie} updateDb={this.props.updateDb} media_type={movie.media_type} />
                    )}
                </div>
            );
        }

    }
}