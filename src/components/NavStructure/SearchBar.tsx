import * as React from "react";
import "./NavStructure";

interface IProps {
    handleSearch(e: any): any;
}

export default class SearchBar extends React.Component<IProps, {}> {

    render() {
        return (
            <div className="search-wrapper">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <form id="search-bar" className="search-bar" onSubmit={this.props.handleSearch}>
                    <input type="text" name="search" className="search-text" placeholder="Search" />
                    <button type="submit" className="search-button" >
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>

        );
    }
}