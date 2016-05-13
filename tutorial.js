$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
    render: function() {
      return (
        React.createElement('div', {className: "commentBox"},
          "Hello, world! I am a CommentBox.",
          React.createElement(Comment, {body: "this is comment"}, null)
        )
      );
    }
  });

  var Comment = React.createClass({displayName: 'Comment',
    render: function() {
      return (
        React.createElement('p', {className: "comment"}, this.props.body)
      );
    }
  });

  ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
  );
});
