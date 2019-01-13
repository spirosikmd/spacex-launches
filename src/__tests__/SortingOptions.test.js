import TextField from '@material-ui/core/TextField';
import SortingOptions from '../SortingOptions';
import { DESC, FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from '../constants';

describe('SortingOptions', () => {
  let props;

  beforeEach(() => {
    props = {
      sortOrder: DESC,
      sortField: FLIGHT_NUMBER_FIELD,
      onSortChange: jest.fn(),
    };
  });

  describe('when sorting field is flight number', () => {
    it('renders sorting options with flight number specific text', () => {
      expect(shallow(SortingOptions, props)).toMatchSnapshot();
    });
  });

  describe('when sorting field is utc date', () => {
    it('renders sorting options with date specific text', () => {
      props.sortField = UTC_DATE_FIELD;
      expect(shallow(SortingOptions, props)).toMatchSnapshot();
    });
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
