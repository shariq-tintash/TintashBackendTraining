//Problem 5
// Different type of Promises implementation


// Callbacks Sequentially
const callbackSeq = (urls, callback) => {
  return new Promise((resolve) => {
    if (urls.length >= 1) {
      fetch(urls[0]).then((res) => {
        results.push(res);
        return resolve(callback(urls.slice(1), callback));
      });
    } else {
      return resolve(Promise.resolve(results));
    }
  });
};



// Promises Sequentially
const promiseSeq = (urls) => {
  const result = urls.reduce((prevProm, url) => {
    return prevProm.then((acc) => fetch(url).then((res) => [...acc, res]));
  }, Promise.resolve([]));

  return result
    .then((reps) => {
      results = reps.map((res) => res);
      return Promise.resolve(results);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};


// Promises in Parallel
const promisePar = (urls) => {
  const promises = urls.map(async (url) => fetch(url));
  return Promise.all(promises)
    .then((responses) => {
      results = responses.map((res) => res);
      return results;
    })
    .catch((err) => {
      console.log("err: " + err);
      throw err;
    });
};

// Async await Sequentially
const asyncSeq = async (urls) => {
  for (const url of urls) {
    try {
      let res = await fetch(url);
      results.push(res);
    } catch (error) {
      results.push("invalid url");
    }
  }
  return results;
};

// Async await in Parallel
const asyncPar = async (urls) => {
  try {
    const responses = urls.map(async (url) => fetch(url));
    results.push(...(await Promise.all(responses)));
  } catch (err) {
    console.error(err);
  }
  return results;
};


let results = [];
let executionTime={};

async function main() {
  try {
   
    let urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3",
    ];

    
    let startTime;
    let endTime;
    let totalTime;

    // Serial Callbacks
    startTime = new Date().getTime();
    results = [];
    results = await callbackSeq(urls, callbackSeq);
    endTime = new Date().getTime();
    totalTime = endTime - startTime;
    executionTime['Serial Callbacks']=totalTime + " ms";
    console.log("Response: Serial Callbacks ");
    console.log(results);


    // Serial Promises
    startTime = new Date().getTime();
    results = [];
    results = await promiseSeq(urls);
    endTime = new Date().getTime();
    totalTime = endTime - startTime;
    executionTime['Serial Promises']=totalTime + " ms";
    console.log("Response: Serial Promises");
    console.log(results);

    // Parallel Promises
    startTime = new Date().getTime();
    results = [];
    results = await promisePar(urls);
    endTime = new Date().getTime();
    totalTime = endTime - startTime;
    executionTime['Parallel Promises']=totalTime + " ms";
    console.log("Response: Parallel Promises");
    console.log(results);

    // Serial Async await
    startTime = new Date().getTime();
    results = [];
    results = await asyncSeq(urls);
    endTime = new Date().getTime();
    executionTime['Serial Async await']=totalTime + " ms";
    console.log("Response: Serial Async await ");
    console.log(results);

    // Parallel Async await
    startTime = new Date().getTime();
    results = [];
    results = await asyncPar(urls);
    endTime = new Date().getTime();
    totalTime = endTime - startTime;
    executionTime['Parallel Async await']=totalTime + " ms";
    console.log("Response: Parallel Async await ");
    results = results.map((res) => res);
    console.log(results);



    console.log("Comparison Result with each type: ");
    for (const item in executionTime) {
        console.log(`\n Time taken to execute with ${item}: `);
        console.log(executionTime[item])
      }
      

  } catch (error) {
    console.log(error);
  }
}

main();