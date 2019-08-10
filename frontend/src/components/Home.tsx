import * as React from "react";
import MovieCardList from "./MovieCardList";

interface IProps {
    updateDb(data: any, type: string, operation: string): any;
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
            movies.json().then(data => {
                var trendingMovies = data.results;
                trendingMovies.forEach((mv: any) => {
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
                        <div className="trending-mv" id="trending-mv" >
                            <MovieCardList data={this.state.trendingMovies} updateDb={this.props.updateDb} media_type="movie" user_id={this.props.user_id} />
                        </div>
                    </div>
                    <div className="trending-tv-wrap">
                        <header>Trending TV Series</header>
                        <div className="trending-tv" id="trending-tv" >
                            <MovieCardList data={this.state.trendingTv} updateDb={this.props.updateDb} media_type="tv" user_id={this.props.user_id} />
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