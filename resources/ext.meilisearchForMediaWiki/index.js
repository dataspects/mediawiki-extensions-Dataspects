alert("test");
(function () {
  var welcome = {
    init: function () {
      $(function () {
        console.debug("test");
      });
    },
  };
  module.exports = welcome;

  mw.MeilisearchForMediaWiki = welcome;
})();
