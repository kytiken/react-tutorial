var CommentForm = require('./CommentForm');
var NextCommentsButton = require('./NextCommentsButton');
var PreviousCommentsButton = require('./PreviousCommentsButton');
var Comment = require('./Comment');

module.exports = React.createClass({displayName: 'CommentBox',
    getInitialState: function() {
      return {
        commentData: [],
        pageNumber: 1
      };
    },
    commentIndexUrl: 'http://localhost:3000/comments.json',
    componentDidMount: function() {
      $.get(this.commentIndexUrl, function(data) {
        this.setState({commentData: data});
      }.bind(this));
    },
    showPage: function(commentData, pageNumber) {
      this.setState({commentData: commentData, pageNumber: pageNumber});
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
          React.createElement(NextCommentsButton, {showPage: this.showPage, pageNumber: this.pageNumber}, null),
          React.createElement(PreviousCommentsButton, {showPage: this.showPage, pageNumber: this.pageNumber}, null),
          React.createElement('label', {}, 'PageNumber: '),
          React.createElement('span', {id: 'page-number'}, this.state.pageNumber),
          commentNodes
        )
      );
    },
  });


