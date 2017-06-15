function grade_partition_new(Data,Positions){
  let Result=[];
  let min=-Infinity;
  let cumsum=0;
  for(let i=0;i<Positions.length;i++){
    let maxlimit=Positions[i];
    let sum=0;
    for(let j=0;j<Data.length;j++){
      if(Data[j]<maxlimit  && Data[j]>=min){
        sum++;
        cumsum++;
      }
    }
        min=Positions[i];
    //console.log(Data);
    Result.push(sum);
  }
  Result.push(Data.length-cumsum);
  return Result;
}
