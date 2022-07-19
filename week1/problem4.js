//Problem 4
// Write a function named “memoizedFetch” that will fetch 
//data from api url passed as argument but if you call the same function again with the same url then will it 
//return previously received result instead of fetching it again.




const runtineMemoizedFetch = () => {

  const cache = {};
  return async (...args) => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      try {
        console.log("From Api-Runtime ");
        const response = await fetch(url);
        cache[key] = response;
        console.log(cache[key]);
        return cache[key];
      } catch (err) {
        console.log("Something went wrong: " + err);
        return err;
      }
     
    }
    console.log("From cache-Runtime");
    console.log(cache[key]);
    return cache[key];
  };
};

let memoizedFetch = (url) => {
  caches.open('fetchedURLs').then( cache => {
    cache.match(url).then(res => {
      if(res){
        console.log("From Cache")
        console.log(res)
      }
      else{
        fetch(url).then( res =>{
          console.log("From API")
          console.log(res)
          return cache.put(url, res);
        }).catch(()=>console.log('Invalid url'));
      }
    })
 });
}


const url = 'https://jsonplaceholder.typicode.com/todos/1';

const runtineMemoize = runtineMemoizedFetch();
async function main() {
  // Runtime cache test
  await runtineMemoize(url); 
  await runtineMemoize(url);

  // Using cache
  memoizedFetch(url)
  memoizedFetch(url)
}

main();