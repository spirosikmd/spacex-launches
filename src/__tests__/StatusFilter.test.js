import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StatusFilter } from '../StatusFilter';

describe('StatusFilter', () => {
  let props;

  beforeEach(() => {
    props = {
      showFailed: true,
      showSuccessful: true,
      showUpcoming: true,
      onChange: jest.fn(),
    };
  });

  it('renders status filters', () => {
    expect(shallow(StatusFilter, props)).toMatchSnapshot();
  });

  describe('when a status changes', () => {
    it('calls the onChange prop', () => {
      const wrapper = shallow(StatusFilter, props);
      const filters = wrapper.find(FormControlLabel);
      filters
        .at(0)
        .props()
        .control.props.onChange();
      expect(props.onChange).toHaveBeenCalled();
    });
  });
});
