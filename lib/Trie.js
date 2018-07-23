import Node from './Node.js';
require ('locus');


export default class Trie {
  constructor() {
    this.rootNode = new Node();
    this.count = 0;
  }

  insert(word) {
    let currentNode = this.rootNode;
    let wordArray = [...word.toLowerCase()];

    while (wordArray.length) {
      let letter = wordArray.shift();

      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      } 
      currentNode = currentNode.children[letter]; 
    }   
    if (!currentNode.completedWord) {
      currentNode.completedWord = word.toLowerCase();
      this.count++;
    }
  }

  suggest(prefix) {
    let currentNode = this.rootNode;
    let suggestions = [];
    let prefixArray = [...prefix.toLowerCase()];

    prefixArray.forEach(letter => {
      currentNode = currentNode.children[letter];
    });

    const search = node => {

      if (node.completedWord) {
        suggestions.push(node.completedWord);
      }

      let nodeKeys = Object.keys(node.children);

      nodeKeys.forEach(nodeKey => {
        search(node.children[nodeKey]);
      });
    };

    search(currentNode);
    return suggestions; 
  }

  counter() {
    return this.count;
  }

  populate(array) {
    array.forEach(word => {
      this.insert(word);
    });
  }

  find(word) {
    let letters = [...word.toLowerCase()];
    let currentNode = this.rootNode;

    while (letters.length) {
      let letter = letters.shift();

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
      } else {

        return null;
      }
    }
    return currentNode;
  }

  delete(word) {
    let currentNode = this.rootNode;
    let letters = [...word.toLowerCase()];
    let prevNode = this.rootNode;
    let key; 

    letters.forEach(letter => {

      prevNode = currentNode;
      currentNode = currentNode.children[letter];
      key = letter;
    });

    if (currentNode.completedWord) {
      currentNode.completedWord = null;
      this.count--;
    } 

    if (!Object.keys(currentNode.children).length) {
      delete prevNode.children[key];
    }
  }
}




