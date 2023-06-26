// ITS WORKING 
// Parameter Function
// Had an issue with the DOM so had to make sure the page was loaded correctly
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ITS WORKING 
// Youtube
function getYoutubeData() {
    // Call the 'f' function with the URL, userInput1, and headers
    f(`https://youtube-search-results.p.rapidapi.com/youtube-search/`, userInput1, {
        // my api 
        // 'X-RapidAPI-Key': '04a7b63742mshe31a0e0ebbb49f8p1cd7ebjsn812e3735989f',
        // not my api
        'X-RapidAPI-Key': '796b3f0555msh6c3f2fd0a0ce775p1c06ebjsn2c33af6295a3',
        'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
    }).then((youtubeData) => {  // Execute this block when the 'f' function is resolved
        let output = '';  // Initialize an empty string variable named 'output'
        console.log(youtubeData);  // Print the 'youtubeData' to the console
        results = youtubeData.items.slice(0, 5);  // Get the first 5 items from 'youtubeData.items' and assign them to 'results' variable
        results.map(item => {
            // For each item in 'results' array, execute the following block
            output +=
            '<div class="item">' +
                '<h1>' + item.title + ' </h1> ' +
                '<img src="' + item.bestThumbnail.url + '"   width=300px height=200px ></img> ' +
                '<br></br>' +
                '<a href="' + item.url + '"> ' + item.url + '</a> ' +
                '<p>' + item.views + ' </p> ' +              
            ' </div> ';
        });
        document.querySelector("#youtubeResult").innerHTML = output;  // Set the innerHTML of the element with ID 'youtubeResult' to the value of 'output'
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Natalie google coded portion portion 
function getGoogleData (){
    f (`https://google-search74.p.rapidapi.com/` , userInput2, {   // inside our f function we have our path and parameters; how we will put in question to search for (rapid api )
    // 'X-RapidAPI-Key': '04a7b63742mshe31a0e0ebbb49f8p1cd7ebjsn812e3735989f',
    // 'X-RapidAPI-Key': '67ec5b83a7mshc9c40868aa7f996p198f58jsn7e48c3971888',
    // 'X-RapidAPI-Key': '6c097732b3msh0e449dff7fd3753p1dc597jsn4bdefd6b7870',
    'X-RapidAPI-Key': 'b307bf8b02msh7ed29a84322afc2p116177jsn3993a5df8421',   
    'X-RapidAPI-Host': 'google-search74.p.rapidapi.com', //authenticators and rapid api host to use api respectively
    }).then ((googleData)=>{   //function returns a promise and used '.then()' method to handle that response; inside that 'then' block, a callback function is provided which takes 'googleData'as its parameter
        let output = '';   //initialized as an empty string, but then used to store the HTML content that will be displayed on the web page
        console.log(googleData)   //show the response data received from the RapidAPI Service
        results=googleData.results.slice(0,18)   // once we get results we searched for, we are slicing the 'items' property of 'google data' to retrieve only the first five items (these items represent the search results)
        results.map(item => {   // map method is used to iterate over each result item and generate HTML code
            // for each item, 'title', 'link', and 'snippet' properties are accessed
            // item looking for specific title and link looking for snippet
                            output += `
                                <h1>${item.title}</h1>
                                <a href="${item.url}">${item.url}</a>
                                <p>${item.description}</p>
                            `;
                        });
                        document.querySelector('#googleResult').innerHTML = output;//query selector for google result; will display search results on the webpage
    })
}
// Make click of button do something
btn1.addEventListener('click', getYoutubeData )
btn11.addEventListener('click', getGoogleData )