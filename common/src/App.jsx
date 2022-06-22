import React from "react";
import ReactButton from "./components/ReactButton";
import AmountItem from "./components/AmountItem";

function App() {
    return (
        <>
            <h1 className="content">
                Here is an application to share components
            </h1>
            <ReactButton />

            <AmountItem />
        </>
    );
}

export default App;
