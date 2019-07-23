import * as React from "react";
import "./stylesheet.css";

interface IProps {
    data: any;
    displayType: number; // 0 for poster only, 1 for full info listing
    // id: string;
    // title: string;
    // release_date: string;
    // poster_path: string;
    // mediaType: string;
    // overview: string;
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
            if (elem.classList.contains("active")) {

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