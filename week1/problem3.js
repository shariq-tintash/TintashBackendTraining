// Problem 3
//Write a function to sum the arguments based on below prototype:
//sum(1)(2)(3);


function sum(...args) {

    function add(...args2) {
      return sum(...args, ...args2);
    }
  
    const curr = [...args].reduce((acc, curr) => acc + curr, 0);
    add.value = curr;
    return add;
  }



console.log(sum(1).value);
console.log(sum(1)(2).value);
console.log(sum(1)(2)(3).value);
console.log(sum(1)(2)(3)(4).value);
console.log(sum(1)(2)(3)(4)(5).value);
console.log(sum(1)(2)(3)(4)(5)(6).value);

// Output
// 1
// 3
// 6
// 10
// 15
// 21