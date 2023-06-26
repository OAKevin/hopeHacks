// ITS WORKING 
// Youtube
// Perform an action when the page is fully loaded // Had an issue with the DOM so had to make sure the page was loaded correctly
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
})
// Initialize a variable to store parameters
let params = ''
// Define a function to fetch data from an API
 function f (path, element, headers) { 
    params = element.value // Set the value of 'params' variable to the input element's value
    return fetch(path + (`?q=${params}`), { // Fetch data from the API with the provided parameters
        method: 'GET',
	    headers: headers
    })
        .then(response => response.json()) // Parse the response as JSON
        .catch(err => console.error(err)) // Log any errors that occur during the fetch
        .finally(()=>{
            element.value = '' // Clear the input element's value
        })
    }
// Get references to the input elements and buttons
const userInput1 = document.querySelector('#aa');
const userInput2 = document.querySelector('#bb');

// console.log(userInput1)
const btn1 = document.querySelector('#btn1');
const btn11 = document.querySelector('#btn11');


function getYoutubeData (){
    f (`https://youtube-search-results.p.rapidapi.com/youtube-search/` , userInput1,   {
        // my api 
    // 'X-RapidAPI-Key': '04a7b63742mshe31a0e0ebbb49f8p1cd7ebjsn812e3735989f',
    // 'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
    // not my api
    'X-RapidAPI-Key': '796b3f0555msh6c3f2fd0a0ce775p1c06ebjsn2c33af6295a3',
    'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
    }).then ((youtubeData)=>{
        let output = '';
        // console.log(youtubeData)
        results=youtubeData.items.slice(0,5)
         results.map(item => {
        //  console.log(item)
         let img = '';
         if (item.bestThumbnail){
            img = '<img src="' + item.bestThumbnail.url + '"  width=200px height=200px ></img> ' 
         }
         output += 
             '<h1>' + item.title + ' </h1> ' +
            '<li>' + 
            '<a href = "' + item.url + '" > ' + item.url + '</a> ' +
            '<p>' + item.views + ' </p> ' +
            img +
            '</li>' ;
     })
     document.querySelector("#youtubeResult").innerHTML = output

    })
}