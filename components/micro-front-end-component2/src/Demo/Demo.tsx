import { useMemo, useState, FC } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community"
import { MdOutlineHelpCenter } from "react-icons/md";
import { Bond } from "../interfaces/bond";
import AgGridUniversalFilter from "ag-grid-universal-filter";
import { createDemoModel, DemoModel, DemoProps } from "./DemoModel";
import "./Demo.css";

const Demo: FC<DemoProps> = ({bondList}) => {
  const [showHelp,setShowHelp] = useState<boolean>(false);
  const [aggridApi,setAggridApi] = useState<GridApi<Bond>>();
  const model = useMemo<DemoModel>(() => createDemoModel(bondList),[bondList])

  const gridReady = (event: GridReadyEvent<Bond>) => {
    setAggridApi(event.api);
  }

  const gridStyle = {
    flex: 1,
    "--ag-foreground-color": "var(--pageFont)",
    "--ag-background-color": "var(--pageColor5)",
    "--ag-header-foreground-color": "var(--universalSelectFontColor)",
    "--ag-header-background-color": "var(--pageColor2)",
    "--ag-odd-row-background-color": "var(--pageColor4)",
    "--ag-header-column-resize-handle-color": "var(--pageFont)"
  }

  return ( 
      <div className="bond-demo">
        <div className="select-area">
          <div className="help_container">
            <div 
              className="help"
              onClick={() => setShowHelp(!showHelp)}
            >
              <MdOutlineHelpCenter/>
            </div>
          </div>
          <AgGridUniversalFilter
            title="Quick Filter"
            width="100%"
            choices={model.choices}
            agGridApi={aggridApi}
          />
        </div>
        {
          showHelp && <div className="explaination">
            <h4 className="headings">Lookup and choices</h4>
            <p className="prefixes">Use the below operations to filter the columns. Combinations are possible using &(and) or | (or)</p>
            <h4 className="headings">Text columns</h4>
            <p className="prefixes">Text columns that do not use lookup or choices (Iusser and Guarantor name) support the following prefixes</p>
              <p className="prefixes">= equals</p>
              <p className="prefixes">! not equals </p>
              <p className="prefixes">% contains</p>
              <p className="prefixes">!% not contains</p>
              <p className="prefixes">%{">"} ends width</p>
              <p className="prefixes">%{"<"} starts width</p>  
            <h4 className="headings">Number columns</h4>
            <p className="prefixes">Number columns (Coupon and Haircut) support the following prefixes</p>
              <p className="prefixes">= equals</p>
              <p className="prefixes">! not equals</p>
              <p className="prefixes">{">"} greater than</p>
              <p className="prefixes">{"<"} less than</p>
              <p className="prefixes">{"<"}= greater than or equal to</p>
              <p className="prefixes">{">"}= less than or equal to</p>
            <h4 className="headings">Date columns</h4>
            <p className="prefixes">Date columns (Maturity and Issurance) support the following prefixes</p>
              <p className="prefixes">= equals</p>
              <p className="prefixes">! not equals</p>
              <p className="prefixes">{">"} greater than</p>
              <p className="prefixes">{"<"} less than</p>
              <p className="prefixes">To enter maturity date, simply enter the number of years</p>
            <h4 className="headings">Usage</h4>
            <p className="prefixes">To use a prefix type it before entering text/numbers as follows</p>
              <p className="prefixes">${">"}50 = maturity dates greater than current date plus 50</p>
              <p className="prefixes">%Bank = string contains the letters bank</p>
              <p className="prefixes">!.0 = not where the number is 0 (Coupon and Haircut regex look for floats)</p>
          </div>
        }
        <div className="ag-theme-alpine" style={gridStyle}>
            <AgGridReact
              rowData={model.rowData}
              columnDefs={model.columnDefs}
              onGridReady={gridReady}
            />
        </div>
      </div>
  );
};

export default Demo;
