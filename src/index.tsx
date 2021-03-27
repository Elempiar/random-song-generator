import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { GradesProvider } from "./Grades/Grades.provider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GradesPage } from "./Grades/Grades.page";
import { SongGeneratorPage } from "./SongGenerator/SongGenerator.page";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GradesProvider>
        <Switch>
          <Route path="/song-generator">
            <SongGeneratorPage />
          </Route>
          <Route exact path="/">
            <GradesPage></GradesPage>
          </Route>
        </Switch>
      </GradesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
