import React from "react";
import socketIO from 'socket.io-client';

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            message: '',
            messages: [],
            chatname: ''
        };
        this.room = 'wuyeurywer948248232hsfhshsks';
        this.socket = socketIO("http://localhost:5000");

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('sendMessage', {
                username: this.state.username,
                message: this.state.message,
                room: this.room
            });
            this.setState({ message: '' });
        }

        this.socket.on('receiveMessage', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">CHAT ITEM</div>
                                <hr />
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.username}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">                                
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;