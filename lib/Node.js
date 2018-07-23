export default class Node {
  constructor(data = null, completedWord = null) {
    this.data = data;
    this.completedWord = completedWord;
    this.children = {};
  }
}



