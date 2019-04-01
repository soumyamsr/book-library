import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route,  Switch} from "react-router-dom";

import Header from "Components/Header";
import HomePage from "Containers/HomePage";
import DetailPage from "Containers/DetailPage";
import store from "./store";
import { BooksAppState } from "./store/types";

import "./styles/style.scss";

interface BooksProps {}

export default class App extends React.Component<BooksProps, BooksAppState> {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
              <Header title="Book Library" />
              <Switch>
                  <Route exact path="/" render={(props) => (<HomePage {...props} />)} />
                  <Route path="/books/:bookId" render={(props) => (<DetailPage {...props} />)} />
                  <Route render={() => <h1>Page not found!</h1>} />
              </Switch>
            </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}
