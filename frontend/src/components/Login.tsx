import * as React from "react";
import Webcam from "react-webcam";
import Header from "./NavStructure/Header";

interface IProps {
    handleLogin(userId: number, username: string): any;
}

interface IState {
    users: any;
    authenticating: boolean;
    managing: boolean;
    refCamera: any;
    predResult: any;
}

export default class Login extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            authenticating: false,
            managing: false,
            refCamera: React.createRef(),
            predResult: null
        };
    }

    private getAvatar = (user: any) => {
        return "/avatars/" + (user.user_id % 5 + 1) + ".svg";
    }

    private authenticate = () => {
        const screenshot = this.state.refCamera.current.getScreenshot();

        const apiKey = "4b82ef1a5a7f4c2a9c23380768522746";
        const apiEndpoint = "https://australiaeast.api.cognitive.microsoft.com/customvision/v3.0/Prediction/024de653-0188-4e51-b8eb-03a9c5a202ef/classify/iterations/Iteration3/image";
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
                    this.setState({ predResult: json.predictions[0] })
                    if (this.state.predResult.probability > 0.7 && this.state.predResult.tagName !== "Negative") {
                        this.props.handleLogin(1, this.state.users[0].username);
                    } else {
                        console.log(json.predictions[0].probability + "% matching");
                        alert("Authentication failed");
                    }
                })
            }
        });
    }

    private handleClick = (user_id: number, username: string) => {
        if (user_id === 1) {
            this.setState({ authenticating: true });
        } else {
            this.props.handleLogin(user_id, username);
        }
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        const username = e.target.search.value;
        this.manageUsers(-1, username, "add");
    }

    private manageUsers = (user_id: number, username: string, action: string) => {
        if (user_id === 1) {
            alert("You cannot delete this user!");
            return;
        } else if (action === "add") {
            fetch("https://mmtapi.azurewebsites.net/api/Users", {
                body: JSON.stringify({ "username": username }),
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "application/json"
                },
                method: "POST"
            }).then(response => {
                if (response.ok) {
                    response.json().then((result: any) => {
                        const users = [...this.state.users];
                        users.push({ user_id: result.user_id, username: result.username });
                        this.setState({ users });
                    })
                }
            })
        } else if (action === "delete") {
            fetch("https://mmtapi.azurewebsites.net/api/Users/" + user_id, { method: "DELETE" }
            ).then(response => {
                if (response.ok) {
                    response.json().then((result: any) => {
                        var users = [...this.state.users];
                        users = users.filter((user) => { return user.user_id !== result.user_id; })
                        this.setState({ users });
                    })
                }
            })
        }
    }

    private displayUsers = (del: string) => {
        if (this.state.users != null) {
            return (
                <div className="user-list">
                    {this.state.users.map((user: any) =>
                        <div className="user-wrap" key={user.user_id} >
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                            <div className="user" onClick={() => this.handleClick(user.user_id, user.username)} >
                                <img src={"/avatars/" + (user.user_id % 5 + 1) + ".svg"} alt=""></img>
                                <h2>{user.username}</h2>
                            </div>
                            <button className={"del-btn" + del} onClick={() => this.manageUsers(user.user_id, "", "delete")}><i className="material-icons">cancel</i></button>
                        </div>
                    )}
                </div>
            );
        }
    }

    componentDidMount() {
        fetch("https://mmtapi.azurewebsites.net/api/Users", {
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
        const { authenticating, managing } = this.state;
        if (!authenticating && !managing) {
            return (
                <div>
                    <Header />
                    <div className="login">
                        <h2 className="sel-header">Select user</h2>
                        {this.displayUsers("")}
                    </div>
                    <div className="login-btns">
                        <button className="login-manage" onClick={() => this.setState({ managing: true })}>Manage Users</button>
                    </div>

                </div >
            );
        } else if (!authenticating && managing) {
            return (
                <div>
                    <Header />
                    <div className="login">
                        <h2 className="sel-header">Select user</h2>
                        {this.displayUsers("-del")}
                    </div>
                    <div className="login-btns">
                        <button className="login-done" onClick={() => this.setState({ managing: false })}>Done</button>
                        <div className="add-user">
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                            <form className="input-bar" onSubmit={this.handleSubmit}>
                                <input type="text" name="search" className="text-field" placeholder="Add user" />
                                <button type="submit" className="add-button" >
                                    <i className="material-icons">add</i>
                                </button>
                            </form>
                        </div>
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
                    <div className="auth-btn">
                        <button className="back-button" onClick={() => this.setState({ authenticating: false })}>Back</button>
                        <button className="login-button" onClick={this.authenticate}>Login</button>
                    </div>
                </div>
            );
        }

    }
}