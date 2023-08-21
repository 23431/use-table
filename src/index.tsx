import React, { useEffect } from "react";

import ReactDom from "react-dom";
import useTable from "./hooks/useTable";


function App() {
    const { data,submit } = useTable(() => Promise.resolve({ list: [1, 2, 3], total: 0 }));
    console.log(data);
    useEffect(()=>{submit()},[])
    return <div>test</div>
}


ReactDom.render(<App />, document.getElementById('root'));