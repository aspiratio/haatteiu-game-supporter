import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { db, firebaseConfig } from "./service/firebase";
import { getDoc, doc, collection } from "@firebase/firestore";

async function test() {
  const userRef = doc(db, "users", "SXh73ZwkamCv3a3m0nrJ");
  await getDoc(userRef)
    .then((doc) => console.log(doc.data()))
    .catch((error) => console.log(error));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={test}>Learn React</button>
      </header>
    </div>
  );
}

export default App;
