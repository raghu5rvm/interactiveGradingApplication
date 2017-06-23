function Marks(){
  var data;
  this.setData=function(userdata){
    this.data=userdata;
  }
 
  this.getcounts=function(part){
    return grade_partition_new(data,part);
  }
  this.arithbounds=function(n,min,max){
    let dist=(max-min)/(n-1);
    let result=[];
    for(let i=min;i<=max;i=i+dist){
      result.push(i);
    }
    return result;
  }
  this.avg=function(){
    let sum=0;
    for(let i=0;i<data.length;i++){
      sum+=data[i];
    }
    return sum/data.length;
  }
  this.stddev=function(){
       let myu=avg();
       let sqrsum=0;
       for(let i=0;i<data.length;i++){
         sqrsum+=(data[i]-myu)*(data[i]-myu);
       }
       sqrsum=sqrsum/data.length;
       return Math.sqrt(sqrsum);
  }
  this.getarithcounts=function(n,min,max){
    let part=arithbounds(n,min,max);
    getcounts(part);
  }

}
