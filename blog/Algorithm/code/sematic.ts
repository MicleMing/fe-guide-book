class Value {
  readonly reducible: boolean = false;
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class Add {
  readonly reducible: boolean = true;
  left: any;
  right: any;
  constructor(left: any, right: any) {
    this.left = left;
    this.right = right;
  }
  reduce() {
    let left = this.left;
    let right = this.right;
    if (left.reducible) {
      return new Add(left.reduce(), right);
    } else if (right.reducible) {
      return new Add(left, right.reduce());
    } else {
      return new Value(left.value + right.value);
    }
  }
}

class Multiply {
  readonly reducible: boolean = true;
  left: any;
  right: any;
  constructor(left: any, right: any) {
    this.left = left;
    this.right = right;
  }
  reduce() {
    let left = this.left;
    let right = this.right;
    if (left.reducible) {
      return new Multiply(left.reduce(), right);
    } else if (right.reducible) {
      return new Multiply(left, right.reduce())
    } else {
      return new Value(left.value * right.value);
    }
  }
}


class Machine {
  expression: any;
  constructor(expression: any) {
    this.expression = expression;
  }
  run() {
    while (this.expression.reducible) {
      this.expression = this.expression.reduce();
    }
    console.log(this.expression);
  }
}

// 1 + 2 * 3

new Machine(
  new Multiply(
    new Value(2),
    new Add(
      new Value(3),
      new Value(4)
    )
  )
).run();
