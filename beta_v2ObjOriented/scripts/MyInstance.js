function MyInstance(){
	
	/*******************************************************************
	 * 						Data members								
	 * ****************************************************************/
	 //user inputs......................................................
	this.Data=[];
	this.resolution;
	this.gradeMode="iitbDefault";
	
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
	this.gradeFrequencyDynamic=[];
	this.gradeFrequencyStatic=[];

}	
/*******************************************************************************************************************************************
 * 																	
 * 																Methods
 * 										
 *******************************************************************************************************************************************/
	 
	 /**************************************************************************************************************************************
	  * 														Tab1 Methods								
	  * ***********************************************************************************************************************************/
MyInstance.prototype={
	constructor:MyInstance,
	
	
	//confirm input data by user and set variables to new values........
	
	 confirmData:function (){
		 
		 this.setData();
		 if(this.Data.length>0){
		 	//clear any existing chart..................................
		 	if(obj.myChart!=null){
						obj.myChart.destroy();
						obj.myChart=null;
						}
			this.gradeMode=document.getElementById('gradeModeSelector').value;
		 //confirm variables of iitb default mode.......................
			if(this.gradeMode=="iitbDefault"){
				
				//......dd[=rValue*0.4].....|.....cd.....|.....cc.....|......bc.......|......bb......|......ab....|......aa......|rValue|......ap.....
				this.refValue=parseFloat(document.getElementById('iitbDefaultRefValue').value);
				this.max=parseFloat(document.getElementById("max").value);
				this.min=parseFloat(document.getElementById("min").value);
				this.gradeCount=9;
				this.gradeLabels=["F","DD","CD","CC","BC","BB","AB","AA","AP"];
				this.gradeCredits=[0,3,4,5,6,7,8,9,10];			
				var delta=(this.refValue-(this.refValue*0.4))/7;
				this.gradeValuesFixed=[];
				this.gradeValuesMovable=[];
				

				//calculate bounds.......................
				for(var i=0;i<gradeCount;i++){
					this.gradeValuesFixed[i]=(this.refValue*0.4)+(i*delta);
					this.gradeValuesMovable[i]=(this.refValue*0.4)+(i*delta);
					}			
				this.hasData=1;
				}

				
			//confirm variables of absolute mode ...........................
			else if(this.gradeMode=="iitbAbsolute"){
				this.gradeCount=8;
				this.gradeLabels=["F","DD","CD","CC","BC","BB","AB","AA","AP"];
				this.gradeCredits=[0,3,4,5,6,7,8,9,10];			
				this.gradeValuesFixed=[40,50,60,70,80,90,100];
				this.gradeValuesMovable=[40,50,60,70,80,90,100];
				this.hasData=1;
				
				}


				
			//confirm variables of custom mode..............................
			else if(this.gradeMode=="custom"){
					 
				
						
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
	 },
	 
	 
	 /*************************************************************************************************************************************
	  * 														Tab2 methods 								
	  * ***********************************************************************************************************************************/
	  
		plotData:function() {
	  		console.log("Plotting user data");
			var ctx = document.getElementById("myChart").getContext("2d");
				//set height and width of canvas........................
				ctx.canvas.width = window.innerWidth*0.9;
				ctx.canvas.height = window.innerHeight*0.8;

			var labels=[];
			var bgColors=[];
			var brdColors=[];
				
			for(var i=0;i<this.Data.length;i++){
				labels[i]=i;
				bgColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
				brdColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
				}
				
			//make annotations which are static and label them...	
			for(var i=0;i<(this.gradeCount-1);i++){
				this.myAnnotationsFixed[i]=this.makeAnnotation((Math.floor((this.max-this.min)*(i+1)/this.gradeCount)),this.gradeLabels[i],false,"#008000",5,i);
			}
			
			//make annotations which are dynamic and label them...
			for(var i=0;i<(this.gradeCount-1);i++){
				this.myAnnotationsMovable[i]=this.makeAnnotation((Math.floor((this.max-this.min)*(i+1)/this.gradeCount)),this.gradeLabels[i],true,"#F15454",7,i);
			}

			this.myAnnotations=this.myAnnotationsFixed.concat(this.myAnnotationsMovable);
				
			console.log("Labels: "+labels+" \n\nData: "+this.Data+" \n\nBackgrounds"+bgColors+"\n\nBorders "+brdColors);
				
			this.myChart = new Chart(ctx, {
						type:"bar",
						//scaleOverride : true,
						//scaleSteps : 10,
						data:  {
							labels: labels,
							datasets: [{
								label: 	'Frequency.',
								data:	this.Data,
								backgroundColor:	bgColors,
								borderColor:	brdColors,
								borderWidth:	1
							}]
						},
						options: {     responsive:false,
									   title: {        display: true,        text: 'Interactive Grading application'    },
									  scales: {       xAxes: [{suggestedMin: 0.5,position: 'bottom',gridLines: {zeroLineColor: "rgba(0,255,0,1)"},scaleLabel: {display: true,labelString: 'Marks' },ticks:{	stepSize:0.5}     }],        
													  yAxes: [{position: 'left',gridLines: {zeroLineColor: "rgba(0,255,0,1)"}, scaleLabel: {display: true,labelString: 'Frequency'} 		}]    } ,	
								  annotation: {
												events: ['click'],
												annotations:this.myAnnotations
											},
							pan: {
								enabled: true,
								mode: 'x'
							},
							zoom: { 
								enabled: true,
								mode: 'x',
								limits: {
									max: 5,
									min: 0.25
								}
							} 
						}
							
					});	
			this.gradeValuesFixed=[];
			this.gradeValuesMovable=[];
			for(var i=0;i<this.myAnnotationsMovable.length;i++){
				this.gradeValuesMovable[i]=this.myAnnotationsMovable[i].value;
				this.gradeValuesFixed[i]=this.myAnnotationsFixed[i].value;						
			}


				  },
				  
			
			
		 makeAnnotation:function (val,text,dragFlag,brdrColor,brdrWidth,index){
					console.log("inside make annot. vla:"+val+" text:"+text+" dragFlag:"+dragFlag+" index:"+index) 
					var annot;
					if(brdrColor==null)
						brdrColor='#'+Math.floor(Math.random()*16777215).toString(16);
					if(brdrWidth==null)
						brdrWidth=Math.ceil(Math.random()*5);
					if(dragFlag==true)
						text="\u22B2"+text+"\u22B3";
					return  annot = {
							pos:index,
							type: 'line',
							mode: 'vertical',
							scaleID: 'x-axis-0',
							value: val,
							borderColor:brdrColor,
							borderWidth: brdrWidth,
							label: {
								enabled: true,
								content: text,
									},
							draggable: dragFlag,
							
							onDragStart: function(e) {
								console.log(e.type, e.subject.config.value);
									},
							
							onDrag: function(e) {
									},
							
							onDragEnd: function(e) {
								console.log(e.type, e.subject.config.value);
								//recompute statistics and position after drag end
								//begin validating drag movement........
								obj.getStats();	
								obj.validateBarMovement(e);
								obj.myChart.update();
								
								//end of validate drag......................		

								},
							onClick: function(e) {
									console.log("clicked on annotation!!! Nothing to do");
									}
								}	
						},

					fun1:function(){
						alert("this works");
						},

					validateBarMovement:function(bar){
								console.log(bar);
								var cPos,cPosRight,cPosLeft;
								var index=bar.subject.config.pos;
								console.log(index);
								//for begining
									if(index==0){
										cPosRight=parseInt(this.gradeValuesMovable[index+1]);
										cPosLeft=-Infinity;
										}
									else if(index==(this.gradeValuesMovable.length-1)) {
										cPosRight=Infinity;
										cPosLeft=parseInt(this.gradeValuesMovable[index-1]);
										}
									else {
										cPosRight=parseInt(this.gradeValuesMovable[index+1]);
										cPosLeft=parseInt(this.gradeValuesMovable[index-1]);
										}
									var cPos=parseInt(this.gradeValuesMovable[index]);
									console.log("setting curr pos to "+cPos+" where cleft is "+cPosLeft+" and cright is "+cPosRight);	
									if(cPos>=cPosRight){
										cPos=cPosRight-obj.resolution;
										bar.subject.config.value=cPos;
										console.log("cPos=cRight+resolution ==="+(cPosRight)+"-"+(this.resolution)+"===>"+(cPos));				
										}
									else if(cPos<=cPosLeft){
										cPos=cPosLeft+obj.resolution;	
										console.log("cPos=cLeft+resolution ==="+cPosLeft+"+"+this.resolution+"===>"+cPos);				
										bar.subject.config.value=cPos;
										}
						
						},

						
						
	 
	/***************************************************************************************************************************************
	* 							
	* 															Tab3 methods
	* 	
	* *************************************************************************************************************************************/
	
		getStats:function (){
			this.gradeValuesFixed=[];
			this.gradeValuesMovable=[];
			for(var i=0;i<this.myAnnotationsMovable.length;i++){
				this.gradeValuesMovable[i]=this.myAnnotationsMovable[i].value;
				this.gradeValuesFixed[i]=this.myAnnotationsFixed[i].value;						
			}
			//Get frequency distibution of students in each partition of grade...............
			this.gradeFrequencyDynamic=this.getGradeFrequency(this.gradeValuesMovable);
			this.gradeFrequencyStatic=this.getGradeFrequency(this.gradeValuesFixed);
			console.log("Dynamic Grade Bounds: "+this.gradeFrequencyDynamic);
			console.log("Static Grade Bounds: "+this.gradeFrequencyStatic);
			console.log("Static values movable: "+this.gradeValuesMovable);
			console.log("Static values fixed: "+this.gradeValuesFixed);
			
		},
		
		
		
		getAverageGPA:function (gradeDist){
			console.log("calculating averagae GPA");
			var student_count=0,
				wsum=0;
			for(var i=0;i<gradeDist.length;i++){
				console.log("weight is now "+gradeCredits[i]);
				student_count+=gradeDist[i];
				console.log("student count is now "+student_count);
				wsum+=gradeCredits[i]*gradeDist[i];
				console.log("weighted sum is now "+wsum);
				}
			return (wsum/student_count).toFixed(3);
			console.log((wsum/student_count).toFixed(3));
		},


		
		showStats:function (){
			
			
			//Place data in table.......................................
			var tableRows=document.getElementsByClassName("statsTableRows");
			console.log("Number of table rows are "+tableRows.length);
			console.log("Grade labels is "+this.gradeLabels);

			this.gradeValuesFixed.unshift(-Infinity);
			this.gradeValuesFixed[this.gradeValuesFixed.length]=Infinity;
			
			this.gradeValuesMovable.unshift(-Infinity);
			this.gradeValuesMovable[this.gradeValuesMovable.length]=Infinity

			for(var i=0;i<this.gradeCount;i++){
				var tableRow=tableRows[i].children;
				console.log(tableRow);
				console.log("this row is having "+tableRow.length+" no of td");
				
				tableRow[0].innerHTML=(this.gradeLabels[i]);
				tableRow[1].innerHTML=(this.gradeCredits[i]);
				tableRow[2].innerHTML=(this.gradeValuesFixed[i]);
				tableRow[3].innerHTML=(this.gradeValuesFixed[i+1]-1);
				tableRow[4].innerHTML=(this.gradeFrequencyStatic[i]);
				tableRow[5].innerHTML=(this.gradeValuesMovable[i]);
				tableRow[6].innerHTML=(this.gradeValuesMovable[i+1]-1);
				tableRow[7].innerHTML=(this.gradeFrequencyDynamic[i]);		
				}
			for(var i=this.gradeCount;i<tableRows.length;i++){
				tableRows[i].style.display="none";
				}
				
			},
			


		getGradeFrequency:function (positions){
			  var result=[];
			  var min=-Infinity;
			  var dataSet=this.Data.slice();
			  dataSet.sort();
			  var index=0;
			  var cumSum=0;
			  for(var i=0;i<positions.length;i++){
				var maxLimit=positions[i];
				var sum=0;
				for(var j=index;j<dataSet.length;j++){
				  if(dataSet[j]<maxLimit  && dataSet[j]>=min){
					sum++;
					cumSum++;
				  }
				  else{
					break;
				  }
				}
					min=positions[i];
					index=index+sum;
				//console.log(Data);
				result.push(sum);
			  }
			  result.push(dataSet.length-cumSum);
			  return result;
			},
			    
		exportData:function(){
			  var a = document.getElementById("a");
			  var file = new Blob([this.Data], {type: 'text/plain'});
			  a.href = URL.createObjectURL(file);
			  a.download = Date()+"GradeData.txt";
			  a.click();
			
			}


}

