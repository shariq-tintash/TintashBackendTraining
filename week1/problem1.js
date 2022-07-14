//Problem 1
//Write a function that can sum any number of arguments. 

let sum = (...args) => args.reduce ((previousValue, currentValue) => previousValue + currentValue,0);
 
console.log(sum(1,2,3));
console.log(sum(4,5));
console.log(sum(2,6,7,8));
console.log(sum(1,2,5,6));
console.log(sum(1));
console.log(sum());
//Output
// 6
// 9
// 23
// 14
// 1
// 0