import TextField from '@material-ui/core/TextField';
import { SortingOptions } from '../SortingOptions';
import { DESC, FLIGHT_NUMBER_FIELD } from '../constants';

describe('SortingOptions', () => {
  let props;

  beforeEach(() => {
    props = {
      sortOrder: DESC,
      sortField: FLIGHT_NUMBER_FIELD,
      onSortChange: jest.fn(),
    };
  });

  it('renders sorting options', () => {
    expect(shallow(SortingOptions, props)).toMatchSnapshot();
  });

  describe('when sorting changes', () => {
    it('calls the onSortChange prop', () => {
      const wrapper = shallow(SortingOptions, props);
      const sortField = wrapper.find(TextField).at(0);
      sortField.prop('onChange')({
        currentTarget: {
          name: 'name',
          value: 'value',
        },
      });
      expect(props.onSortChange).toBeCalledWith('name', 'value');
    });
  });
});
