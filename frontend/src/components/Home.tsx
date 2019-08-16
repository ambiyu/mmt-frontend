import * as React from "react";
import MovieCardList from "./MovieCardList";

interface IProps {
    setFavourite(data: any, type: string): any;
    user_id: number;
}

interface IState {
    loading: boolean;
    trendingMovies: any;
    trendingTv: any;
}

export default class Home extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            trendingMovies: [],
            trendingTv: []
        };
    }

    public componentDidMount() {
        const APIKey = "5001541809100a7e7385e7c891e817d2";
        Promise.all([
            fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + APIKey, { method: "GET" }),
            fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=" + APIKey, { method: "GET" })
        ]).then(([movies, tv]) => {
            movies.json().then(data => {
                var trendingMovies = data.results;
                trendingMovies.forEach((mv: any) => { // rename key to "media_id"
                    mv.media_id = mv.id;
                    delete mv.id;
                });
                this.setState({ trendingMovies })
            });

            tv.json().then(data => {
                var trendingTv = data.results;
                trendingTv.forEach((tv: any) => {
                    tv.media_id = tv.id;
                    delete tv.id;
                });
                this.setState({ trendingTv, loading: false });
            });
        });
    }

    public render() {
        if (!this.state.loading) {
            return (
                <div className="homepage">
                    <div className="trending-mv-wrap">
                        <header>Trending Movies</header>
                        <MovieCardList data={this.state.trendingMovies} setFavourite={this.props.setFavourite} media_type="movie" user_id={this.props.user_id} />
                    </div>
                    <div className="trending-tv-wrap">
                        <header>Trending TV Series</header>
                        <MovieCardList data={this.state.trendingTv} setFavourite={this.props.setFavourite} media_type="tv" user_id={this.props.user_id} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="homepage">
                    <header className="loading">Loading...</header>
                </div>
            )
        }

    }
}