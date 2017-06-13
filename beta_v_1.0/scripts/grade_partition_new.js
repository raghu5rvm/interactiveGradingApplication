function grade_partition_new(Data,Positions){
  let Result=[];
  for(int i=0;i<Positions.length;i++){
    let maxlimit=Positions[i];
    let sum=0;
    for(int j=0;j<Data.length;j++){
      if(Data[j]<maxlimit){
        sum++;
        delete Data[j];
      }
    }
    Result.push(sum);
  }
  Result.push(Data.length);
  return Result;
}
