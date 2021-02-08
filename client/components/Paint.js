import React, { Component } from "react";

class Paint extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.state = {
      currentPostId: props.currentPostId,
      canvasHeight: 600,
      canvasWidth: 600,
      drawing: false,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      color: "black",
      currentDataUrl: "",
    };
    this.startPath = this.startPath.bind(this);
    this.endPath = this.endPath.bind(this);
    this.draw = this.draw.bind(this);
    this.setColor = this.setColor.bind(this);
    this.saveCanvas = this.saveCanvas.bind(this);

    this.updateState = props.updateState.bind(this);
  }

  //on instantiation
  //make canvas ref point to current
  componentDidMount() {
    let canvasRef = this.canvasRef.current;
    this.ctx = canvasRef.getContext("2d");
    let canvasField = canvasRef.getBoundingClientRect();

    this.setState({ offsetX: canvasField.left, offsetY: canvasField.top });
  }

  //handle mousedown to start path
  startPath(e) {
    //get context
    let ctx = this.ctx;

    //begin path, set settings
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.state.color;

    //move cursor ref based on offset
    ctx.moveTo(e.clientX - this.state.offsetX, e.clientY - this.state.offsetY);

    //set drawing and get ref begining path coords
    this.setState({
      drawing: true,
      startX: e.clientX - this.state.offsetX,
      startY: e.clientY - this.state.offsetY,
    });
  }

  draw(e) {
    //get context from mount instantiation
    let ctx = this.ctx;

    //if drawing, make a subpath
    if (this.state.drawing) {
      ctx.lineTo(
        e.clientX - this.state.offsetX,
        e.clientY - this.state.offsetY
      );
    }
    ctx.stroke();
  }

  endPath(e) {
    let ctx = this.ctx;

    //set path to the start
    ctx.moveTo(this.state.startX, this.state.startY);

    //close path, set drawing to false
    ctx.closePath();
    this.setState({ drawing: false });
  }

  setColor(color) {
    this.setState({ color: color });
  }

  //this saves canvas to storage
  saveCanvas() {
    //convert current canvals to URL png
    const dataURL = this.canvasRef.current.toDataURL();

    //set req body with data
    const body = {
      author: "bob",
      subPostId: this.state.currentPostId,
      createDate: "123",
      updateDate: "321",
      image: dataURL,
      discussion: [],
    };

    //make post request to post subpost
    fetch("/api/subposts/4", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="canvas_container">
        <div className="button_container">
          <button
            onClick={() => {
              this.setColor("black");
            }}
            className="button_color button_black"
          ></button>
          <button
            onClick={() => {
              this.setColor("red");
            }}
            className="button_color button_red"
          ></button>
          <button
            onClick={() => {
              this.setColor("blue");
            }}
            className="button_color button_blue"
          ></button>
          <button
            onClick={() => {
              this.setColor("yellow");
            }}
            className="button_color button_yellow"
          ></button>
          <button
            onClick={() => {
              this.setColor("green");
            }}
            className="button_color button_green"
          ></button>
          <button
            onClick={() => {
              this.setColor("purple");
            }}
            className="button_color button_purple"
          ></button>
          <button
            onClick={() => {
              this.setColor("white");
            }}
            className="button_white"
          ></button>
          <button
            onClick={() => {
              this.saveCanvas();
              this.updateState();
              //right here problems
            }}
            className="button_color button_save"
          >
            Save!
          </button>
        </div>
        <canvas
          className="paint_canvas"
          ref={this.canvasRef}
          onMouseDown={this.startPath}
          onMouseUp={this.endPath}
          onMouseMove={this.draw}
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
        />
      </div>
    );
  }
}

export default Paint;
