import React, { useReducer, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/Button";
import Operations from "./components/Operations";
import Clear from "./components/Clear";
import Delete from "./components/Delete";

let result = "";
let newCalc = false;
let styleMode= 0
export const Actions = {
  add_digit: "add-digit",
  choose_Operation: "choose_Operation",
  clear: "clear",
  delete: "delete",
  result: "result",
};

const reducer = (state, { type, payload }) => {
 
  switch (type) {
    default:
      return {
        state,
      };

    case Actions.add_digit:
      if (newCalc && payload.digit === ".") {
        state.mainDisplay = "";
        newCalc = false;

        return {
          state,
          mainDisplay: `${(state.mainDisplay = "0")}${payload.digit}`,
        };
      }
      if (newCalc) {
        state.mainDisplay = "";
        newCalc = false;

        return {
          state,
          mainDisplay: payload.digit,
        };
      }

      if (payload.digit === "0" && !state.mainDisplay)
        return {
          state,
          mainDisplay: "0",
        };
      if (payload.digit === "0" && state.mainDisplay === "0")
        return {
          state,
          mainDisplay: "0",
        };
      if (payload.digit === "." && state.mainDisplay === "0")
        return {
          state,
          mainDisplay: `${(state.mainDisplay = "0")}${payload.digit}`,
        };
      if (state.operation) {
        return {
          ...state,
          secondary: `${state.secondary || ""}${payload.digit}`,
        };
      }
      if (payload.digit !== "0" && state.mainDisplay === "0")
        return {
          state,
          mainDisplay: payload.digit,
        };

      return {
        ...state,
        mainDisplay: `${state.mainDisplay || ""}${payload.digit}`,
      };

    case Actions.choose_Operation:
     
      if (newCalc) {
        newCalc = false;
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (!state.mainDisplay || state.mainDisplay === "0" || state.mainDisplay === "0.") {
        return {
          state,
          mainDisplay: "0",
          operation: "",
        };
      }
      return {
        ...state,
        operation: payload.operation,
      };

    case Actions.clear:
      return {
        state,
        mainDisplay: "0",
      };

    case Actions.delete:
      if (
        !state.mainDisplay ||
        state.mainDisplay === "0" ||
        state.mainDisplay.length === 1
      )
        return {
          state,
          mainDisplay: "0",
        };
      if (state.secondary && state.operation)
        return {
          ...state,
          secondary: state.secondary.slice(0, -1),
        };
      if (state.operation)
        return {
          ...state,
          operation: "",
        };
      return {
        ...state,
        mainDisplay: state.mainDisplay.slice(0, -1),
      };
    case Actions.result:
      if(!state.secondary){
        return{
          state,
          mainDisplay: state.mainDisplay,
          secondary:state.symbol,
         
        }
      }
      return {
        state,
        mainDisplay: lastResult(state),
      };
  }
};

function lastResult({ mainDisplay, secondary, operation }) {
  const main = parseFloat(mainDisplay);
  const second = parseFloat(secondary);
  result = "";

  switch (operation) {
    case "+":
      result = main + second;
      break;
    case "×":
      result = main * second;
      break;
    case "-":
      result = main - second;
      break;
    case "÷":
      result = main / second;
      break;

    default:
  }

  newCalc = true;
  if (result % 1 === 0) {
    return result.toString();
  } else {
    return result.toFixed(2).toString();
  }
}

function App() {
  const [bodyColor, setBodyColor] = useState("");
  const [bcColor, setBcColor] = useState("");
  const [color, setColor] = useState("");
  const [colorTwo, setColorTwo] = useState("");
  const [colorThree, setColorThree] = useState("");
  const [colorFour, setColorFour] = useState("#e8ff00");

  
  
  function getStyle() {
  
    if (styleMode < 3) {
      styleMode++;
    } else {
      styleMode = 1;
    }
    console.log(styleMode)
    switch (styleMode) {
      case 1:
        setBodyColor("#245a74");
        setBcColor("#445a65");
        setColor("#cddc39");
        setColorTwo("#ff9800");
        setColorThree("#00bcd4");
        setColorFour("#00bcd4");
        
        break;
      case 2:
        setBodyColor("#ff5800");
        setBcColor("#f1fb86");
        setColor("#5f12e8");
        setColorTwo("#01fa0b");
        setColorThree("#ffeb3b");
        setColorFour("#ff5722");
        break;
      case 3:
        setBodyColor("#3f51b5");
        setBcColor("#1b2b86");
        setColor("#ff9800");
        setColorTwo("#01d0ff");
        setColorThree("#cbe103");
        setColorFour("#e8ff00");
        break;
      default:
        setBodyColor("#3f51b5");
        setBcColor("#1b2b86");
        setColor("#ff9800");
        setColorTwo("#01d0ff");
        setColorThree("#cbe103");
        setColorFour("#e8ff00");
    }
  }

  const [{ mainDisplay, secondary, operation ,symbol}, dispatch] = useReducer(
    reducer,
    { mainDisplay: "0" }
  );

  return (
    <>
      <h1>Calculator-React-App</h1>
      <div className="calculator-grid" style={{ backgroundColor: bodyColor }}>
        <div className="output" style={{ color: colorTwo }}>
          <div className="secondary" style={{ color: colorThree }}>
            {secondary}
            {operation}
          </div>
          <div className="main">{mainDisplay}</div>
        </div>
        <Clear dispatch={dispatch} color={color} bcColor={bcColor} />
        <button
          onClick={getStyle}
          style={{
            fontStyle: "italic",
            color: colorFour,
            backgroundColor: bcColor,
          }}
        >
          ST
        </button>
        <Delete dispatch={dispatch} color={color} bcColor={bcColor} />

        <Operations
          operation="÷"
          dispatch={dispatch}
          color={color}
          bcColor={bcColor}
        />

        <Button digit="7" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="8" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="9" dispatch={dispatch} color={color} bcColor={bcColor} />

        <Operations
          operation="×"
          dispatch={dispatch}
          color={color}
          bcColor={bcColor}
        />

        <Button digit="4" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="5" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="6" dispatch={dispatch} color={color} bcColor={bcColor} />

        <Operations
          operation="+"
          dispatch={dispatch}
          color={color}
          bcColor={bcColor}
        />

        <Button digit="1" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="2" dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="3" dispatch={dispatch} color={color} bcColor={bcColor} />

        <Operations
          operation="-"
          dispatch={dispatch}
          color={color}
          bcColor={bcColor}
        />

        <Button digit="." dispatch={dispatch} color={color} bcColor={bcColor} />
        <Button digit="0" dispatch={dispatch} color={color} bcColor={bcColor} />
        <button
          onClick={() => {
            dispatch({ type: Actions.result });
          }}
          className="span-three"
          style={{ backgroundColor: bcColor, color: color }}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
