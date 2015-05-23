var Trie = require('./trie');

var ex = new Trie();

ex.addWord("hello");
ex.addWord("he");
ex.addWord("helo");
ex.addWord("help");
ex.addWord("heap");
ex.addWord("leap");
console.log("he",ex.lookup("he"));
console.log("hel",ex.lookup("hel"));
console.log("hea",ex.lookup("hea"));
console.log("hed",ex.lookup("hed"));
console.log("l",ex.lookup("l"));
console.log("d", ex.lookup("d"));

console.log(ex.stringify());

var newEx = JSON.parse(ex.stringify());
newEx = Trie.prototype.addWord.call(newEx, "bat");
console.log("newEx b", Trie.prototype.lookup.call(newEx, "b"));
console.log("newEx he", Trie.prototype.lookup.call(newEx, "he"));
console.log("newEx hello", Trie.prototype.lookup.call(newEx, "b"));
console.log("newEx d", Trie.prototype.lookup.call(newEx, "d"));

ex.addWord("bat");
console.log("bat", ex.lookup("bat"));
var str1 = ex.stringify();
var str2 = Trie.prototype.stringify.call(newEx);

console.log("str1 === str2:", str1 === str2);


