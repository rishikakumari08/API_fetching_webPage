const apiKey='493cefd57cac4c0e8665fc2f09342c86';
const GetCard=document.getElementById("bolg-container");

const searchField=document.getElementById("search-input");

const searchButton=document.getElementById("search-button");
async function fetchRandomNews(){
    // try and catch used where we are expecring a error which would be through if the things working not properly
    // like we search anything and when we have a network issue then we face the error that network issue or any messages
    try{
        // to make the url dynamic we use back-dack key
        // here pagesize means there could be many pages in this url but we want to fetch only 10 of them
        // now by the help $ sign we make our own url
        const apiUrl = `
        https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    

       const response=await fetch(apiUrl);

       const data= await response.json();
       console.log(data);
       return data.articles
    }catch(error){
        console.log("Error Fetching Random News",error);
        return [];
    }
}

searchButton.addEventListener("click",async ()=>{
    const querry=searchField.value.trim();
    if(querry!='')
    {
     try
     {
           const article=await fetchNewsQuery(querry);
           displayBlocks(article)
     }catch(error){
          console.log("Error Fetching news by querry",error);
     }
    }
})
async function fetchNewsQuery(querry)
{
    try{
        const apiUrl = `
        https://newsapi.org/v2/everything?q=${querry}&pageSize=12&apiKey=${apiKey}`;
    

       const response=await fetch(apiUrl);

       const data= await response.json();
       console.log(data);
       return data.articles
    }catch(error){
        console.log("Error Fetching Random News",error);
        return [];
    }


}
// function display blocks
function displayBlocks(articles)
{
    GetCard.innerHTML='';
    articles.forEach( (article)=> {
        const blockCard=document.createElement("div")
        blockCard.classList.add("block-card")
        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const trucatedTitle=article.title.length>30? article.title.slice(0,30) + "...":article.title;
        title.textContent=trucatedTitle
        const description=document.createElement("p");
        description.textContent=article.description
        
        blockCard.appendChild(img)
        blockCard.appendChild(title)
        blockCard.appendChild(description)
        blockCard.addEventListener("click",()=>{
            window.open(article.url,"__blank")
        })
        GetCard.appendChild(blockCard);
    });
}

(async()=>
{
    try{
      const articles=await fetchRandomNews();
      displayBlocks(articles);
    }catch(error){
        console.log("Error Fetching Random News",error);
    }
})();