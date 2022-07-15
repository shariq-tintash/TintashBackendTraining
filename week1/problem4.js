//Problem 4
// Write a function named “memoizedFetch” that will fetch 
//data from api url passed as argument but if you call the same function again with the same url then will it 
//return previously received result instead of fetching it again.

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


let url = 'https://jsonplaceholder.typicode.com/todos/1';
memoizedFetch(url)
