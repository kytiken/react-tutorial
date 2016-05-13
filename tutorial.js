$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
    render: function() {
      return (
        React.createElement('div', {className: "commentBox"},
          "Hello, world! I am a CommentBox.",
          React.createElement('p', {className: "comment"}, "this is comment")
        )
      );
    }
  });

  ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
  );
});
