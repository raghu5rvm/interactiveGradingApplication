function MyInstance(){
	
	/*******************************************************************
	 * 						Data members								
	 * ****************************************************************/
	 //user inputs......................................................
	this.Data=[];
	this.resolution;
	
	//variables in all modes............................................
	this.gradeCount;
	this.gradeLabels=[];
	this.gradeCredits=[];
	
	//iitb Default variables............................................
	this.refValue;
	
	//custom model variables............................................
	this.maxData=100;
	this.minData=0;
	this.min;
	this.max;
	
	//flag
	this.hasData=0;
	
	//other variables
	this.average;
	this.myChart=null;
	this.myAnnotationsFixed=[];
	this.myAnnotationsMovable=[];
	this.myAnnotations=[];
	this.gradeValuesMovable=[];
	this.gradeValuesFixed=[];
	this.gradeBoundsDynamic=[];
	this.gradeBoundsStatic=[];

}

MyInstance.prototype={
	constructor:MyInstance,
	
	
	//confirm input data by user and set variables to new values........
	
	 confirmData:function (){
		 
		 this.setData();
		 
		 //confirm variables of iitb default mode.......................
		if(this.gradeMode=="iitbDefault"){
			this.max=parseFloat(document.getElementById("max").value);
			this.min=parseFloat(document.getElementById("min").value);
			this.gradeCount=9;
			this.gradeLabels=["F","DD","CD","CC","BC","BB","AB","AA","AP"];
			this.gradeCredits=[0,3,4,5,6,7,8,9,10];			
			this.hasData=1;			
			//calculate bounds.......................
			
			}
			
		//confirm variables of absolute mode ...........................
		else if(this.gradeMode=="iitbAbsolute"){
			this.gradeCount=8;
			this.gradeLabels=["F","DD","CD","CC","BC","BB","AB","AA","AP"];
			this.gradeCredits=[0,3,4,5,6,7,8,9,10];			
			this.gradeBoundsStatic=[40,50,60,70,80,90,100];
			this.gradeBoundsDynamic=[40,50,60,70,80,90,100];
			this.hasData=1;
			}
			
		//confirm variables of custom mode..............................
		else if(this.gradeMode=="custom"){
				 if(obj.myChart!=null){
					obj.myChart.destroy();
					obj.myChart=null;
					}
			
					var maxData=-Infinity;
					var minData=Infinity;
					//fetch value of minimum which is lower bound in partitioning grades.(may not be the least value in graph)
					this.min=document.getElementById("min").value;
					if(isNaN(this.min)){	
						alert("Min is not a number, check input");
						document.getElementById("min").focus();
						}
					//fetch value of maximum which is upper bound in partitioning grades.(may not be the large value in graph)
					this.max=document.getElementById("max").value;
					if(isNaN(this.max)){
						alert("Max is not a number, check input");
						document.getElementById("max").focus();
						}
					//fetch number of grades to partition 	
					this.gradeCount=document.getElementById("gradeCount").value;
					if(isNaN(this.gradeCount)){
						alert("Number of Grades should be a number. Check input");
						document.getElementById("gradeCount").focus();
						}
					//fetch resolution which would be the minimum unit in x-axis
					this.resolution=parseFloat(document.getElementById("resolution").value);
					if(isNaN(this.min)){
						alert("Resolution should be a numbercheck input");
						document.getElementById("resolution").focus();
						}
					//fetch labels and credits from user........................
					this.gradeLabels=[];
					this.gradeCredits=[]
					for(var i=this.gradeCount;i>=0;i--){
							var lId="g"+(parseInt(i)+1)+"L";
							var vId="g"+(parseInt(i)+1)+"V";
							console.log("picking credit value from id : "+vId);
							this.gradeCredits[i]=document.getElementById(vId).value;
							console.log("picking label from id : "+lId);
							this.gradeLabels[i]=document.getElementById(lId).value;
							console.log(	this.gradeLabels[i]   );			
						}

					//validation of all inputs and report to user the same......
					//check once for any non validated variables before confirming	
					if(isNaN(this.min) || isNaN(this.max) || isNaN(this.gradeCount) || isNaN(this.resolution))
						{
						console.log("Inputs are not completely validated.");
						this.hasData=0;
							}
						this.hasData=1;
						
						
					console.log("Min is set to "+this.min+"\n Max is "+this.max+"\n Grade count=="+this.gradeCount);
					console.log("Grade Labels are "+this.gradeLabels+"\nGrade Credits: "+this.gradeCredits);
			}
		},
	 
	 
	  setData:function(){
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
			document.getElementById("dataCount").innerHTML=this.Data.length;
		}
	 }
}

var obj=new MyInstance();



