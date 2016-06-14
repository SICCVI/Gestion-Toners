Template.registerHelper('_', function(){
    return _
});

Template.registerHelper('compare', function(v1, v2) {
    return v1 === v2;
});

Template.registerHelper('limit', function (arr, limit) {
  if (!_.isArray(arr)) { return []; }
  return arr.slice(limit);
});