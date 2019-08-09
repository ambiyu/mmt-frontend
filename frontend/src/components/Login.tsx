import * as React from "react";
import Webcam from "react-webcam";
import Header from "./NavStructure/Header";

interface IProps {
    handleLogin(userId: number, username: string): any;
}

interface IState {
    users: any;
    authenticating: boolean;
    authenticated: boolean;
    refCamera: any;
    predResult: any;
}

export default class Login extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            authenticating: false,
            authenticated: false,
            refCamera: React.createRef(),
            predResult: null
        };
    }

    private getAvatar = (user: any) => {
        return "/avatars/" + (user.userId % 5 + 1) + ".svg";
    }

    private authenticate = () => {
        const screenshot = this.state.refCamera.current.getScreenshot();

        const apiKey = "4b82ef1a5a7f4c2a9c23380768522746";
        const apiEndpoint = "https://australiaeast.api.cognitive.microsoft.com/customvision/v3.0/Prediction/";
        const base64 = require('base64-js');
        const base64content = screenshot.split(";")[1].split(",")[1]
        const byteArray = base64.toByteArray(base64content);

        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                "cache-control": "no-cache",
                "Prediction-Key": apiKey,
                "Content-Type": "application/octet-stream"
            },
            method: "POST"
        }).then(response => {
            if (!response.ok) {
                alert(response.statusText)
            } else {
                response.json().then((json: any) => {
                    console.log(json.predictions[0])

                    this.setState({ predResult: json.predictions[0] })
                    if (this.state.predResult.probability > 0.7) {
                        this.setState({ authenticated: true })
                    } else {
                        this.setState({ authenticated: false })
                        console.log(json.predictions[0].tagName)
                        alert("Authentication failed");
                    }
                })
            }
        });
    }

    private handleClick = (userId: number, username: string) => {
        if (userId === 1) {
            this.setState({ authenticating: true });
        } else {
            this.props.handleLogin(userId, username);
        }
    }

    private manageUsers = (e: any) => {

    }

    private displayUsers = () => {
        if (this.state.users != null) {
            return (
                <div className="user-list">
                    {this.state.users.map((user: any) =>
                        <div className="user-wrap">
                            <div className="user" onClick={() => this.handleClick(user.userId, user.name)} >
                                <img className="avatar" key={user.userId} src={this.getAvatar(user)} alt=""></img>
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
                        <div className="login-button">
                            <div className="btn btn-primary bottom-button" onClick={this.authenticate}>Login</div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}