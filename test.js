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
