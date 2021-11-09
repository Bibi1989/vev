import React from "react";
import styled from "styled-components";
import "./App.css";
import Circle from "./components/Circle";

function App() {
  return (
    <AppContainer>
      <Circle />
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
