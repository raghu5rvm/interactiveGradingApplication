
function grade_part(Data,Positions){
  let Result=[];
  for(var i=0;i<Positions.length;i++){
    let maxlimit=Positions[i];
    let sum=0;
    for(var j=0;j<Data.length;j++){
      if(Data[j]<maxlimit){
        sum++;
        Data.splice(j,1);
      }
    }
    Result.push(sum);
  }
  Result.push(Data.length);
  return Result;
}
