$(document).ready(function(){
  var CommentBox = React.createClass({displayName: 'CommentBox',
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

  var NextCommentsButton = React.createClass({displayName: 'NextCommentButton',
    nextPageNumber: function() {
      return Number($('#page-number').text()) + 1;
    },
    nextPageUrl: function() {
      return 'http://localhost:3000/comments.json?page=' + this.nextPageNumber().toString();
    },
    showNextComments: function() {
      $.ajax({
        url: this.nextPageUrl(),
        async: false,
        success: function(data) {
          this.props.showPage(data, this.nextPageNumber());
        }.bind(this)
      });
    },
    render: function() {
      var commentData = []

      $.ajax({
        url: this.nextPageUrl(),
        async: false,
        success: function(data) {
          commentData = data;
        }
      });
      if(commentData.length > 0) {
        return React.createElement('p', {onClick: this.showNextComments}, 'Next')
      } else {
        return React.createElement('p', {}, '')
      }
    }
  });

  var PreviousCommentsButton = React.createClass({displayName: 'PreviousCommentsButton',
    previousPageNumber: function() {
      return Number($('#page-number').text()) - 1;
    },
    previousPageUrl: function() {
      return 'http://localhost:3000/comments.json?page=' + this.previousPageNumber().toString();
    },
    showPreviousComments: function() {
      if(this.previousPageNumber() > 0) {
        $.ajax({
          url: this.previousPageUrl(),
          async: false,
          success: function(data) {
            this.props.showPage(data, this.previousPageNumber());
          }.bind(this)
        });
      }
    },
    render: function() {
      return React.createElement('p', {onClick: this.showPreviousComments}, 'Previous')
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
