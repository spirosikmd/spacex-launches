import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import { createShallow } from '@material-ui/core/test-utils';

configure({ adapter: new Adapter() });

const shallow = createShallow();

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

global.shallow = (Component, props = {}) => {
  return shallow(<Component {...props} />);
};

global.mount = (Component, props = {}) => {
  return mount(<Component {...props} />);
};

global.Date = jest.fn().mockImplementation(date => {
  return {
    toUTCString: jest.fn().mockReturnValue('Fri, 11 Jan 2019 15:31:00 GMT'),
    getDate: jest.fn().mockReturnValue(3),
    getMonth: jest.fn().mockReturnValue(10),
    getFullYear: jest.fn().mockReturnValue(2019),
  };
});
