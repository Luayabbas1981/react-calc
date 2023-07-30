import React, { useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/Button";
import Operations from "./components/Operations";
import Clear from "./components/Clear";
import Delete from "./components/Delete";

let result = "";
let newCalc = false;
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
      if(newCalc){
        newCalc= false
        return{
          ...state,
        }
      }
      if (!state.mainDisplay || state.mainDisplay === "0") {
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
      if (!state.mainDisplay)
        return {
          state,
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
    case "*":
      result = main * second;
      break;
    case "-":
      result = main - second;
      break;
    case "/":
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
  const [{ mainDisplay, secondary, operation }, dispatch] = useReducer(
    reducer,
    { mainDisplay: "0" }
  );
  return (
    <>
      <h1>Calculator-React-App</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="secondary">
            {secondary}
            {operation}
          </div>
          <div className="main">{mainDisplay}</div>
        </div>
        <Clear dispatch={dispatch} />
        <Delete dispatch={dispatch} />

        <Operations operation="/" dispatch={dispatch} />

        <Button digit="1" dispatch={dispatch} />
        <Button digit="2" dispatch={dispatch} />
        <Button digit="3" dispatch={dispatch} />

        <Operations operation="*" dispatch={dispatch} />

        <Button digit="4" dispatch={dispatch} />
        <Button digit="5" dispatch={dispatch} />
        <Button digit="6" dispatch={dispatch} />

        <Operations operation="+" dispatch={dispatch} />

        <Button digit="7" dispatch={dispatch} />
        <Button digit="8" dispatch={dispatch} />
        <Button digit="9" dispatch={dispatch} />

        <Operations operation="-" dispatch={dispatch} />

        <Button digit="0" dispatch={dispatch} />
        <Button digit="." dispatch={dispatch} />
        <button
          onClick={() => {
            dispatch({ type: Actions.result });
          }}
          className="span-three"
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
