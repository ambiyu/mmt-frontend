import * as React from "react";
import MovieListing from "./MovieListing";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, FacebookShareCount } from 'react-share'
import "./stylesheet.css";

interface IState {
    movies: any;
    loading: boolean;
}

interface IProps {
    setFavourite(data: any, type: string): any;
    user_id: number;
}


export default class Watchlist extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        };
    }

    public handleRemove = () => {

    }

    public componentDidMount = () => {
        if (this.state.loading) {
            fetch("https://mmtapi.azurewebsites.net/api/Media/GetWatchlist/" + this.props.user_id, {
                method: "GET"
            }).then((result: any) => {
                result.json().then((movies: any) => {
                    this.setState({ movies, loading: false });
                });
            })
        }
    }

    public render() {
        if (!this.state.loading && this.state.movies !== null) {
            return (
                <div className="watchlist-page">
                    {this.state.movies.map((data: any) => {
                        return (
                            <div>
                                <div className="share-btns">
                                    <header>Share</header>
                                    <TwitterShareButton url={"https://www.themoviedb.org/" + data.media_type + "/" + data.media_id} >
                                        <TwitterIcon size={40} />
                                    </TwitterShareButton>
                                    <FacebookShareButton url={"https://www.themoviedb.org/" + data.media_type + "/" + data.media_id} >
                                        <FacebookIcon size={40} />
                                        <div className="share-count">
                                            <FacebookShareCount url={"https://www.themoviedb.org/" + data.media_type + "/" + data.media_id} />
                                        </div>
                                    </FacebookShareButton>
                                </div>

                                < MovieListing key={data.media_id} data={data} />
                            </div>

                        );
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <header className="loading" > Loading...</header>
                </div>
            );
        }

    }
}