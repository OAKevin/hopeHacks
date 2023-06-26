// ITS WORKING 
// GOOGLE 

function getGoogleData (){
    f (`https://google-search72.p.rapidapi.com/search` , userInput2, {
    // 'X-RapidAPI-Key': '04a7b63742mshe31a0e0ebbb49f8p1cd7ebjsn812e3735989f',
    // 'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com',
    'X-RapidAPI-Key': 'b307bf8b02msh7ed29a84322afc2p116177jsn3993a5df8421',
    'X-RapidAPI-Host': 'google-search72.p.rapidapi.com',
    }).then ((googleData)=>{
        let output = '';
        results=googleData.items.slice(0,5)
        results.map(item => {
            // console.log(item)
            				output += `
            					<h1>${item.title}</h1>
            					<li>
            					<a href="${item.link}">${item.link}</a>
                                <p>${item.snippet}</p>
            					</li>
            				`;
            			});
            			document.querySelector('#googleResult').innerHTML = output;
    })
}
// Make click of button do something
btn1.addEventListener('click', getYoutubeData )
btn11.addEventListener('click', getGoogleData )