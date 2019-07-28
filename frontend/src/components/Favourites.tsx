import * as React from "react";

interface IState {
    movies: any;
    prevFavourites: any;
    loading: boolean;
}

interface IProps {
    type: string;
    user_id: number;
}


export default class Favourites extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            prevFavourites: [],
            loading: true
        };
    }

    private getFavouritesForUser = () => {
        let media_ids: number[] = [];
        let media_types: string[] = [];
        let movies: any = [];

        Promise.all([
            fetch("http://mmtapi.azurewebsites.net/api/User" + this.props.type, { method: "GET" }),
            fetch("http://mmtapi.azurewebsites.net/api/Movies", { method: "GET" })
        ]).then(([favouritesData, moviesData]) => {
            if (this.state.prevFavourites !== favouritesData.json()) {
                favouritesData.json().then(data => data.forEach((favourite: any) => {
                    if (favourite.user_id === this.props.user_id) {
                        media_ids.push(favourite.media_id);
                        media_types.push(favourite.media_type);
                    }
                }));

                moviesData.json().then(data => data.forEach((movie: any) => {
                    for (let i = 0; media_ids.length; i++) {
                        if (media_ids[i] == movie.id && media_types[i] == movie.media_type) {
                            movies.push(movie);
                        }
                    }
                }));

                this.setState({ movies, prevFavourites: favouritesData.json(), loading: false });
            }
        });

        // fetch("http://mmtapi.azurewebsites.net/api/User" + this.props.type, {
        //     method: "GET"
        // }).then((ret: any) => {
        //     return ret.json();
        // }).then((result: any) => {
        //     const output: any[] = []
        //     result.forEach((favourite: any) => {
        //         if (favourite.user_id === this.props.user_id) {
        //             media_ids.push(favourite.media_id);
        //             media_types.push(favourite.media_type);
        //         }
        //     });
        // });
    }

    public render() {
        this.getFavouritesForUser();

        if (!this.state.loading) {
            return (
                <div>

                </div>
            );
        } else {
            return (
                <div>

                </div>
            );
        }

    }
}