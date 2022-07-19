//Problem 2
//Introduce a populate method in array class in a way such that you can call it:




let arrayOfUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
  ];
  
  Array.prototype.populatee = async function () {
   
  
    this.forEach((url,i)=>{
      try{
        fetch(url)
        .then(response => response.json())
        .then(json => this[i]=json)
        .catch(()=>this[i] = "invalid url")
      }catch(err){
        console.log(err);
      }
   
    })
    
        
    return this;
  };

arrayOfUrls
  .populatee()
  .then(() => {
    console.log(arrayOfUrls);
  })
  .catch((err) => {
    console.log(err);
  });

//Output
// [
//   {
//       "userId": 1,
//       "id": 1,
//       "title": "delectus aut autem",
//       "completed": false
//   },
//   {
//       "userId": 1,
//       "id": 2,
//       "title": "quis ut nam facilis et officia qui",
//       "completed": false
//   }
// ]
