import { createExampleModel, ExampleModel, ExampleProps } from "../../Examples/ExamplesModel"

test("create model", () => {
  const props: ExampleProps = {
    bigChoices: [],
    words: [],
    complex: [],
    typed: []
  };

  const model: ExampleModel = createExampleModel(props)
  expect(model).toMatchSnapshot();
});

test("create demo", () => {
  const props: ExampleProps = {
    bigChoices: [],
    words: [],
    complex: [],
    typed: []
  };

  const model: ExampleModel = createExampleModel(props)
  const demo = model.constructDemo("Binding");
  expect(demo).toMatchSnapshot();
});