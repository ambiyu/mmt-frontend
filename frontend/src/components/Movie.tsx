import * as React from "react";
import "./stylesheet.css";

interface IProps {
    handleMovieSelect(): any;
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

    public render() {
        return (
            <div className="poster">
                <h2>{this.getTitle()}</h2>
                <img src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} alt={this.getTitle()} onClick={this.props.handleMovieSelect} />
            </div>
        );
    }
}