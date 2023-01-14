import Renderer from 'react-test-renderer';
import About from '../../About';

test("Examples snapshot", () => {
  const result = Renderer.create(
    <About/>
  ).toJSON();

  expect(result).toMatchSnapshot();
});