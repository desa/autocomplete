// Define empty Trie constructor so that
// we can add methods to its prototype.
function Trie() {
};

// General method that takes in two functions
// a step method `step` and a return method
// `fn`. The `step` determines how the trie
// is traversed. The application of `fn` is
// is value that gets returned.
Trie.prototype.traverse = function(step, fn) {

  // return a function of a word
  return function(word) {

    // set's the current position of in
    // the trie while traversing
    var _step = this;

    // Iteratively step through the trie
    // using the `step` method to figure
    // out what to do next
    for (var i = 0; i < word.length; i++) {

      // Set the current letter
      var letter = word[i];

      // change to the next step
      _step = step.call(this, _step, letter);
    }

    // return some state based on
    // the total tree and the current
    // state of _step
    return fn.call(this, _step);
  };
};


// Method to add a word to the trie
// uses the `#traverse` method
Trie.prototype.addWord = (function() {
  var step = function(t, l) {
    t[l] = t[l] || new Trie();
    return t[l];
  };

  var fn = function(t) {
    t.$ = 1;
    return this;
  };

  var traverse = Trie.prototype.traverse;

  return traverse.call(this,step,fn);
})();

// Method to go to a certain prefix
// in the trie uses the `#traverse` method
Trie.prototype.goto = (function() {
  var step = function(t,l) {
    return !!t[l] ? t[l] : null;
  };

  var fn = function(t) {
    return t;
  };

  var traverse = Trie.prototype.traverse;

  return traverse.call(this,step,fn);
})();

//// Utility method that returns all of the
//// siblings in the trie, excluding the word
//// boundaries and the prototype methods.
Trie.prototype.keys = function() {
  // Initialize the array of keys to be
  var letters = [];

  // Iterate through all of the keys in an object
  for (var key in this) {
    // Exclude the prototype methods
    // Exclude the word boundaries
    if (key in this.constructor.prototype || key === "$") continue;

    // Add key to the array of keys
    letters.push(key);
  }

  // Return the array of keys
  return letters;
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
  var keys = Trie.prototype.keys.call(this);

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
      var sfxs = Trie.prototype._lookup.call(branch, newSuffix);

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
  var prefixBranch = Trie.prototype.goto.call(this,prefix);

  // if there's not a prefixBranch return
  // an empty array
  if (!prefixBranch) return [];

  // find all of the suffixes with a
  // word boundary
  var sfxs = Trie.prototype._lookup.call(prefixBranch);

  // add the prefix to each suffix in the suffixes array
  return sfxs.map(function(sfx) { return prefix + sfx; });
};

// Utility method that turns the trie
// into a stringified JSON object
Trie.prototype.stringify = function() {
  return JSON.stringify(this);
};

// Export the Trie constructor
module.exports.Trie = Trie;
module.exports.lookup = function(ctx, prefix) {
  return Trie.prototype.lookup.call(ctx, prefix);
};
