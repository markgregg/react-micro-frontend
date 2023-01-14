import { useMemo, useState, FC } from "react";
import VerticalMenu from "../VerticalMenu";
import { createExampleModel, ExampleModel, ExampleProps } from "./ExamplesModel";
import "./Examples.css";

const Examples: FC<ExampleProps> = (props: ExampleProps) => {
  const [demo, setDemo] = useState<string>();
  const model = useMemo<ExampleModel>(() => createExampleModel(props), []);

  return (
    <div
      className="examples"
    >
      <VerticalMenu
        title="Catagories"
        options={model.categories.map((c) => c.name)}
        onSelect={setDemo}
      />
      <div className="controls">{demo && model.constructDemo(demo)}</div>
    </div>
  );
};

export default Examples;

