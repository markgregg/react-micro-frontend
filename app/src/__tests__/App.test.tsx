import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

test("Examples snapshot", () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(
    <App/>
  );
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});