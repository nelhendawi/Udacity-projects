console.log("hello world")
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const ApiKey='&appid=dad40e20f059c467e9694a2229d22259';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newzip= document.getElementById('zip').value;
    //console.log(newzip);
    const feelings=document.getElementById('feelings').value;
    getWeather(baseURL,newzip,ApiKey)

    .then(function(data){
        console.log(data);
        postData('/add',{date:d,temp:data.main.temp,content:feelings}).then(function(){
          updateUI();
        })
    })
};

    const getWeather = async (baseURL,zip,key)=>{
        const res = await fetch(baseURL+zip+key)
        try {
          const data = await res.json();
          console.log(data)
          return data;
        }  catch(error) {
          console.log("error", error);
          // appropriately handle the error
        }
      }

    const postData = async ( url = '', data = {})=>{
        const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    
        try {
          const newData = await response.json();
          return newData;
        }catch(error) {
        console.log("error", error);
        }
    }

    async function updateUI(){
      const request= await fetch('/all');
      try{
         // Transform into JSON
          const allData=await request.json();
          // Write updated data to DOM elements
          document.getElementById('date').innerHTML=allData.date;
          document.getElementById('temp').innerHTML=allData.temp;
          document.getElementById('content').innerHTML=allData.content;
      }catch(error){
         // appropriately handle the error
          console.log("error",error);
      }

    }