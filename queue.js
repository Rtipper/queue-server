class Queue {
  constructor(name) {
    this.name = name;
    this.front = null;
    this.rear = null;
    this.pickup = [];
    this.transit = [];
    this.delievered = [];
  }
}