module.exports = React.createClass({displayName: 'CommentForm',
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


