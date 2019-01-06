import { Image } from '../Image';

describe('Image', () => {
  let props;

  beforeEach(() => {
    props = {
      src: 'src',
      alt: 'alt',
      classes: {
        imageWrapper: 'imageWrapper',
        image: 'image',
      },
    };
  });

  it('renders', () => {
    expect(shallow(Image, props)).toMatchSnapshot();
  });
});
