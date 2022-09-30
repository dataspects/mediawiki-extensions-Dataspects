Helpers = class {
  constructor() {}

  ifURLreturnAnchorTag = (str) => {
    if (str.match(/^https?:\/\//)) {
      return "<a href='" + str + "'>" + str + "</a>";
    }
    return str;
  };
};
module.exports = { Helpers };
