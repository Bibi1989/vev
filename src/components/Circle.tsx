import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { diagonalAngle, diagonalLine } from "../lib/diagonal";

const Circle = () => {
  const nodeRef = useRef(null);

  const [circleOneValues, setCircleOneValues] = useState({
    x: 0,
    y: 0,
  });
  const [circleTwoValues, setCircleTwoValues] = useState({
    x: 0,
    y: 0,
  });

  const handleChangeOne = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      setCircleOneValues({
        ...circleOneValues,
        [name]: parseInt(value),
      });
    } else {
      setCircleOneValues({
        ...circleOneValues,
        [name]: 0,
      });
    }
  };

  const handleChangeTwo = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      setCircleTwoValues({
        ...circleTwoValues,
        [name]: parseInt(value),
      });
    } else {
      setCircleTwoValues({
        ...circleTwoValues,
        [name]: 0,
      });
    }
  };

  const handleDragTwo = (e: DraggableEvent, data: DraggableData) => {
    const { lastX, lastY } = data;
    setCircleTwoValues({
      ...circleTwoValues,
      x: lastX,
      y: lastY,
    });
  };

  const circleX = Math.abs(circleTwoValues.x - circleOneValues.x);
  const circleY = Math.abs(circleTwoValues.y - circleOneValues.y);

  const line = diagonalLine(circleX, circleY);

  const diffX = Math.abs((circleTwoValues.x - circleOneValues.x) / 2 + 75);
  const diffY = Math.abs((circleTwoValues.y - circleOneValues.y) / 2 + 75);

  const angleX = diagonalAngle(circleX, circleY);

  const handleChangeLine = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const a = line - parseInt(value);
    if (value) {
      setCircleTwoValues({
        x: circleTwoValues.x + a,
        y: circleTwoValues.y + a,
      });
    }
  };

  return (
    <Container>
      <CircleContainer
        id="circle1"
        style={{
          top: circleOneValues.y,
          right: circleOneValues.x,
          bottom: circleOneValues.y,
          left: circleOneValues.x,
        }}
      >
        <div className="input_div">
          <label>X</label>
          <input
            type="number"
            onChange={handleChangeOne}
            name="x"
            value={circleOneValues.x}
          />
        </div>
        <div className="input_div">
          <label>Y</label>
          <input
            type="number"
            onChange={handleChangeOne}
            name="y"
            value={circleOneValues.y}
          />
        </div>
        <Line
          style={{
            top: diffY - 22,
            left: diffX - 22,
            zIndex: 1,
          }}
          rotate={angleX}
        >
          <input
            type="number"
            value={line}
            onChange={handleChangeLine}
            name="x"
          />
        </Line>
      </CircleContainer>
      <LineDiagram
        style={{
          width: line,
          left: circleOneValues.x + 75,
          top: circleOneValues.y + 75,
        }}
        rotateX={angleX}
        translate={line}
      />
      <Draggable
        onDrag={handleDragTwo}
        defaultPosition={{ x: 0, y: 0 }}
        nodeRef={nodeRef}
      >
        <CircleContainer
          id="circle2"
          style={{
            top: circleTwoValues.y,
            right: circleTwoValues.x,
            bottom: circleTwoValues.y,
            left: circleTwoValues.x,
            zIndex: 1,
          }}
        >
          <div className="input_div">
            <label>X</label>
            <input
              type="number"
              onChange={handleChangeTwo}
              name="x"
              value={circleTwoValues.x}
            />
          </div>
          <div className="input_div">
            <label>Y</label>
            <input
              type="number"
              onChange={handleChangeTwo}
              name="y"
              value={circleTwoValues.y}
            />
          </div>
        </CircleContainer>
      </Draggable>
    </Container>
  );
};

const Container = styled.div``;

const Line = styled.div<{ rotate?: number }>`
  position: absolute;
  transform: ${({ rotate }) => rotate && `rotate(${rotate}deg)`};
  transform-origin: 0;
  z-index: -2;

  input {
    width: 50px;
    background-color: #071a39;
    color: white;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 8px;
  }
`;

const LineDiagram = styled.div<{
  rotateX?: number;
  translate?: any;
}>`
  border: 1px solid #333333;
  position: absolute;
  transform-origin: 0;
  transform: ${({ rotateX }) => `rotate(${rotateX || 0}deg)`};
  z-index: -1;
`;

const CircleContainer = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input_div {
    margin: 10px 0px;
    width: 60%;
    display: flex;

    label {
      margin-right: 10px;
    }

    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid #555555;
      background-color: transparent;
      outline: none;
    }
  }
`;

export default Circle;
