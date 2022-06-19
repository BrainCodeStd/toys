 export const digitMaker = (value:number , padding:number)=>{
let zeros = new Array(padding + 1).join('0');
return (zeros+value).slice(-padding)
}