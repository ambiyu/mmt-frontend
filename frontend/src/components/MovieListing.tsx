import * as React from "react";
import "./stylesheet.css";

interface IProps {
    data: any;
}

export default class MovieListing extends React.Component<IProps, {}> {
    public render() {
        const data = this.props.data;
        return (
            <div className="mv-listing">
                <header>{data.title}</header>
                <div className="poster">
                    <a href={"https://www.themoviedb.org/" + data.mediaType + "/" + data.mediaId}>
                        <img src={"https://image.tmdb.org/t/p/w500" + data.posterPath} alt={data.title} />
                    </a>
                </div>
            </div>
        );
    }
}