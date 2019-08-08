import * as React from "react";
import Webcam from "react-webcam";
import Header from "../NavStructure/Header";

interface IProps {
    handleLogin(userId: number, username: string): any;
}

interface IState {
    users: any;
    authenticating: boolean;
    refCamera: any;
    predResult: any;
}

export default class Login extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            authenticating: false,
            refCamera: React.createRef(),
            predResult: null
        };
    }

    private getAvatar = (user: any) => {
        return "/avatars/" + (user.userId % 5 + 1) + ".svg";
    }

    private handleClick = (userId: number, username: string) => {
        if (userId === 1) {
            this.setState({ authenticating: true });
        } else {
            this.props.handleLogin(userId, username);
        }
    }


    private displayUsers = () => {
        if (this.state.users != null) {
            return (
                <div className="user-list">
                    {this.state.users.map((user: any) =>
                        <div className="user-wrap">
                            <div className="user" onClick={() => this.handleClick(user.userId, user.name)} >
                                <img className="avatar" key={user.userId} src={this.getAvatar(user)} ></img>
                                <h2>{user.name}</h2>
                            </div>
                        </div>

                    )}
                </div>
            );
        }
    }

    componentDidMount() {
        fetch("https://mmtapi.azurewebsites.net/api/People", {
            method: "GET"
        }).then(result => {
            if (result.ok) {
                result.json().then((data => {
                    this.setState({ users: data });
                }))
            }
        });
    }


    public render() {
        if (!this.state.authenticating) {
            return (
                <div>
                    <Header />
                    <div className="login">
                        <h2 className="sel-header">Select user</h2>
                        {this.displayUsers()}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="webcam">
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            ref={this.state.refCamera}
                        />
                    </div>

                </div>
            );
        }

    }
}