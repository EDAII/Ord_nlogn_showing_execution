/*
  Merge Sort (variation with linear sort for small parts merging)
  sort(arr) {
    if (arr.length < 2)
      return arr;
    var mid = parseInt(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid, arr.length);
    return merge(sort(left), sort(right));
  }
  merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
  }
*/

export default class MergeSort {
  values;

  constructor(values) {
    this.values = values;
    this.prepareSort();
  }

  next() {
    if (this.tasks.length > 0) {
      if (this.merge(this.tasks[0]))
        this.tasks = this.tasks.slice(1);
    }
    return true;
  }

  prepareSort() {
    this.divide(0, this.values.length - 1);
  }

  divide(i, j) {
    if (j - i < 1)
      return [i, j];
    var mid = parseInt(i + ((j - i) / 2));
    var left = [i, mid];
    var right = [mid + 1, j];

    return this.addMergeTask(this.divide(left[0], left[1]), this.divide(right[0], right[1]));
  }

  tasks = [];

  addMergeTask(left, right) {
    this.tasks.push([left[0], right[1]]);
    return [left[0], right[1]];
  }

  merge(pair) {
    var i = pair[0];
    var max = pair[1];

    // small linear sort variation, to keep compatibility with step by step sorting
    while (i < max) {
      for (var j = i+1; j <= max; j++) {
        if (this.values[i] > this.values[j]) {
          var temp = this.values[i];
          this.values[i] = this.values[j];
          this.values[j] = temp;
          //not done yet, just one step
          return false;
        }
      }
      i++;
    }
    //all done
    return true;
  }

  isCompleted() {
    return this.tasks.length === 0;
  }

  getData() {
    return [...this.values];
  }
}