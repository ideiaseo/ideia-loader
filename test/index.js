import $ from 'jquery';
import { expect } from 'chai';

describe( `ideiaLoad plugin`, () => {
  describe( `Should load plugin with default options`, () => {
    let ideiaLoaderInstace;
    beforeEach(() => {
      ideiaLoaderInstace = $( '<div id="ideia-loader"></div>' ).ideiaLoader();
    });
    const defaultOptions = {
    };

    expect( ideiaLoaderInstace.settings ).to.be.eql( defaultOptions );
  });
});
