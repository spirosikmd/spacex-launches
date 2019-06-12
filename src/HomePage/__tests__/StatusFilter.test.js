import FormControlLabel from '@material-ui/core/FormControlLabel';
import StatusFilter from '../StatusFilter';

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
    expect(mountComponent(StatusFilter, props)).toMatchSnapshot();
  });

  describe('when a status changes', () => {
    it('calls the onChange prop', () => {
      const wrapper = mountComponent(StatusFilter, props);
      const filters = wrapper.find(FormControlLabel);
      filters
        .at(0)
        .props()
        .control.props.onChange({
          currentTarget: {
            value: 'value',
            checked: 'checked',
          },
        });
      expect(props.onChange).toBeCalledWith('value', 'checked');
    });
  });
});
