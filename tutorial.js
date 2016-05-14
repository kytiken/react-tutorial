$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
    getInitialState: function() {
      return {commentData: []};
    },
    componentDidMount: function() {
      this.setState({commentData: this.props.commentData});
    },
    render: function() {
      var commentNodes = this.state.commentData.map(function (comment) {
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
