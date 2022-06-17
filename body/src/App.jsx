import React from "react";
import ReactDOM from "react-dom";
import Body from "./Body";
import mountFooter from "footer/mountFooter";

import "./index.scss";

window.headers.get('./Header').then((data) => {
  const Header = data().default;
  new Header({
    target:document.getElementById("header")
  })
})

mountFooter("#footer")


const App = () => (
  <div className="m-2 p-5 bg-blue-300">
    <div>
        Body - React
    </div>
    <Body/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
