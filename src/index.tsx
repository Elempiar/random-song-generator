import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ConfigProvider } from "./Config/Config.provider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GradesPage } from "./Config/Config.page";
import { TabGeneratorPage } from "./TabGenerator/TabGenerator.page";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <div className="mx-auto container space-y-4 my-8">
          <Switch>
            <Route path="/generated-tab">
              <TabGeneratorPage />
            </Route>
            <Route exact path="/">
              <GradesPage></GradesPage>
            </Route>
          </Switch>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
