var Trie = require('./trie');

var ex = new Trie();

ex.addWord("hello");
ex.addWord("he");
ex.addWord("helo");
ex.addWord("help");
ex.addWord("heap");
ex.addWord("leap");
console.log("he",ex.otherLookup("he"));
console.log("hel",ex.otherLookup("hel"));
console.log("hea",ex.otherLookup("hea"));
console.log("l",ex.otherLookup("l"));
