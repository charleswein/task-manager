import {useState, ReactNode, PropsWithChildren} from "react";
import classes from "./App.module.scss";
import {Link, Outlet} from "react-router-dom";

import Vector from "@/assets/Vector.png";

import Vector2 from "@/assets/Vector.svg";

type AppProps = PropsWithChildren<{
  children?: ReactNode;
}>

// tree shaking test

const TODO = (text: string) => {
  TODO2(text);
};

const TODO2 = (text: string) => {
  throw new Error(text);
};

const App = ({children} : AppProps) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    TODO("increment");
  };

  return (
     <div data-testid="App">
       <img src={Vector} alt="Vector" />
       <Vector2 color={"red"}/>
       <Link to="/about">About</Link>
       <br />
       <Link to="/shop">Shop</Link>
       <p>You clicked {count} times</p>
       <button onClick={increment} className={classes.button}>
         <span>Click me</span>
       </button>
       <Outlet />
     </div>
  );
};

export default App;

