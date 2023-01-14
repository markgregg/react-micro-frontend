import { ColDef} from "ag-grid-community"
import "./Demo.css";
import { Bond } from "../interfaces/bond";
import { ChoiceDefinition, OptionType } from "ag-grid-universal-filter";
export interface DemoModel {
  choices: ChoiceDefinition<any>[];
  columnDefs: ColDef<Bond>[];
  rowData: Bond[];
}

export interface DemoProps {
  bondList: Bond[];
}

export const formatDate = (date: Date): string => date.getDate() + '/' + date.getMonth() + '/' +  date.getFullYear();

export const stringToDate = (text: string): Date => {
  const dateParts = text.split('/');
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const year = Number(dateParts[2]);
  return new Date(year, month, day);
}

export const stringToIsoDateString = (option: OptionType): string => {
  const dateParts = (option as string).split('/');
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const year = Number(dateParts[2]);
  return new Date(year, month, day).toISOString();
}

export const dateCompare = (compareValue: Date, cellValue: any): number => {
  try {
    const cellDateString = cellValue as string;
    if (cellDateString == null) {
        return 0;
    }

    const cellDate = stringToDate(cellDateString);

    console.log(`${compareValue}==${cellDate}`)
    // Now that both parameters are Date objects, we can compare
    if (cellDate < compareValue) {
        return -1;
    } else if (cellDate > compareValue) {
        return 1;
    }
  } catch(error) {
    console.log(error);
    return -1;
  }
  return 0;
}


export const createDemoModel: (bondList: Bond[]) => DemoModel = (bondList: Bond[]) => {

  const uniqueValues = (column: string): string[] => {
    // @ts-ignore
    return bondList.map( bond => bond[column])
      .filter( (val, idx, arr) => arr.indexOf(val) === idx)
      .sort();
  }

  const isinLlookUp = async (text: string): Promise<OptionType[]> => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        const list = bondList.map( bond => bond.isinCode)
          .filter( val => val.toLowerCase().includes(text.toLowerCase()))
          .filter( (val, idx, arr) => arr.indexOf(val) === idx)
          .sort();
        resolve(list);
      }, Math.floor(Math.random() * 500));
    });
  }

  const definition = (column: string, prefix: string, name?: string, regEx?: RegExp): ChoiceDefinition<any> => {
    return {
      key: column,
      prefix,
      options: uniqueValues(column),
      agGridColumn: column,
      choiceDisplayName: name ?? prefix,
      regExMatch: regEx
    }
  }

  const model: DemoModel = {
    choices:  [
      {
        key: "isinCode",
        prefix: "Isin",
        lookUp: isinLlookUp,
        agGridColumn: "isinCode",
        choiceDisplayName: "Isin",
        regExMatch: /.*/
      },
      definition("haircutCategory", "Haircut Cut"),
      definition("type", "type", "Type"),
      definition("refMarket", "ref mkt", "Reference Market"),
      definition("demonination", "demon", "Demonination"),
      {
        key: "coupon",
        prefix: "coupon rate",
        agGridColumn: "couponRate",
        choiceDisplayName: "Coupon Rate",
        regExMatch: /^\d{0,1}(\.\d{1,4})?$/,
        filterType: "number",
        replaceExisting: true
      },
      {
        key: "issuranceDate",
        prefix: "issurance date",
        choiceDisplayName: "Issurance Date",
        regExMatch: /^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
        agGridColumn: "issuranceDate",
        filterType: "date",
        valueConverter: stringToIsoDateString,
        replaceExisting: true
      },
      {
        key: "maturityDate",
        prefix: "maturity date",
        choiceDisplayName: "Maturity Date",
        regExMatch: /^[0-9]{0,2}$/,
        valueGetter: (text: string) => {
          const now = new Date();
          const years = parseInt(text);
          return formatDate(new Date(now.setFullYear(now.getFullYear() + years)));
        },
        agGridColumn: "maturityDate",
        filterType: "date",
        valueConverter: stringToIsoDateString,
        replaceExisting: true
      },
      definition("issuerCsd", "csd", "Issuer CSD"),
      {
        key: "issuerName",
        prefix: "issuerName",
        choiceDisplayName: "Issuer Name",
        agGridColumn: "issuerName",
        regExMatch: /.*/,
        replaceExisting: true
      },
      definition("issuerResidence", "issuer res", "Issuser Residence"),
      definition("issuerGroup", "issuer grp", "Issuer Group"),
      {
        key: "guarantorName",
        prefix: "guarantorName",
        choiceDisplayName: "Guarantor Name",
        agGridColumn: "guarantorName",
        regExMatch: /.*/,
        replaceExisting: true
      },  
      definition("guarantorResidence", "guarantor res", "Guarantor Residence"),
      definition("guarantorGroup", "guarantor grp", "Guarantor Group"),
      definition("couponDef", "coupon def", "Coupon Definition"),
      {
        key: "haircut",
        prefix: "haircut",
        choiceDisplayName: "Haircut",
        agGridColumn: "haircut",
        regExMatch: /^\d{0,2}(\.\d{1,4})?$/,
        filterType: "number",
        replaceExisting: true
      },
    ],
    columnDefs: [
      { field: "isinCode", headerName: "ISIN Code", filter: "agSetColumnFilter", resizable: true, width: 150 },
      { field: "haircutCategory", headerName: "Haircut Category", filter: "agSetColumnFilter", resizable: true, width: 120 },
      { field: "type", headerName: "Type", filter: "agSetColumnFilter", resizable: true, width: 90 },
      { field: "refMarket", headerName: "Reference", filter: "agSetColumnFilter", resizable: true, width: 120 },
      { field: "demonination", headerName: "Demonination", filter: "agSetColumnFilter", resizable: true, width: 140 },
      { field: "issuranceDate", headerName: "Issuance Date", filter: "agDateColumnFilter", filterParams: { comparator: dateCompare }, resizable: true, width: 130 },
      { field: "maturityDate", headerName: "Maturity Date",filter: "agDateColumnFilter", filterParams: { comparator: dateCompare }, resizable: true, width: 130 },
      { field: "issuerCsd", headerName: "Issuer CSD", filter: "agSetColumnFilter", resizable: true, width: 120 },
      { field: "couponRate", headerName: "Coupon Rate", filter: "agNumberColumnFilter", resizable: true, width: 140 },
      { field: "issuerName", headerName: "Issuer Name", filter: "agTextColumnFilter", resizable: true, width: 300 },
      { field: "issuerResidence", headerName: "Issuer Residence", filter: "agSetColumnFilter", resizable: true, width: 130 },
      { field: "issuerGroup", headerName: "Issuer Group", filter: "agSetColumnFilter", resizable: true, width: 130 },
      { field: "guarantorName", headerName: "Guarantor Name", filter: "agTextColumnFilter", resizable: true, width: 300 },
      { field: "guarantorResidence", headerName: "Guarantor Residence", filter: "agSetColumnFilter", resizable: true, width: 130 },
      { field: "guarantorGroup", headerName: "Guarantor Group", filter: "agSetColumnFilter", resizable: true, width: 130 },
      { field: "couponDef", headerName: "Coupon Definition", filter: "agSetColumnFilter", resizable: true, width: 130 },
      { field: "haircut", headerName: "Haircut", filter: "agNumberColumnFilter", resizable: true, width: 150 }
    ],
    rowData: bondList
  }

  return model;
};
