function Constructor(){
this.Data=[];
this.maxData;
this.minData;
this.average;


	this.setData=function(){
			inputBox=document.getElementById("dataField");
			if(inputBox.value!=null && inputBox.value!=""){
				var tempData;
				tempData=inputBox.value;
				tempData=tempData.trim();
				tempData=tempData.split('\n');
				for(var i=0;i<tempData.length;i++){
					tempData[i]=parseFloat(tempData[i]);
					//tempData[i]=Math.round(tempData[i]);
					if(isNaN(tempData[i])){				
						tempData.splice(i,1);
						console.log("Invalid input!!!\nEnter only marks which are numbers.Data is of length :");
						}	
					}
					
				console.log("Data is validated"+tempData);
				this.Data=tempData;
				var total=0;
				this.maxData=-Infinity;
				this.minData=Infinity;
				//calculating average of whole data provided by user
				for(var i=0;i<this.Data.length;i++){
						total+=parseFloat(this.Data[i]);
						if(this.Data[i]>this.maxData)
							this.maxData=this.Data[i];
						if(this.Data[i]<this.minData)
							this.minData=this.Data[i];
					}
				console.log("printing average from next")	
				this.average=total/parseFloat(this.Data.length);
				console.log("Average = "+this.average)
				document.getElementById("avgMarks").innerHTML=this.average.toFixed(3);
				document.getElementById("showData").innerHTML=this.Data;
				document.getElementById("dataCount").innerHTML=this.Data.length;
			}
		}
}



obj=new Constructor();
