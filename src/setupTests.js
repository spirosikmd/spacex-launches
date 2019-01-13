import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import { unwrap } from '@material-ui/core/test-utils';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

global.shallow = (Component, props = {}) => {
  const ComponentWithoutStyles = unwrap(Component);
  return shallow(<ComponentWithoutStyles {...props} />);
};

global.mount = (Component, props = {}) => {
  const ComponentWithoutStyles = unwrap(Component);
  return mount(<ComponentWithoutStyles {...props} />);
};

global.Date = jest.fn().mockImplementation(() => {
  return {
    toUTCString: jest.fn().mockReturnValue('Fri, 11 Jan 2019 15:31:00 GMT'),
    getDate: jest.fn().mockReturnValue(3),
    getMonth: jest.fn().mockReturnValue(10),
    getFullYear: jest.fn().mockReturnValue(2019),
  };
});

// https://github.com/airbnb/enzyme/issues/1875
jest.mock('react', () => {
  const r = jest.requireActual('react');
  return { ...r, memo: x => x };
});
