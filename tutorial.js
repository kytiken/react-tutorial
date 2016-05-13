$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
    render: function() {
      var commentNodes = this.props.commentData.map(function (comment) {
        return (
          React.createElement(Comment, comment, null)
        );
      });
      return (
        React.createElement('div', {className: "commentBox"},
          "Hello, world! I am a CommentBox.",
          commentNodes
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
    React.createElement(CommentBox, {commentData: [{body: "this is comment"}]}),
    document.getElementById('content')
  );
});
