import {getMovies, getMovieData,frontImageUrl,imageBase} from './export.js'
import {getFrontPage} from './frontPage.js';
import {createVisual} from './movies.js';
document.cookie = 'cookie2=value2; SameSite=Lax;';



// here we will display the data results
async function display(){
    let results= await getMovieData();
    results.forEach((value,index)=>{
        createVisual(value,index);
    })
}







async function getAllData(){
    await getFrontPage();
    await display();
}


// displays all data 
window.addEventListener('load',(event)=>{
    getAllData();
})
// displays all data



