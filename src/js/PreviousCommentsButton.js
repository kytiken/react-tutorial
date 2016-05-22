module.exports = React.createClass({displayName: 'PreviousCommentsButton',
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


