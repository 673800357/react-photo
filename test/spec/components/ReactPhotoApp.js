'use strict';

describe('ReactPhotoApp', () => {
  let React = require('react/addons');
  let ReactPhotoApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactPhotoApp = require('components/ReactPhotoApp.js');
    component = React.createElement(ReactPhotoApp);
  });

  it('should create a new instance of ReactPhotoApp', () => {
    expect(component).toBeDefined();
  });
});
