import React, { useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/Button";
import Oprations from "./components/Oprations";
import Clear from "./components/Clear";
import Delete from "./components/Delete";

export const Actions = {
  add_digit: "add-digit",
  choose_opration: "chosse-opration",
  clear: "clear",
  delete: "delete",
  resualt: "resualt",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    default:
      return state;

    case Actions.add_digit:
     
      if (payload.digit === "0" && !state.mainDisplay)
        return {
          state,
        };
      if (state.opration) {
        return {
          ...state,
          secondary: `${state.secondary || ""}${payload.digit}`,
        };
      }

      return {
        ...state,
        mainDisplay: `${state.mainDisplay || ""}${payload.digit}`,
      };

    case Actions.choose_opration:
      if (!state.mainDisplay) {
        return state;
      }
      return {
        ...state,
        opration: payload.opration,
      };

    case Actions.clear:
      return {
        state,
      };

    case Actions.delete:
      if(!state.mainDisplay) return{
        state
      }
      if(state.secondary && state.opration)return{
        ...state,
        secondary:state.secondary.slice(0,-1)
      }
      if(state.opration) return{
        ...state,
        opration:""
      }
      return {
        ...state,
        mainDisplay: state.mainDisplay.slice(0, -1),
      };
    case Actions.resualt:
      return {
        state,
        mainDisplay: lastResualt(state),
      };
  }
};

function lastResualt({ mainDisplay, secondary, opration }) {
  
  const main = parseInt(mainDisplay )
  const second = parseInt(secondary)
  console.log( main);
 
  let resualt = "";

  switch (opration) {
    case "+":
      resualt = main + second;
      break;
    case "*":
      resualt = main * second;
      break;
    case "-":
      resualt = main - second;
      break;
    case "/":
      resualt = main / second;
      break;

    default:
  }

  return resualt.toString()
}

function App() {
  const [{ mainDisplay, secondary, opration }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <>
    <h1>Calculator-React-App</h1>
    <div className="calculator-grid">
      <div className="output">
        <div className="secondary">
          {secondary}
          {opration}
        </div>
        <div className="main">{mainDisplay}</div>
      </div>
      <Clear dispatch={dispatch} />
      <Delete dispatch={dispatch} />

      <Oprations opration="/" dispatch={dispatch} />

      <Button digit="1" dispatch={dispatch} />
      <Button digit="2" dispatch={dispatch} />
      <Button digit="3" dispatch={dispatch} />

      <Oprations opration="*" dispatch={dispatch} />

      <Button digit="4" dispatch={dispatch} />
      <Button digit="5" dispatch={dispatch} />
      <Button digit="6" dispatch={dispatch} />

      <Oprations opration="+" dispatch={dispatch} />

      <Button digit="7" dispatch={dispatch} />
      <Button digit="8" dispatch={dispatch} />
      <Button digit="9" dispatch={dispatch} />

      <Oprations opration="-" dispatch={dispatch} />

      <Button digit="0" dispatch={dispatch} />

      <button
        onClick={() => {
          dispatch({ type: Actions.resualt });
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
