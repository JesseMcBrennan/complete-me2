import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js'
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

    it('it should start with a word count of 0', () => {
      expect(trie.count).to.equal(0);
    });

  //it should exist
  //it should have a root node thats an instance of Node
  //it should have a count property defaulted to 0


  describe('insert', () => {

    it('should exist as a method', () => {
      expect(trie.insert).to.exist
    })

    it('should be able to add a letter to the node', () => {
      trie.insert('star')
      expect(trie.rootNode.children.s.data).to.equal('s')
    })

    it('should populate the trie with the word', () => {
      trie.insert('hello')
      console.log(trie.rootNode.children)
      expect(trie.rootNode.children.h.data).to.equal('h')
    })

    it('should increment the word count of the trie', () => {
      trie.insert('hello')
      expect(trie.count).to.equal(1)
    })

    it('should not increment the word count of the trie if there are duplicates', () => {
       trie.insert('hello')
       trie.insert('hello')

       expect(trie.count).to.equal(1)
    })

    it('should not increase count for the same word in all caps', () => {
      trie.insert('hello')
      trie.insert('HELLO')

      expect(trie.count).to.equal(1)
    })
  })

  describe('suggest', () => {

    it('should exist', () => {
      expect(trie.suggest).to.exist
    })

    it('should not suggest a word if there is no word added', () => {
      trie.insert('')

      expect(trie.suggest('')).to.deep.equal([])
    })

    it('should be able to put a single word into an array', () => {
      trie.insert('happy')

      expect(trie.suggest('h')).to.deep.equal(['happy'])
    })

    it('should be able to suggest words that have the same first letter', () => {
      trie.insert('starfish')
      trie.insert('salmon')
      trie.insert('sent')
      trie.insert('cow')

      expect(trie.suggest('s')).to.deep.equal(['starfish', 'salmon', 'sent'])
    })
  })

  describe('populate', () => {
    it('should exist as a method', () => {
      expect(trie.populate).to.exist
    })

    it('should populate with the dictionary', () => {
      trie.populate(dictionary)
      expect(trie.count).to.equal(234371)
    })
  })

  describe('find', () => {
    it('should exist', () => {
      expect(trie.find).to.exist
    })
    it('should be able to find a word', () => {
      trie.insert('hi')
      trie.find('hi')

      expect(trie.find('hi')).to.deep.equal(trie.rootNode.children.h.children.i)
    })
  })

  describe('delete', () => {
    it('should decrement the word count when a word is removed', () => {
      trie.insert('hello')
      trie.insert('help')
      trie.insert('hi')
      trie.insert('held')
      trie.delete('hello')
      trie.delete('help')

      expect(trie.count).to.equal(2)
    })
  })

})

    //suggest
    //should add a word to the array
    //it should exist
    //it should increment word count of the trie
    //it should add a single word to the trie
      //assert that thained nodes are added as children
    //it shoudl NOT increment word count when inserting duplicate words

    //populate
    //it should exist
    //it should add an array of words to tree
    //it should increase trie word count to array amount

    //delete
    //it should exist 
    //it should remove completed words from the last node
    //it should remove any node that no longer lead to a completed word




