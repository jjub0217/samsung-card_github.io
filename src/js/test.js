function foo (name) {
  this.name = name

  this.nameConsole = () => console.log(this.name);
}

const foo2 = new foo('name');

foo2.nameConsole()

// var let const 

// const obj = {
//   name: "kim",
//   age: 28,
//   foo: () => {
//     console.log(this.name)
//   }
// }

// function foo2() {
//   const b = 0;
//   console.log(a, b);
// }

// const ee =document.querySelector('.dfkjdk')

// ee.onClick 

// document.dkfj('click', '.dfkjdk').dkjsfkjf