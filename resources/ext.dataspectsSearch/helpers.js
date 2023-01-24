class DataspectsHelpers {
  static ifURLreturnAnchorTag = (str) => {
    str = str.toString();
    if (str.toString().match(/^https?:\/\//)) {
      return "<a href='" + str + "'>" + str + "</a>";
    }
    return str;
  };

  static currentDeFactoWgServer = () => {
    return window.location.protocol + "//" + window.location.hostname;
  };

  static unixTimestamp = () => {
    return Math.floor(Date.now() / 1000);
  };
}

module.exports = { DataspectsHelpers };
