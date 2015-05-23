var autocomplete = require('./trie');
var Trie = autocomplete.Trie;

var ex = new Trie();

ex.addWord("hello");
ex.addWord("he");
ex.addWord("helo");
ex.addWord("help");
ex.addWord("heap");
ex.addWord("leap");
console.log("ex he",ex.lookup("he"));
console.log("ex hel",ex.lookup("hel"));
console.log("ex hea",ex.lookup("hea"));
console.log("ex hed",ex.lookup("hed"));
console.log("ex l",ex.lookup("l"));
console.log("ex d", ex.lookup("d"));

console.log(ex.stringify());

var newEx = JSON.parse(ex.stringify());
console.log("newEx he", autocomplete.lookup(newEx, "he"));
console.log("newEx hel", autocomplete.lookup(newEx, "hel"));
console.log("newEx d", autocomplete.lookup(newEx, "d"));

ex.addWord("bat");
console.log("bat", ex.lookup("b"));
newEx = Trie.prototype.addWord.call(newEx, "bat");
console.log("newEx b", Trie.prototype.lookup.call(newEx, "b"));
var str1 = ex.stringify();
var str2 = Trie.prototype.stringify.call(newEx);

console.log("str1 === str2:", str1 === str2);


