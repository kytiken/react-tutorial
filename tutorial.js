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
    onSubmitSuccess: function(comment) {
      var currentStateCommentData = this.state.commentData;
      currentStateCommentData.push(comment)
      this.setState({commentData: currentStateCommentData});
    },
    render: function() {
      var commentNodes = this.state.commentData.map(function (comment) {
        return (
          React.createElement(Comment, comment, null)
        );
      });
      return (
        React.createElement('div', {className: "commentBox"},
          React.createElement(CommentForm, {onSubmitSuccess: this.onSubmitSuccess}, null),
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
    actionUrl: "http://localhost:3000/comments.json",
    formData: function() {
      return {
        'comment': {
          body: ReactDOM.findDOMNode(this.refs.body).value.trim()
        }
      }
    },
    handleSubmit: function() {
      $.ajax({
        url: this.actionUrl,
        dataType: 'json',
        type: 'POST',
        data: this.formData(),
        success: function(data) {
          this.props.onSubmitSuccess(data);
        }.bind(this),
        error: function(xhr, status, error) {
          console.error(this.actionUrl, status, error.toString());
        }.bind(this)
      });
    },
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
