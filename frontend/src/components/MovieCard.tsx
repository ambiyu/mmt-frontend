import * as React from "react";
import "./stylesheet.css";

interface IProps {
    updateDb(data: any, type: string, operation: string): any;
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

    public handleToggleButton = (type: string) => {
        var elem = document.getElementById(type + this.props.data.id);
        console.log(type);
        console.log(elem);
        if (elem != null) {
            elem.classList.toggle("active");
            const data = this.props.data;
            const movieData = {
                id: data.id,
                title: this.getTitle(),
                poster_path: data.poster_path,
                overview: data.overview,
                release_date: data.release_date,
                media_type: data.media_type
            }
            if (elem.classList.contains("active")) {
                this.props.updateDb(movieData, type, "add");
            } else {
                this.props.updateDb(movieData, type, "delete");
            }
        }
    }

    public render() {
        return (
            <div className="movie-card">
                <div className="card-menu">
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div className="link-btns">
                        <button id={"wl" + this.props.data.id} className="watchlater" title="Watch later" onClick={() => this.handleToggleButton("wl")} ><i className="material-icons">watch_later</i></button>
                        <button id={"fav" + this.props.data.id} className="favourite" title="Add to favourites" onClick={() => this.handleToggleButton("fav")}><i className="material-icons">favorite_border</i></button>
                        <button id={"track" + this.props.data.id} className="track" title="Track movie" onClick={() => this.handleToggleButton("track")}><i className="material-icons">remove_red_eye</i></button>
                    </div>
                </div>

                <div className="card-title">
                    <a href={"https://www.themoviedb.org/" + this.props.data.media_type + "/" + this.props.data.id}>
                        <h2>{this.getTitle()}</h2>
                    </a>
                </div>

                <div className="card-poster">
                    <a href={"https://www.themoviedb.org/" + this.props.data.media_type + "/" + this.props.data.id}>
                        <img src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} alt={this.getTitle()} />
                    </a>
                </div>
            </div>
        );
    }
}