import * as React from "react";
import "./stylesheet.css";

interface IProps {
    setFavourite(data: any, type: string): any;
    media_type: string;
    data: any;
}


export default class Movie extends React.Component<IProps, {}> {

    private getTitle = () => {
        const data = this.props.data;
        if (data.name != null) {
            return data.name;
        } else if (data.title != null) {
            return data.title;
        } else if (data.original_title != null) {
            return data.original_title;
        } else return "-";
    }

    private getReleaseDate = () => {
        if (this.props.data.release_date != null) {
            return this.props.data.release_date;
        } else return this.props.data.first_air_date;
    }

    public handleToggleButton = (type: string) => {
        var elem = document.getElementById(type + this.props.media_type + this.props.data.media_id);
        if (elem != null) {
            elem.classList.toggle("active");
            const data = this.props.data;
            const movieData = {
                media_id: data.media_id,
                title: this.getTitle(),
                poster_path: data.poster_path,
                overview: data.overview,
                release_date: data.release_date,
                media_type: this.props.media_type,
                status: data.status
            }

            this.props.setFavourite(movieData, type);
        }
    }

    public render() {
        return (
            <div className="movie-card">
                <div className="card-menu">
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div className="link-btns">
                        <button id={"favourites" + this.props.media_type + this.props.data.media_id} className="favourite" title="Add to Favourites" onClick={() => this.handleToggleButton("favourites")}><i className="material-icons">favorite_border</i></button>
                        <button id={"watchlist" + this.props.media_type + this.props.data.media_id} className="watchlist" title="Add to Watchlist" onClick={() => this.handleToggleButton("watchlist")}><i className="material-icons">remove_red_eye</i></button>
                    </div>
                </div>

                <div className="card-title">
                    <a href={"https://www.themoviedb.org/" + this.props.data.media_type + "/" + this.props.data.media_id}>
                        <h2>{this.getTitle()}</h2>
                    </a>
                </div>

                <div className="release-date">
                    <h3>{this.getReleaseDate()}</h3>
                </div>

                <div className="card-poster">
                    <a href={"https://www.themoviedb.org/" + this.props.media_type + "/" + this.props.data.media_id}>
                        <img src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} alt={this.getTitle()} />
                    </a>
                </div>
            </div>
        );
    }
}