module.exports = React.createClass({displayName: 'NextCommentButton',
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


