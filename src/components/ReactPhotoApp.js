'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
// CSS
require('normalize.css');
require('../styles/main.scss');

var imageURL = require('../images/yeoman.png');

var ReactPhotoApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
          <span>hello</span>
        </ReactTransitionGroup>
      </div>
    );
  }
});
React.render(<ReactPhotoApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactPhotoApp;
