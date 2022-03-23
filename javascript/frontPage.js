import {getMovies,APIKEY,frontImageUrl} from './export.js';
let popularMovies="https://api.themoviedb.org/4/list/2?api_key="+APIKEY;
export async function getFrontPage(){
   // getting images and title and overview
    const response=await getMovies(popularMovies);
    let randomMovieIndex=Math.floor(Math.random()*response.length)
    let movie=response[randomMovieIndex];
     // trailer
    const apiVideo="https://api.themoviedb.org/3/movie/"+movie.id+"/videos?api_key="+APIKEY;
    const getResponse= await getMovies(apiVideo);
    const trailerVideo= await getTrailer(getResponse);
    // send the response for video keys 
    let front=document.querySelector('.frontLine');
    let image=frontImageUrl.concat(movie.backdrop_path);
    front.insertAdjacentHTML("afterbegin",
    `<img class="poster-image" alt="${movie.original_title}" src="${image}"> 
    <div class="content-box">
    <div class="col-6-md">
    <h1 class="text-size5 text-white">${movie.original_title}</h1>
    <p class="text-size3 text-white">${movie.overview.slice(0,120)+"..."}</p>
    <div class="row">
        <button id="videoPlayer" class="btn-white bg-white bRadius-1" type="button"><img src="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png"><p class="text-size3">Play</p></button>
        
    </div>
    </div>
    </div>
    `
    )   
}
//<button class="secondBtn bg-grey bRadius-2 text-white" type="button">${movie.popularity}</button>
// accepting response and finding a trailer
 function getTrailer(response){
    if(response.length>0){
    const found=response.find((trailer)=>trailer.type==="Trailer");
    return createPlayerForFrontPage(found.key);
    }else{
        console.log("no trailers for this movie")
    }
}


export function createPlayerForFrontPage(videoId) { 
    let player = new YT.Player('player', { 
        height: '390', 
        width: '640', 
        videoId: videoId,
        playerVars:{
        controls:0
        },
        events: { 
            'onReady': onPlayerReady, 
            'onStateChange': onPlayerStateChange, 
        }
});

}
    function onPlayerReady(event) {
        const   content=document.querySelector('.content-box');
        const button= document.getElementById('videoPlayer');
        const frame=document.querySelector('iframe');
        const textRemoval=document.querySelector('.col-6-md');
        const pTag=textRemoval.children[1]
        frame.classList.add('disp-none')
        let clickCounter=0;
        button.addEventListener('click',()=>{           
            clickCounter++;
        if(clickCounter%2>0){ 
            content.style.top="50%";         
            event.target.playVideo();
            frame.classList.toggle('disp-none')
            pTag.classList.toggle('disp-none');
        }
        else if(clickCounter%2===0){
            content.style.top="25%"
            event.target.stopVideo();
            frame.classList.toggle('disp-none')
            pTag.classList.toggle('disp-none');
        }
        
    })
}
function onPlayerStateChange(event) {
    const   content=document.querySelector('.content-box');
    const textRemoval=document.querySelector('.col-6-md');
    const pTag=textRemoval.children[1]
    const players=document.querySelectorAll("#player");
    if (event.data == YT.PlayerState.ENDED ) {    
            event.target.stopVideo();
            players.forEach((value)=>{
                value.classList.add('disp-none');
                pTag.classList.toggle('disp-none');
                content.style.top="25%"
            })          
}
}