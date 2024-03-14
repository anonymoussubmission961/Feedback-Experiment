import React, { Component } from "react";

class BlinkingCursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({
                isVisible: !prevState.isVisible,
            }));
        }, 500); // Change blinking speed here
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <span
                style={{
                    width: "12px", // Adjust the width and height to change the size of the circle
                    height: "12px",
                    marginLeft: "3px", // Adjust the margin to change the distance between the circle and the text
                    backgroundColor: "gray", // Change the background color to change the color of the circle
                    borderRadius: "50%", // Ensures it's a circle
                    display: "inline-block",
                }}
            ></span>
        );
    }
}

export default BlinkingCursor;
