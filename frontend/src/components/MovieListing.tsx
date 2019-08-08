import * as React from "react";
import "./stylesheet.css";

interface IProps {
    data: any;
}

export default class MovieListing extends React.Component<IProps, {}> {

    private movieStatus = () => {

    }

    public render() {
        const data = this.props.data;
        return (
            <div className="mv-listing">
                <div className="overview">
                    <text>{data.overview}</text>
                </div>

                <a href={"https://www.themoviedb.org/" + data.mediaType + "/" + data.mediaId}><header>{data.title} ({data.releaseYear})</header></a>

                <h3 className="release-status">Release Date: {data.releaseDate} Status: {data.status}</h3>

                <div className="poster">
                    <a href={"https://www.themoviedb.org/" + data.mediaType + "/" + data.mediaId}>
                        <img src={"https://image.tmdb.org/t/p/w500" + data.posterPath} alt={data.title} />
                    </a>
                </div>
            </div>
        );
    }
}