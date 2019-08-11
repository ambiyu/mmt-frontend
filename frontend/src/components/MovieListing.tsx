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
                    <p>{data.overview}</p>
                </div>

                <a href={"https://www.themoviedb.org/" + data.media_type + "/" + data.media_id}><header>{data.title} ({data.release_year})</header></a>

                <h3 className="release-status">Release Date: {data.release_date} Status: {data.status}</h3>

                <div className="poster">
                    <a href={"https://www.themoviedb.org/" + data.media_type + "/" + data.media_id}>
                        <img src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt={data.title} />
                    </a>
                </div>
            </div>
        );
    }
}