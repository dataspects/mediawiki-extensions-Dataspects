ifURLreturnAnchorTag = (str) => {
  str = str.toString();
  if (str.toString().match(/^https?:\/\//)) {
    return "<a href='" + str + "'>" + str + "</a>";
  }
  return str;
};

currentDeFactoWgServer = () => {
  return window.location.protocol + "//" + window.location.hostname;
};
