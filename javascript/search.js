import {getMovies,searchQuery} from './export.js';
import {createVisual} from './movies.js';

function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout( callback, delay );
    }
}
function getText(){
    const input=document.getElementById("search");
    let value=input.value;
    search(value);
}


function onClick(){
   const searchBtn=document.querySelector(".input-search");
   const input=document.getElementById("search");
    searchBtn.addEventListener("click",()=>{
        input.classList.toggle("disp-none")
        searchBtn.classList.toggle("disp-none");
    })
    if(input.classList.contains("disp-none")){
        input.addEventListener('input', debounce(getText,1300));
    }
    input.addEventListener('focusout',()=>{
        searchBtn.classList.toggle("disp-none")
        input.classList.toggle("disp-none")
    })
}


async function search(value){
    
    if(typeof value !== "undefined" && value !== ""){
        try{
        let data= await getMovies(searchQuery.concat(value));
        console.log(data);
        visual(data,value);
        }catch(e){
            console.log("some problems here",e)
        }
    }
}


function visual(data,value){
    console.log(value);
    const text=document.createElement("h1");
    const textNode=document.createTextNode(`Here are the results`);
    text.append(textNode);
 
    createVisual(data,value);
    addText(value);
    noData(value);
  
}
function addText(value){
    let  newClass=document.querySelector(`.${value}`);
    let text=document.createElement("h1");
    text.classList.add("text-center")
    let addText=document.createTextNode(`Here are results for ${value}`)
    text.append(addText);
    newClass.append(text);
    newClass.style.display="flex";
    newClass.style.flexDirection="column-reverse";

}


function noData(value){
    const input=document.getElementById("search");
   if(value !== undefined || value === "" || value === null){
       console.log(value);
   
     input.addEventListener('keyup',()=>{
        if(input.value.length===0){
            let classRemoved=document.querySelector(`.${value}`);
            let tags=classRemoved.getElementsByTagName('div');
            classRemoved.parentNode.removeChild(classRemoved);
        }
    })
   }
}

onClick(); 
search();
noData()