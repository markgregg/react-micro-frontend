import ShallowRenderer from 'react-test-renderer/shallow';
import Examples from '../../Examples';

test("Examples snapshot", () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(
    <Examples
      bigChoices={[]}
      words={[]}
      typed={[]}
      complex={[]}
    />
  );
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});