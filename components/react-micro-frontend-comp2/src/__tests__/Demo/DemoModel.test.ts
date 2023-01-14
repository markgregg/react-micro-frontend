import { 
  createDemoModel, 
  formatDate, 
  stringToDate, 
  stringToIsoDateString,
  dateCompare
} from "../../Demo/DemoModel"
import { Bond } from "../../interfaces/bond";

test("format date", () => {
  const dateString = formatDate(new Date(2022, 6, 10));

  expect(dateString).toBe("10/6/2022");
});

test("string to date", () => {
  const date = stringToDate("22/02/2021")

  expect(date).toStrictEqual(new Date(2021, 1, 22));
});

test("string to ISO date string", () => {
  const dateString = stringToIsoDateString("22/02/2021")

  expect(dateString).toStrictEqual("2021-02-22T00:00:00.000Z");
});

describe("date compare functions", () => {

  test("compre date not string", () => {
    const result = dateCompare(new Date(Date.now()), undefined);
    expect(result).toBe(0);
  })

  test("compre date less", () => {
    const result = dateCompare(new Date(2022,4,10), "01/04/2022");
    expect(result).toBe(-1);
  })

  test("compre date greater", () => {
    const result = dateCompare(new Date(2022,4,10), "01/04/2023");
    expect(result).toBe(1);
  })

  test("compre date equal", () => {
    const result = dateCompare(new Date(2022,6,10), "10/07/2022");
    expect(result).toBe(0);
  })

});

describe("model functions", () => {
  test("create model", () => {
    const model = createDemoModel([]);
  
    expect(JSON.stringify(model)).toMatchSnapshot();
  });

  test("uniqueValues", () => {
    const bondList: Bond[] = [
      {"isinCode":"FR0013405222","haircutCategory":"L1D","type":"AT01","refMarket":"RMFR01","demonination":"USD","issuranceDate":"04/03/2019","maturityDate":"04/03/2024","issuerCsd":"CLFR01","couponRate":5.655,"issuerName":"BPCE","issuerResidence":"IRFR","issuerGroup":"IG4","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD2","haircut":21.7,"haircutOwn":0,"custom":"N"},
      {"isinCode":"FR0127739573","haircutCategory":"L1D","type":"AT03","refMarket":"RMFR04","demonination":"USD","issuranceDate":"01/12/2022","maturityDate":"01/12/2023","issuerCsd":"CLFR01","couponRate":0,"issuerName":"BPCE","issuerResidence":"IRFR","issuerGroup":"IG4","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD1","haircut":21.7,"haircutOwn":0,"custom":"N"},
      {"isinCode":"FR0013213683","haircutCategory":"L1C","type":"AT01","refMarket":"RMFR01","demonination":"EUR","issuranceDate":"19/10/2016","maturityDate":"19/10/2028","issuerCsd":"CLFR01","couponRate":0.95,"issuerName":"SOCIETE DES AUTOROUTES DU NORD ET DE L EST DE LA FRANCE (SANEF)","issuerResidence":"IRFR","issuerGroup":"IG3","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD4","haircut":16.7,"haircutOwn":0,"custom":"N"}
    ];
    const model = createDemoModel(bondList);
  
    expect(JSON.stringify(model.choices[1].options)).toBe("[\"L1C\",\"L1D\"]");
  });

  test("isinLlookUp", async () => {
    const bondList: Bond[] = [
      {"isinCode":"FR0013405222","haircutCategory":"L1D","type":"AT01","refMarket":"RMFR01","demonination":"USD","issuranceDate":"04/03/2019","maturityDate":"04/03/2024","issuerCsd":"CLFR01","couponRate":5.655,"issuerName":"BPCE","issuerResidence":"IRFR","issuerGroup":"IG4","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD2","haircut":21.7,"haircutOwn":0,"custom":"N"},
      {"isinCode":"FR0127739573","haircutCategory":"L1D","type":"AT03","refMarket":"RMFR04","demonination":"USD","issuranceDate":"01/12/2022","maturityDate":"01/12/2023","issuerCsd":"CLFR01","couponRate":0,"issuerName":"BPCE","issuerResidence":"IRFR","issuerGroup":"IG4","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD1","haircut":21.7,"haircutOwn":0,"custom":"N"},
      {"isinCode":"FR0013213683","haircutCategory":"L1C","type":"AT01","refMarket":"RMFR01","demonination":"EUR","issuranceDate":"19/10/2016","maturityDate":"19/10/2028","issuerCsd":"CLFR01","couponRate":0.95,"issuerName":"SOCIETE DES AUTOROUTES DU NORD ET DE L EST DE LA FRANCE (SANEF)","issuerResidence":"IRFR","issuerGroup":"IG3","guarantorName":"","guarantorResidence":"","guarantorGroup":"","couponDef":"CD4","haircut":16.7,"haircutOwn":0,"custom":"N"}
    ];
    const model = createDemoModel(bondList);
  
    const result =  await model.choices[0].lookUp!!("1277");
    
    console.log(result);
    expect(result).toStrictEqual(["FR0127739573"]);
  });

});


