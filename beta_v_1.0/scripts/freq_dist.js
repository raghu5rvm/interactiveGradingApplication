console.log("inside feq");
function freq_dist(Data,max){
  let arr=[];
  for(let i=0;i<=max;i++){
    arr[i]=0;
  }
  for(let i=0;i<Data.length;i++){
    arr[Data[i]]++;
  }
  return arr;
}
