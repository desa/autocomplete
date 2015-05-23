// Define empty Trie constructor so that
// we can add methods to its prototype.
function Trie() {
};

// Iterative method that takes in a string
// `word` and and index `i` and adds each
// character intro the trie. Word boundaries
// are specified by a truthy valued key `$`
// in the terminal node.
Trie.prototype._addWord = function(word,i) {
  // Grap the current letter
  var letter = word[i];

  // If we've reached the end of the word,
  // add the word boundary to the terminal node,
  // otherwise keep traversing the trie, adding
  // new nodes to the trie appropriately.
  if (i == word.length) {
    // use $ word boundary with the simplist
    // truthy value 1.
    this.$ = 1;
  } else if (typeof this[letter] === 'object') {
    // keep traversing the trie.
    this[letter]._addWord(word, i+1);
  } else {
    // create a new node if you've reached the
    // end of the trie
    this[letter] = new Trie();
    // keep traversing the trie.
    this[letter]._addWord(word, i+1);
  }
  return this;
};

// The addWord method adds a word to the
// trie by calling the `_addWord` method
// with index 0.
Trie.prototype.addWord = function(word) {
  // Call `#_addWord` method starting with index 0
  return this._addWord(word,0);
};

// Utility method that returns all of the
// siblings in the trie, excluding the word
// boundaries and the prototype methods.
Trie.prototype.keys = function() {
  // Initialize the array of keys to be
  var arr = [];

  // Iterate through all of the keys in an object
  for (var key in this) {
    // Exclude the prototype methods
    if (key in this.constructor.prototype) continue;

    // Exclude the word boundaries
    if (key === "$") continue;

    // Add key to the array of keys
    arr.push(key);
  }

  // Return the array of keys
  return arr;
};

// Utility method that iteratively traverses
// the trie, and returns the sub trie found
// under the prefix passed in.
Trie.prototype._goto = function(prefix, i) {

  // If we've reached the end of the prefix
  // return the trie.
  // If there's no trie in found for that
  // prefix return null, otherwise keep
  // traversing the trie.
  if (prefix.length === i) {

    // return the trie
    return this;
  } else if (!(prefix[i] in this)) {

    // no prefix found. return null
    return null;
  } else {

    // recursively traverse trie
    return this[prefix[i]]._goto(prefix, i+1);
  }
};

// the `goto` method calls the `goto` method
// starting with index 0.
Trie.prototype.goto = function(prefix) {
  return this._goto(prefix, 0);
};

// The method builds up an array of words
// by building up word suffixes and returns
// an array of word boundary suffixes.
Trie.prototype._lookup = function(suffix) {
  // the suffix parameter is initialling
  // undefined, but is used to build up
  // a word suffix recursively

  // get all siblings at the current level
  // of the trie
  var keys = this.keys();

  // If there is a word boundary create
  // an array with what ever the current
  // suffix is otherwise set it to an empty array
  //
  // This could have been written
  //// var arr = [];
  //// if (!!this.$) {
  ////   arr = [suffix];
  //// }
  var arr = !!this.$ ?
    Array.prototype.slice.call(arguments) : [];

  // if there's no keys return the suffix array
  // otherwise recursively search the trie for
  // word boundaries for each of the keys
  if (keys.length === 0) {
    return arr;
  } else {

    // iterate through each of the keys in
    // the keys array and building up each suffix
    // and calling the `_lookup` on each node
    // with the new suffix
    for (var i = 0; i < keys.length; i++) {

      // grab the letter in the trie
      var letter = keys[i];

      // access the branch found under the
      // letter key
      var branch = this[letter];

      // if suffix is undefined set
      // a temporary sufix to an empty string
      var sfx = suffix || "";

      // build up the suffix by adding a letter
      // to the end of the previous suffix
      var newSuffix = sfx + letter;

      // recursively call `_lookup` on the
      // branch. `_lookup` will return an
      // empty array, or an array of suffixes
      var sfxs = branch._lookup(newSuffix);

      // add the suffixes to the total array of suffixes
      arr = arr.concat(sfxs);
    }

    // return an array of all of the possible found suffixes
    return arr;
  }
};

// the method takes in a prefix and calls
// the `goto` method that which takes us
// traverses to that part in the trie and
// then creates an array of word boundary
// suffixes, finally returning an array
// of `prefix + suffix` (also called a word) values
Trie.prototype.lookup = function(prefix) {

  // Go to that position in the trie
  var prefixBranch = this.goto(prefix);

  // if there's not a prefixBranch return
  // an empty array
  if (!prefixBranch) return [];

  // find all of the suffixes with a
  // word boundary
  var sfxs = prefixBranch._lookup();

  // add the prefix to each suffix in the suffixes array
  return sfxs.map(function(sfx) { return prefix + sfx; });
};

// Utility method that turns the trie
// into a stringified JSON object
Trie.prototype.stringify = function() {
  return JSON.stringify(this);
};

// Export the Trie constructor
module.exports = Trie;
