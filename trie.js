function Trie() {
  this.$d = [];
};

Trie.prototype._addWord = function(word,i) {
  this.$d.push(word);
  if (i == word.length) {
    //add word to $d
    return this;
  } else if (typeof this[word[i]] === 'object') {
    return this[word[i]]._addWord(word, i+1);
  } else {
    this[word[i]] = new Trie();
    return this[word[i]]._addWord(word, i+1);
  }
  return this;
};

Trie.prototype.addWord = function(word) {
  return this._addWord(word,0);
};

Trie.prototype._lookup = function(prefix, i) {
  if (i === prefix.length) {
    return this.$d;
  } else {
    return this[prefix[i]]._lookup(prefix, i+1);
  }
};

Trie.prototype.lookup = function(prefix) {
  return this._lookup(prefix, 0);
};


Trie.prototype.keys = function() {
  var arr = [];
  for (var key in this) {
    if (key in this.constructor.prototype) continue;
    arr.push(key);
  }
  return arr;
};

Trie.prototype._goto = function(prefix, i) {
  if (prefix.length === i) {
    return this;
  } else {
    return this._goto(prefix, i+1);
  }
};

Trie.prototype.goto = function(prefix) {
  return this._goto(prefix, 0);
};

Trie.prototype.otherLookup = function(prefix) {
  var prefixBranch = this.goto(prefix);
  return prefixBranch._otherLookup();
};

Trie.prototype._otherLookup = function() {
  var keys = this.keys();
  var arr = [this.$d];
  if (keys.length === 0) {
    return arr;
  } else {
    for (var i = 0; i < keys.length; i++) {
      var branch = this[keys[i]];
      var words = branch._otherLookup();
      arr.concat(words);
    }
    return arr;
  }
};

module.exports = Trie;
