import React from 'react';
import { shallow } from 'enzyme';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SignUp from './SignUp';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('.SignUp').exists()).toBe(true);
  });

  // A user can enter an email address

  // A user can enter a password
})
