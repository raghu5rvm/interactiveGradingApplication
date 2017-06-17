function grade_partition_new(Data,Positions){
  let Result=[];
  let min=-Infinity;
  Data.sort();
  let index=0;
  let cumsum=0;
  for(let i=0;i<Positions.length;i++){
    let maxlimit=Positions[i];
    let sum=0;
    for(let j=index;j<Data.length;j++){
      if(Data[j]<maxlimit  && Data[j]>=min){
        sum++;
        cumsum++;
      }
      else{
        break;
      }
    }
        min=Positions[i];
        index=index+sum;
    //console.log(Data);
    Result.push(sum);
  }
  Result.push(Data.length-cumsum);
  return Result;
}
