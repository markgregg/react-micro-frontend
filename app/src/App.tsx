import CompactSelect from "compact-select";
import React, { useState, useEffect } from "react";
import "./App.css";
import { applyTheme, themes, Themes } from "./themes/themes";
import Examples from "micro-front-end-component1";
import Demo from "micro-front-end-component2";
import About from "micro-front-end-component3";
import { bondList } from "./data/bondList";
import { bigChoices, words, typed, complex} from "./data/data";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const pages = ["About", "Examples", "Demo"];
 
const App = () => {
  const [themeName, setThemeName] = useState<string>(Themes.None.toString());
  const [page, setPage] = useState<string>("Examples");
  
  useEffect(()=> {
    applyTheme(Themes.None);
  },[])

  const setTheme = (theme: string[]) => {
    setThemeName(theme[0]);
    applyTheme(theme[0]);
  }

  return (
    <div className="frame">
      <div className="page">
        <div className="body">
          <div className="header">
            <h1 className="title">An example micro frontend app for React</h1>
            <p className="statement">
              A pratcial working example of how to create a micro frontend react app.
            </p>
          </div>
          <div className="menu-bar">
            <div className="menu">
              {pages.map((pg) => (
                <div
                  key={pg}
                  className="menu-item"
                  onClick={() => setPage(pg)}
                >
                  <p className="menu-text">{pg}</p>
                </div>
              ))}
            </div>
            <div className="theme">
              <CompactSelect
                maximumSelections={1}
                minimumSelections={1}
                selectType="dropdown"
                title="themes"
                choices={themes}
                selected={themeName}
                onChange={setTheme}
                width="80px"
              />
            </div>
          </div>
          <div className="context">
            {(page === "Examples" && <Examples bigChoices={bigChoices} words={words} typed={typed} complex={complex}/>) ||
              (page === "About" && <About/>) ||
              (page === "Demo" && <Demo bondList={bondList}/>)}
          </div>
          <div className="footer">
            <p className="footerText">Created by Mark Gregg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
