function regExpEscape(literal_string) {
  return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

function template(str, options, times) {
  var args = [],
      times = times || 1,
      openDel = (options && options.open) ? options.open : '<%',
      closeDel = (options && options.close) ? options.close : '%>',
      regexp = new RegExp('(' + regExpEscape(openDel) + ' )' +
          '([\\s\\S]+?)' + '( ' + regExpEscape(closeDel) +
          ')', 'g'),
      newString = str.replace(regexp, replacer),
      argsStr = args.join(", ");

  function replacer(match, p1, p2, p3, offset, string) {
    args.push(p2);
    return "' + " + p2 + " + '";
  }

  return new Function(argsStr, "for(var i=0; i< " + times + "; i++){console.log('" + newString + "')}");

}
var string = 'Hi, my name is *( name )*. And I *( emotion )* this *( thing )*!';
var customDelimiters = {
  open: '*(',
  close: ')*'
};
var tpl = template(string, customDelimiters, 2);
tpl('Carlos', 'love', 'tv show'); // "Hi, my name is Carlos. And I love this tv show!" (x2)
