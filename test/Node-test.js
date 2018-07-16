import { expect } from 'chai';
import Node from '../lib/Node';


describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('hello')
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('should take in a word', () => {
    expect(node.data).to.deep.equal('hello')
  })


})


  //it should exist
    //it should have a root node thats an instance of Node

