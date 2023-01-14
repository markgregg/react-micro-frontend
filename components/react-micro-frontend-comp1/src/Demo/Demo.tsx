import { useState, FC } from "react";
import { AiOutlineEdit, AiOutlineCopy, AiOutlineCode } from "react-icons/ai";
import { Selection } from "ag-grid-universal-filter";
import AgGridUniversalFilter, { AgGridUniversalFilterProps } from "ag-grid-universal-filter";
import { CodeBlock, googlecode } from "react-code-blocks";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "./Demo.css";
import { Complex } from "../interfaces/complex";

interface DemoItemProperties {
  description: string;
  points?: string[];
  props: AgGridUniversalFilterProps;
  code?: string;
  sandbox?: string;
  showAgGrid?: boolean
  complex?: Complex[]
}

const Demo: FC<DemoItemProperties> = ({
  description,
  points,
  props,
  code,
  sandbox,
  showAgGrid,
  complex
}) => {
  const [showCode, setShowCode] = useState<string>("");
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [selected, setSelected] = useState<Selection[]>([]);
  const [selectedDemo,setSelectedDemo] = useState<string>("");
  const [rowData] = useState<Complex[]>(complex ?? []);
  const [columnDefs] = useState<ColDef<Complex>[]>([
      { field: "name", headerName: "Name", filter: "agSetColumnFilter", resizable: true, width: 100 },
      { field: "value", headerName: "Value", filter: "agNumberColumnFilter", resizable: true, width: 90 },
      { field: "description", headerName: "Description", filter: "agTextColumnFilter", resizable: true, width: 300 },
  ]);
  const [aggridApi,setAggridApi] = useState<GridApi<Complex>>();
  const style = {
    height: "200px",
    width: "100%",
    "--ag-foreground-color": "var(--pageFont)",
    "--ag-background-color": "var(--pageColor5)",
    "--ag-header-foreground-color": "var(--universalSelectFontColor)",
    "--ag-header-background-color": "var(--pageColor2)",
    "--ag-odd-row-background-color": "var(--pageColor4)",
    "--ag-header-column-resize-handle-color": "var(--pageFont)"    
  };

  const gridReady = (event: GridReadyEvent<Complex>) => {
    setAggridApi(event.api);
  }

  console.log(complex);

  return (
    <div className="demo" key={"demo" + props.title}>
      <h2 className="demo-title">{props.title}</h2>
      <div className="demo-description">
        <p>{description}</p>
        {
          points?.map( (point,index) => <p key={props.title + index} className="demo-point">{point}</p>)
        }
      </div>
      <div className="demo-item">
        <AgGridUniversalFilter
          key={props.title}
          onChange={sel => {
            setSelected(sel);
            setSelectedDemo(props.title)
          }}
          agGridApi={showAgGrid ? aggridApi : undefined}
          {...props}
        />
        <div className="icons">
          <AiOutlineCode
            onClick={() => {
              setShowCode(showCode === props.title ? "" : props.title);
            }}
          />
          <div className="copy-wrapper">
            <AiOutlineCopy
              onClick={() => {
                navigator.clipboard.writeText(code ?? "");
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
              }}
            />
            {showCopied && <p className="copied-text">Copied</p>}
          </div>
          <AiOutlineEdit onClick={() => window.open(sandbox, "_blank")} />
        </div>
      </div>
      <div>
        <h6 className="nospace">Selection</h6>
        <p key={"selected" + props.title} className="nospace">{selectedDemo === props.title ? JSON.stringify(selected) : ""}</p>
      </div>
      {
        showAgGrid && <div className="ag-theme-alpine" style={style}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={gridReady}
          />
        </div>
      }
      {showCode === props.title && (
        <div className="code">
          <CodeBlock
            width="100%"
            text={code}
            language="typescript"
            showLineNumbers={false}
            theme={googlecode}
          />
        </div>
      )}
    </div>
  );
};

export default Demo;