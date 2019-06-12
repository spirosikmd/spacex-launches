import Anchor from '../Anchor';

describe('Anchor', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        anchor: 'anchor',
      },
      href: 'href',
      target: 'target',
      children: 'text',
    };
  });

  it('renders', () => {
    expect(mountComponent(Anchor, props)).toMatchSnapshot();
  });
});
