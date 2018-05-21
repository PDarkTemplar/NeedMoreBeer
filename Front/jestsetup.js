import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

console.error = message => {
    throw new Error(message);
};

process.env.BABEL_ENV = 'test';
