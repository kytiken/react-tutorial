$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
    getInitialState: function() {
      return {commentData: []};
    },
    commentIndexUrl: 'http://localhost:3000/comments.json',
    componentDidMount: function() {
      $.get(this.commentIndexUrl, function(data) {
        this.setState({commentData: data});
      }.bind(this));
    },
    render: function() {
      var commentNodes = this.state.commentData.map(function (comment) {
        return (
          React.createElement(Comment, comment, null)
        );
      });
      return (
        React.createElement('div', {className: "commentBox"},
          React.createElement(CommentForm, {}, null),
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

  var CommentForm = React.createClass({displayName: 'CommentForm',
    render: function() {
      return (
        React.createElement('div', {className: 'comment-form'},
          React.createElement('input', {id: 'comment_body', name: 'comment[body]', type: 'text', ref: 'body'}, null),
          React.createElement('span', {onClick: this.handleSubmit}, 'submit')
        )
      );
    }
  });

  ReactDOM.render(
    React.createElement(CommentBox, {commentData: [{body: "this is comment"}]}),
    document.getElementById('content')
  );
});
