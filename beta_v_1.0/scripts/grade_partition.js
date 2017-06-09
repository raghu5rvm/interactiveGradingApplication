function grade_partition(FreqDistList,Positions,MaxMarks){
Positions.unshift(0);
Positions.push(MaxMarks+1);
let Result=[];
for(let i=0;i<Positions.length-1;i++){
let sum=0;
  for(let j=Positions[i];j<Positions[i+1];j++){
    sum+=FreqDistList[j];
  }
Result.push(sum);
}
return Result;
}
