import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import { createShallow } from '@material-ui/core/test-utils';

configure({ adapter: new Adapter() });

const shallow = createShallow();

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

global.shallow = (Component, props = {}) => {
  return shallow(<Component {...props} />);
};

global.Date = jest.fn().mockImplementation(date => {
  return {
    toLocaleString: jest.fn().mockReturnValue('04/11/2019, 21:43:00'),
    getDate: jest.fn().mockReturnValue(3),
    getMonth: jest.fn().mockReturnValue(10),
    getFullYear: jest.fn().mockReturnValue(2019),
  };
});
