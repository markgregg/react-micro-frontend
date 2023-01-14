import Renderer from 'react-test-renderer';
import VerticalMenu from '../../VerticalMenu';

test("VerticalMenu snapshot", () => {
  const result = Renderer.create(
    <VerticalMenu
      title='test'
      options={["option1", "option2"]}
      onSelect={() => {}}
     />
  );
  expect(result).toMatchSnapshot();
});