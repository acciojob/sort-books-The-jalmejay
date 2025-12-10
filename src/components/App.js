
import React from "react";
import './../styles/App.css';
import { Provider } from "react-redux";
import BooksList from "./BookList";
import store from "../redux/store";


const App = () => {
  return (
    <Provider store={store}>
      <BooksList />
    </Provider>
  )
}

export default App