// Problem 3
//Write a function to sum the arguments based on below prototype:
//sum(1)(2)(3);



let sum = (num) => {
  let total = num;

  return (subNum = (item) => {
    if (item != undefined) {
      total += item;
      return subNum;
    }
    return total;
  });
};



console.log(sum(1)());
console.log(sum(1)(2)());
console.log(sum(1)(2)(3)());
console.log(sum(1)(2)(3)(4)());
console.log(sum(1)(2)(3)(4)(5)());
console.log(sum(1)(2)(3)(4)(5)(6)());

// Output
// 1
// 3
// 6
// 10
// 15
// 21