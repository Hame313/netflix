export async function getMovieData(){
    const apiMAP=[
    {
        method:'get',
        url:'https://api.themoviedb.org/4/list/2?',
        params:{
        ["api_key"]:'88ae50ad0db315a0aaf983a64911b45b',
        },
    },
    {
        method:'get',
        url:'https://api.themoviedb.org/4/list/6?',
        params:{
        ["api_key"]:'88ae50ad0db315a0aaf983a64911b45b',
        },
    },
    {
        method:'get',
        url:'https://api.themoviedb.org/4/list/3?',
        params:{
        ["api_key"]:'88ae50ad0db315a0aaf983a64911b45b',
        }
    },
    {
        method:'get',
        url:'https://api.themoviedb.org/4/list/5?',
        params:{
        ["api_key"]:'88ae50ad0db315a0aaf983a64911b45b',
        },
    }
]
let arr=[];
    await Promise.all(apiMAP.map(async(value)=>{
        try{
        const res=await axios(value);
        arr.push(res.data.results)
    }
        catch{
            console.log("here broke with axios")
        }
    }))
    return arr;
}


export async function getMovies(url){
    try{
        return await axios.get(url).then(({ data })=>data.results);   
    }
    catch(e){
        console.log("In catch network errors",e);
    }
}


