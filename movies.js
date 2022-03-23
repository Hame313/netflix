const imageBase="https://image.tmdb.org/t/p/w300";
const frontImageUrl="https://image.tmdb.org/t/p/w1280";
// here we will create the html for each api fetched from tmdb 
// with the value passed from the display function
export function createVisual(data,index){
    // creating a div holder for the slider
    
    const div =document.createElement("div");
    
    div.classList.add('center')
    div.classList.add(`${index}`)
    //
    // inserting a left button in the slider adding an image to the left button
    const leftButton=document.createElement("button");
    leftButton.classList.add('goLeft');
    const leftButtonImg=document.createElement('img');
    leftButtonImg.src="https://img.icons8.com/ios-filled/50/ffffff/chevron-left.png";
    leftButton.append(leftButtonImg);
    // adding an event listener for left button
    leftButton.addEventListener('click', () => {
                leftButton.nextElementSibling.scrollLeft -= 300;
            })
        
    //
    // creating a carousel
    const carousel=document.createElement('div');
    carousel.classList.add('carousel');
   // carousel.classList.add(`${index}`)
    data.forEach((movie)=>{
    const card =document.createElement("div");
    card.classList.add("card");
    const cardImg=document.createElement("img");
    if(movie["backdrop_path"] === null ){
        cardImg.src="./img/netf.png"
    }else{
    cardImg.src=`${imageBase}${movie["backdrop_path"]}`;
    }
    card.append(cardImg);
    carousel.append(card);
    
    createOverview(movie,card);
    })
    
    //
    // creating a right button for each slider and adding an image to the right button
    const rightButton=document.createElement("button");
    rightButton.classList.add('goRight');
    const rightButtonImg=document.createElement('img');
    rightButtonImg.src="https://img.icons8.com/ios-filled/50/ffffff/chevron-right.png";
    rightButton.append(rightButtonImg);
    //
    // adding an eventListener for the right button
    rightButton.addEventListener('click', (e) => {
            rightButton.previousElementSibling.style.scrollBehaviour = "smooth";
            rightButton.previousElementSibling.scrollLeft += 300;
            })

    div.append(leftButton,carousel,rightButton)
    const unique=document.querySelector('.placespeople');
    //unique.append(div);
    unique.insertAdjacentElement("afterend",div)
}





function createOverview(movie,card){
    
    // creating a play button   
    const playBtn=document.createElement('button');
    playBtn.classList.add('playBtn');
    const playBtnImg=document.createElement('img');
    playBtnImg.src="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png";
    playBtn.append(playBtnImg);
    // creating a play button
    // save to local storage
    let movieAndId=`${movie.id}`;
    //saveToLocalStorage(movieAndId,movie["vote_count"])
    // creating a vote button 
    const voteBtn=document.createElement('button');
    const voteBtnImg=document.createElement('img');
    voteBtnImg.src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-like-feedback-kmg-design-glyph-kmg-design.png";
    voteBtn.append(voteBtnImg);
    const cardOverview=document.createElement('div');
    cardOverview.classList.add('card-overview');

    // creating a row of buttons and a vote count and a save to list button
    // vote count
    const voteCount=document.createElement('h1');
    voteCount.classList.add('voteBtn');
    const textVote=document.createTextNode(`${movie["vote_count"]}`)
    // save button
    const saveBtn=document.createElement('button');
    const saveBtnImg=document.createElement('img');
    saveBtnImg.src="https://img.icons8.com/windows/32/000000/save--v1.png";
    saveBtn.append(saveBtnImg);
    saveToMyList(saveBtn,movie)
    voteCount.append(textVote);



    const row = document.createElement('div');
    row.classList.add('row');
    row.append(playBtn,voteBtn,saveBtn,voteCount)
    cardOverview.append(row);
    card.append(cardOverview)
    
    addInteraction(playBtn,movie);
    addVotes(voteBtn,movie,voteCount);
    
}

function addVotes(voteBtn,movie,voteCount){
    let res=parseInt(voteCount.textContent);
    let first=parseInt(movie["id"]);
    let clickCounter=0;
    voteBtn.addEventListener('click',()=>{
        if(clickCounter==0){
            voteCount.textContent=`${res++}`;
            localStorage.setItem(first, res)
            clickCounter++;
        }else{
            voteCount.textContent=`${res--}`;
            localStorage.setItem(first, res)
            clickCounter=0;
        }
    })
}




function addInteraction(playBtn,movie){
    playBtn.addEventListener('click', (e)=>{
         // create a div for each movie to display the overview.
        const popUp=document.createElement('div');
        popUp.classList.add('pop-up');
        popUp.classList.add('bg-grey')
        //adding image
        const imgOverview=document.createElement('img');
        imgOverview.src=`${frontImageUrl}${movie['backdrop_path']}`
        //
        // creating a heading
        const heading=document.createElement('h1');
        heading.classList.add('card-title')
        const textHeading=document.createTextNode(`${movie.original_title}`)
        heading.append(textHeading)
        //
        // creating an overview of the movie
        //
        const pTag=document.createElement('p');
        pTag.classList.add('text')
        const textP=document.createTextNode(`${movie.overview}`) 
        pTag.append(textP)
        //
        const exitBtn=document.createElement('button');
        exitBtn.classList.add('exitBtn');
        const exitBtnImg=document.createElement('img');
        exitBtnImg.src='./img/iconX.png';
        exitBtn.append(exitBtnImg);
        //
        const box=document.createElement('div');
        box.classList.add('box');
        box.append(heading,pTag);
        
        // appending everything into a popup div
        popUp.append(imgOverview,box, exitBtn);
        document.body.append(popUp)
        // onclick exit button removes the popup box
        exitBtn.addEventListener('click',()=>{
        popUp.remove();
        }) 
    })
}



function saveToLocalStorage(id,value){
window.localStorage.setItem(id,value);
}

function saveToMyList(saveBtn,values){
    let img="";
    if(values.backdrop_path === null){
     img="./img/netf.png";
    }else{
     img=imageBase+values.backdrop_path;
    }
    let arr=[values.original_title, img]


    saveBtn.addEventListener('click',()=>{
        saveToLocalStorage(values['title'],arr)
    })    
}