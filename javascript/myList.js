function getEntries(){
const items={...localStorage};
console.log(Object.keys(items))
if(Object.keys(items).length === 0){
    return  displayNone();
}else{
    let dragon=[];
for( const val in items){
    if(!isNaN(val)){
       // console.log(val)
    }else{
    dragon.push(items[val])
    }
}
return dragon;
}
}



function displayList(){
    let results=getEntries()
    if(typeof results != "undefined"){
    let data=results.map((value)=>{
        return value.split(",");
    })
    let your=document.createElement('h1');
    let texting=document.createTextNode("Your list is displayed on this slider")
    your.style.textAlign="center";
    your.classList.add("text-size5")
    your.style.position="relative";
    your.style.top="20vh";
    your.append(texting);

    let center=document.createElement('div');
    center.classList.add('center');
    center.style.position="relative";
    center.style.top="30vh";
   
    const leftButton=document.createElement("button");
    leftButton.classList.add('goLeft');
    const leftButtonImg=document.createElement('img');
    leftButtonImg.src="https://img.icons8.com/ios-filled/50/ffffff/chevron-left.png";
    leftButton.append(leftButtonImg);
    // adding an event listener for left button
    leftButton.addEventListener('click', () => {
                leftButton.nextElementSibling.scrollLeft -= 300;
            })
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

     let carousel=document.createElement('div');
        carousel.classList.add('carousel');
        center.append(leftButton,carousel,rightButton)
        document.body.append(your,center)
    data.forEach((value,index)=>{
        let card=document.createElement('div');
        card.classList.add('card');
        let cardTitle=document.createElement('h1');
        cardTitle.classList.add("text-size3");
        cardTitle.classList.add("text-center")
        let text=document.createTextNode(`${value[0]}`)
        cardTitle.append(text);

        let cardImg=document.createElement('img');
        cardImg.src=`${value[1]}`;
        cardImg.classList.add("card-img")
        card.append(cardImg,cardTitle);
        let carousel=document.querySelector('.carousel');
        carousel.append(card);
        
        
    })
}
else {
    console.log("error with  logging out values")
}
}
function displayNone(){
    const text=document.createElement("h1");
    const none=document.createTextNode("You have not added anything to your list");
    text.append(none);
    text.style.position="relative";
    text.style.textAlign="center";
    text.style.top="40vh"
    text.classList.add("text-size6")
    document.body.append(text);
}
window.onload=displayList();