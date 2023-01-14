import { OptionType } from "ag-grid-universal-filter";
import Demo from "../Demo";

export interface Category {
  name: string;
  demo: () => JSX.Element;
}
export interface Complex {
  name: string;
  value: number;
  description: string;
}

export interface ExampleProps {
  bigChoices: string[];
  words: string[];
  complex: Complex[];
  typed: OptionType[];
}

export interface ExampleModel {
  categories: Category[];
  constructDemo: (demoName: string) => JSX.Element;
}

const formatDate = (date: Date): string => date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();

export const createExampleModel: (props: ExampleProps) => ExampleModel = ({
  bigChoices,
  words,
  complex,
  typed
}) : ExampleModel => {
  
  const fetchItems = (text: string): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(bigChoices.filter((item) => item.startsWith(text.toUpperCase())));
      }, Math.floor(Math.random() * 1500));
    });
  };

  const model = {
    categories: [
      {
        name: "Binding",
        demo: () => (
          <div className="demo">
            <Demo
              description="The simpliest way to use the universal select - set the options to an array of strings"
              props={{
                minWidth: "400px",
                title: "Bind String",
                choices: [
                  {
                    key: "Words",
                    options: words,
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          options: options,
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-string-binding-ooesy7"
            />
            <Demo
              description="Universal select can be bound to objects"
              props={{
                minWidth: "400px",
                title: "Bind String",
                choices: [
                  {
                    key: "Words",
                    options: complex,
                    text: (option: Complex) => option.name,
                    value: (option: Complex) => option.value.toString(),
                    search: "both"
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { options, Complex } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          options: options,
                          text: (option: Complex) => option.name,
                          value: (option: Complex) => option.value,
                          search: "both"
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-object-binding-forked-oripsu"
            />
            <Demo
              description="Universal select can be bound to an object that implements OptionType"
              props={{
                minWidth: "400px",
                title: "Bind String",
                choices: [
                  {
                    key: "Words",
                    options: typed,
                    search: "both"
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          prefix: "words",
                          options: options,
                          search: "both"
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-typed-binding-forked-dqgq6g"
            />
          </div>
        ),
      },
      {
        name: "Single Select",
        demo: () => (
          <div className="demo">
            <Demo
              description="Limit users to one selection"
              props={{
                minWidth: "400px",
                title: "Single select",
                choices: [
                  {
                    key: "Words",
                    options: words,
                    maximumSelections: 1
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          options: options,
                          maximumSelections: 1
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-single-selection-forked-izdhxr"
            />
          </div>
        ),
      },
      {
        name: "Multi Select",
        demo: () => (
          <div className="demo">
            <Demo
              description="Limit users to 3 selections"
              props={{
                minWidth: "400px",
                title: "Multi Select",
                choices: [
                  {
                    key: "Words",
                    prefix: "words",
                    options: words,
                    maximumSelections: 3
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          prefix: "words",
                          options: options,
                          maximumSelections: 3
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-multi-selection-forked-dg5vb2"
            />
          </div>
        ),
      },
      {
        name: "Look-up",
        demo: () => (
          <div className="demo">
            <Demo
              description="Use a promise to provide options"
              props={{
                minWidth: "400px",
                title: "Look-up",
                choices: [
                  {
                    key: "Words",
                    lookUp: fetchItems
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { fetchItems } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          prefix: "words",
                          lookUp: fetchItems
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-look-up-forked-r3upk7"
            />
            <Demo
              description="Use a promise to provide and cache results"
              props={{
                minWidth: "400px",
                title: "Cache",
                choices: [
                  {
                    key: "Words",
                    lookUp: fetchItems
                  }
                ],
                cacheLookUp: true
              }}
              code={`import UniversalSelect from "universal-select";
              import { fetchItems } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          lookUp: fetchItems
                        }
                      ]}
                      cacheLookUp={true}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-look-up-cached-forked-1hdzzv"
            />
            <Demo
              description="Use a promise to provide and cache results. Results expirr after specified time"
              props={{
                minWidth: "400px",
                title: "Expiry",
                choices: [
                  {
                    key: "Words",
                    lookUp: fetchItems
                  }
                ],
                cacheLookUp: true,
                cacheTimeToLive: 5,
                cacheExpiryCheck: 5
              }}
              code={`import UniversalSelect from "universal-select";
              import { fetchItems } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          lookUp: fetchItems
                        }
                      ]}
                      cacheLookUp={true}
                      cacheTimeToLive={5}
                      cacheExpiryCheck={5}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-look-up-cached-expire-forked-lldoph"
            />
          </div>
        ),
      },
      {
        name: "Custom Values",
        demo: () => (
          <div className="String">
            <Demo
              description="No list, just enter one of the below operators and enter a string. For example !%abc."
              points={["= (equals)", "! (not equals)", "% (contains)", "!% (not contains)", "%< (starts with)", "%> (ends with)", "& (and)", "| (or)"]}
              props={{
                minWidth: "400px",
                title: "Custom Text",
                choices: [
                  {
                    key: "Words",
                    regExMatch: /.*/
                  },
                ],
              }}
              code={`import UniversalSelect from "universal-select";
              import { fetchItems } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          regExMatch: /.*/
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-custom-values-scvyjk"
            />
            <Demo
              description="No list, just enter one of the below operators and enter a string. For example <=.5."
              points={["= (equals)", "! (not equals)", "> (greater)", "< (less)", ">= (greater equal)", "<= (less equals)", "& (and)", "| (or)"]}
              props={{
                minWidth: "400px",
                title: "Custom Number",
                choices: [
                  {
                    key: "Words",
                    regExMatch: /^\d{0,1}(\.\d{1,4})?$/,
                    filterType: "number"
                  }
                ],
                cacheLookUp: true
              }}
              code={`import UniversalSelect from "universal-select";
    
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          regExMatch: /^\d{0,1}(\.\d{1,4})?$/,
                          filterType: "number"
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-custom-number-forked-d0eq1z"
            />
            <Demo
              description="No list, just enter one of the below operators and enter a number. For example >50."
              points={["= (equals)", "! (not equals)", "> (greater)", "< (less)", "& (and)", "| (or)" ]}
              props={{
                minWidth: "400px",
                title: "Cusom Dateas",
                choices: [
                  {
                    key: "Words",
                    regExMatch: /^[0-9]{0,2}$/,
                    valueGetter: (text: string) => {
                      const now = new Date();
                      const years = parseInt(text);
                      return formatDate(new Date(now.setFullYear(now.getFullYear() + years)));
                    },
                    filterType: "date"
                  }
                ],
                cacheLookUp: true
              }}
              code={`import UniversalSelect from "universal-select";
    
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          regExMatch: /^[0-9]{0,2}$/,
                          valueGetter: (text: string) => {
                            const now = new Date();
                            const years = parseInt(text);
                            return formatDate(
                              new Date(now.setFullYear(now.getFullYear() + years))
                            );
                          },
                          filterType: "date"
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-custom-dates-forked-3ijv6h"
            />
          </div>
        ),
      },
      {
        name: "Selection prefixed",
        demo: () => (
          <div className="demo">
            <Demo
              description="Limit users to one selection"
              props={{
                minWidth: "400px",
                title: "Prefixed",
                choices: [
                  {
                    prefix: "Words",
                    key: "Words",
                    options: words
                  },
                ]
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          prefix: "Words",
                          key: "Words",
                          options: options
                        }
                      ]}
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-no-prefix-b9c2kf"
            />
          </div>
        ),
      },
      {
        name: "Disabled",
        demo: () => (
          <div className="demo">
            <Demo
              description="Limit users to one selection"
              props={{
                minWidth: "400px",
                title: "Disabled",
                choices: [
                  {
                    key: "Words",
                    options: words
                  },
                ],
                disabled: true
              }}
              code={`import UniversalSelect from "universal-select";
              import { options } from "./data";
              
              import "./styles.css";
              
              export default function App() {
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      choices={[
                        {
                          key: "Words",
                          options: options
                        }
                      ]}
                      disabled
                    />
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-disabled-zrbojv"
            />
          </div>
        ),
      },
      {
        name: "Ag-Grid",
        demo: () => (
          <div className="demo">
            <Demo
              description="The selection can be linked to an a-grid control and requires very little other than a grid reference and a column against the choice definition. "
              props={{
                minWidth: "400px",
                title: "Ag-Grid",
                choices: [
                  {
                    key: "Name",
                    prefix: "Name",
                    options: words,
                    regExMatch: /.*/,
                    agGridColumn: "name"
                  },
                  {
                    key: "Value",
                    prefix: "Value",
                    regExMatch: /\d+/g,
                    filterType: "number",
                    agGridColumn: "value",
                    replaceExisting: true
                  },
                  {
                    key: "Descripton",
                    prefix: "Desc",
                    regExMatch: /.*/,
                    filterType: "text",
                    agGridColumn: "description"
                  }
                ],
              }}
              complex={complex}
              showAgGrid={true}
              code={`import { useState } from "react";
              import UniversalSelect from "universal-select";
              import { AgGridReact } from "ag-grid-react";
              import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
              import { words, Complex, complex } from "./data";
              import "ag-grid-community/styles/ag-grid.css";
              import "ag-grid-community/styles/ag-theme-alpine.css";
              import "./styles.css";
              
              export default function App() {
                const [rowData] = useState<Complex[]>(complex);
                const [columnDefs] = useState<ColDef<Complex>[]>([
                  { field: "name", headerName: "Name", filter: "agSetColumnFilter", resizable: true, width: 100 },
                  { field: "value", headerName: "Value", filter: "agNumberColumnFilter", resizable: true, width: 90 },
                  { field: "description", headerName: "Description", filter: "agTextColumnFilter", resizable: true, width: 300 }
                ]);
                const [aggridApi, setAggridApi] = useState<GridApi<Complex>>();
              
                const style = {
                  height: "200px",
                  width: "100%"
                };
              
                const gridReady = (event: GridReadyEvent<Complex>) => {
                  setAggridApi(event.api);
                  event.columnApi.autoSizeAllColumns();
                };
              
                return (
                  <div className="Space">
                    <UniversalSelect
                      title="test"
                      agGridApi={aggridApi}
                      choices={[
                        {
                          key: "Name",
                          options: words,
                          agGridColumn: "name"
                        },
                        {
                          key: "Value",
                          regExMatch: /\d+/g,
                          filterType: "number",
                          agGridColumn: "value"
                        },
                        {
                          key: "Descripton",
                          regExMatch: /.*/,
                          filterType: "text",
                          agGridColumn: "description"
                        }
                      ]}
                    />
                    <div className="ag-theme-alpine" style={style}>
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={gridReady}
                      />
                    </div>
                  </div>
                );
              }`}
              sandbox="https://codesandbox.io/s/universal-ag-grid-92zqot"
            />
          </div>
        ),
      }
    ],
    constructDemo: (demoName: string): JSX.Element => {
      const category = model.categories.find((cat) => cat.name === demoName);
      return category ? category?.demo() : <div></div>;
    }
  }

  return model;
}