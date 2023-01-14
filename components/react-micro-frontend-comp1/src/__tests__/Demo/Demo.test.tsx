import ShallowRenderer from 'react-test-renderer/shallow';
import Demo from '../../Demo';

test("Demo snapshot", () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(
    <Demo
      description="The simpliest way to use the universal select - set the options to an array of strings"
      props={{
        minWidth: "400px",
        title: "Bind String",
        choices: [
          {
            key: "Words",
            options: [],
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
  );
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});