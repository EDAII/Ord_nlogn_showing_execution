/*
  Linear Sort
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values.length; j++) {
      if (values[i] > values[j]) {
        var temp = values[j];
        values[j] = values[i];
        values[i] = temp;
      }
    }
  }
*/

export default class LinearSort {
  values;
  lastI = 0;
  lastJ = 0;
  completed = false;

  constructor(values) {
    this.values = values;
  }

  next() {
    this.lastJ++;
    if (this.lastJ >= this.values.length) {
      this.lastI++;
      this.lastJ = this.lastI + 1;
    }
    if (this.lastI >= this.values.length) {
      this.completed = true;
      return false;
    }

    if (this.values[this.lastI] > this.values[this.lastJ]) {
      var temp = this.values[this.lastJ];
      this.values[this.lastJ] = this.values[this.lastI];
      this.values[this.lastI] = temp;
      return true;
    }
    return false;
  }

  isCompleted() {
    return this.completed;
  }
  getData() {
    return [...this.values];
  }
}