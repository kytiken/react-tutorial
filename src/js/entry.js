var CommentBox = require('./CommentBox');
$(document).ready(function(){
  ReactDOM.render(
    React.createElement(CommentBox, {commentData: [{body: "this is comment"}]}),
    document.getElementById('content')
  );
});
