// Problem 6


import EventEmitter from "events";

// Events Emitters

const temperature = new EventEmitter();
const airPressure = new EventEmitter();
const humidity = new EventEmitter();
const observer = new EventEmitter();
const dashboard  = new EventEmitter();

// Gets random value
const randomValues = () => {
    return (Math.random() *  100);
  };


// Random Retrieval time value between 100-2000ms
const randomRetrievalTime = () => {
    return (Math.random() * (2000 - 100)) + 100;
  };


// Current display object
let currentValues = {
    temperature: 0,
    airPressure: 0,
    humidity: 0,
};

// To keep track of values change
let isSystemValueChange = {
    temperature: false,
    airPressure: false,
    humidity: false,
  };

// When temperature data received
temperature.on("data", (data)=>{
    observer.emit("update", { temperature: data }); 
})
// When air pressure data received
airPressure.on("data", (data) => {
    observer.emit("update", { airPressure: data });
});
  
// When humidity data received
humidity.on("data", (data) => {
    observer.emit("update", { humidity: data });
});

// Display emitter for observer
observer.on("display", ()=>{
    
    console.log("***************MONITORING***************")
    console.log(`System 1: Temperature = ${currentValues.temperature}`)
    console.log(`System 2: Humidity = ${currentValues.humidity}`)
    console.log(`System 3: AirPressure = ${currentValues.airPressure}`)
    console.log("**********************************************\n")
        
})


// Observer when it receives an update - from one of the systems
observer.on("update", (data) => {
    let retrievalTime = randomRetrievalTime();
    setTimeout(()=>{
        // If value not recieved with 1000ms
        if(retrievalTime > 1000){
            currentValues[Object.keys(data)[0]] = randomValues();
            isSystemValueChange[Object.keys(data)[0]]=true;
        }
        else{
            currentValues[Object.keys(data)[0]] = 'N/A'
        }
    },retrievalTime)
});


dashboard.on("observe",()=>{
    setInterval(()=>{
    temperature.emit("data")
    humidity.emit("data")
    airPressure.emit("data")

    // If one of the systems sends a new value
    if(isSystemValueChange.temperature ||
        isSystemValueChange.airPressure ||
        isSystemValueChange.humidity){
            observer.emit("display")      
            
        }    
    isSystemValueChange.airPressure=!isSystemValueChange.airPressure;
    isSystemValueChange.temperature=!isSystemValueChange.temperature;
    isSystemValueChange.humidity=!isSystemValueChange.humidity;
    }, "100");

})



function startMonitoring(){
    dashboard.emit("observe")
}


console.log("************* Welcome To Dashboard*************")
startMonitoring();