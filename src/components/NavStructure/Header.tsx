import * as React from "react";
import "./NavStructure.css"

export default class Header extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="header">
                <header className="title"><img src="logo.png" alt=""></img>MyMovieTracker</header>
            </div>
        );
    }
}