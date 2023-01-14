import ShallowRenderer from 'react-test-renderer/shallow';
import Demo from '../../Demo';

test("Examples snapshot", () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(
    <Demo
      bondList={[]}
    />
  );
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});