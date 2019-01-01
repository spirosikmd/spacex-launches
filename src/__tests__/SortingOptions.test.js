import Select from '@material-ui/core/Select';
import { SortingOptions } from '../SortingOptions';
import { DESC } from '../constants';

describe('SortingOptions', () => {
  let props;

  beforeEach(() => {
    props = {
      dateSortOrder: DESC,
      onSortChange: jest.fn(),
    };
  });

  it('renders sorting options', () => {
    expect(shallow(SortingOptions, props)).toMatchSnapshot();
  });

  describe('when sorting changes', () => {
    it('calls the onSortChange prop', () => {
      const wrapper = shallow(SortingOptions, props);
      const dateSort = wrapper.find(Select);
      dateSort.prop('onChange')();
      expect(props.onSortChange).toHaveBeenCalled();
    });
  });
});
