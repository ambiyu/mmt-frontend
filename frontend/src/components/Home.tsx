import * as React from "react";
import MovieCard from "./MovieCard";

interface IProps {
    setFavourite(type: string, media_type: string, media_id: number): void;
    updateDb(data: any, type: string, operation: string): any;
}

interface IState {
    loading: boolean;
    trendingMovies: any;
    trendingTv: any;
    // latestMovies: any;
    // latestTv: any;
    // upcomingMovies: any;
    // upcomingTv: any;
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

    // private getTrending = (media_type: string) => {
    //     const APIKey = "5001541809100a7e7385e7c891e817d2";
    //     fetch("https://api.themoviedb.org/3/trending/" + media_type + "/week?api_key=" + APIKey, {
    //         method: "GET"
    //     }).then(response => {
    //         if (response.ok) {
    //             response.json().then(data => {
    //                 this.setState
    //             });
    //         }
    //     });
    // }

    public componentDidMount() {
        const APIKey = "5001541809100a7e7385e7c891e817d2";
        Promise.all([
            fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + APIKey, { method: "GET" }),
            fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=" + APIKey, { method: "GET" })
        ]).then(([movies, tv]) => {
            movies.json().then(data => this.setState({ trendingMovies: data.results }));
            tv.json().then(data => this.setState({ trendingTv: data.results, loading: false }));
        });
    }

    public render() {
        if (!this.state.loading) {
            return (
                <div className="homepage">
                    <div className="trending-mv-wrap">
                        <header>Trending Movies</header>
                        <div className="trending-mv" id="trending-mv" >
                            {this.state.trendingMovies.map((result: any) =>
                                <MovieCard key={result.id} data={result} updateDb={this.props.updateDb} mediaType="movie" setFavourite={this.props.setFavourite} />
                            )}
                        </div>
                    </div>
                    <div className="trending-tv-wrap">
                        <header>Trending TV Series</header>
                        <div className="trending-tv" id="trending-tv" >
                            {this.state.trendingTv.map((result: any) =>
                                <MovieCard key={result.id} data={result} updateDb={this.props.updateDb} mediaType="tv" setFavourite={this.props.setFavourite} />
                            )}
                        </div>
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