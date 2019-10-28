import React from 'react'

class Information extends React.Component {

    constructor(props) {
        super(props)
        this.state = {text:"role"}
    }
    handlebutton = ()=>{
        this.setState({text:"text"})
    }
    render() {
        return (
            <div className={this.props.className}>
            <button onClick={this.handlebutton}>button</button>
            <div >{this.state.text}</div>
            </div>
        )
    }
}

export default Information