function MyInstance(){
	
	/*******************************************************************
	 * 						Data members								
	 * ****************************************************************/
	 //user inputs......................................................
	this.Data=[];
	this.dataFrequency=[];
	this.resolution;
	this.maxPossible=120;
	this.gradeMode="iitbAbsolute";
	
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
	this.yMax;
	this.average;
	this.myChart=null;
	this.myAnnotationsFixed=[];
	this.myAnnotationsMovable=[];
	this.myAnnotations=[];
	this.gradeValuesMovable=[];
	this.gradeValuesFixed=[];
	this.gradeFrequencyDynamic=[];
	this.gradeFrequencyStatic=[];
	
	this.pie1=null;
	this.pie2=null;

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
		 console.log("inside confirm data");
		 this.setData();
		 if(this.Data.length>0){
		 	//clear any existing chart..................................
		 	if(this.myChart!=null){
						this.myChart.destroy();
						this.myChart=null;
						alert("chart destroyed");
						}
			this.gradeMode=document.getElementById('gradingModel').value;
			console.log("grade mode is now " + this.gradeMode);
			this.resolution=parseFloat(document.getElementById("resolution").value);
						if(isNaN(this.resolution)){
							alert("Resolution should be a numbercheck input");
							document.getElementById("resolution").focus();
							}
				
		 //confirm variables of iitb default mode.......................
			
			if(this.gradeMode == "iitbDefault"){				
				console.log("control is in confirm data iitbDefault mode");
				//......dd[=rValue*0.4].....|.....cd.....|.....cc.....|......bc.......|......bb......|......ab....|......aa......|rValue|......ap.....
				this.refValue=parseFloat(document.getElementById('iitbDefaultRefValue').value);
				console.log("reference value is "+this.refValue);
				this.max=parseFloat(document.getElementById("max").value);
				this.min=parseFloat(document.getElementById("min").value);
				this.gradeCount=9;
				this.gradeLabels=["FF","DD","CD","CC","BC","BB","AB","AA","AP"];
				this.gradeCredits=[0,4,5,6,7,8,9,10,10];			
				var delta=(this.refValue-(this.refValue*0.4))/7;
				var least=(this.refValue*0.4);
				console.log("grade count = "+this.gradeCount+" ref value= "+this.refValue+" delta "+ delta+" least = "+least );
				this.gradeValuesFixed=[];
				this.gradeValuesMovable=[];
				

				//calculate bounds.......................
				for(var i=0;i<this.gradeCount;i++){
					this.gradeValuesFixed[i]=Math.floor(least+(i*delta));
					this.gradeValuesMovable[i]=Math.floor(least+(i*delta));
					}
				
				console.log(" grade values from calculation is "+this.gradeValuesFixed);			
				this.hasData=1;
				}
			//end of iitb default mode code
				
			//confirm variables of absolute mode ...........................
			else if(this.gradeMode=="iitbAbsolute"){
				console.log("control is in confirm data iitbAbsolute mode");
				this.gradeCount=9;
				this.gradeLabels=["FF","DD","CD","CC","BC","BB","AB","AA","AP"];
				this.gradeCredits=[0,4,5,6,7,8,9,10,10];			
				this.gradeValuesFixed=[30,40,50,60,70,80,90,100];
				this.gradeValuesMovable=[30,40,50,60,70,80,90,100];
				this.hasData=1;
				
				}
			//end of iitb absolute mode code...................................

				
			//confirm variables of custom mode..............................
			else if(this.gradeMode=="custom"){
					 				
						console.log("control is in confirm data custom mode");
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
						//fetch labels and credits from user........................
						this.gradeLabels=[];
						this.gradeCredits=[];
						console.log("grade count is "+this.gradeCount);
						for(var i=0;i<this.gradeCount;i++){
								var lId="g"+(parseInt(i)+1)+"L";
								var vId="g"+(parseInt(i)+1)+"V";
								console.log("picking credit value from id : "+vId);
								this.gradeCredits[i]=document.getElementById(vId).value;
								console.log("picking label from id : "+lId);
								this.gradeLabels[i]=document.getElementById(lId).value;
								console.log(	this.gradeLabels[i]   );			
							}	
						this.gradeCredits.unshift(0);
						this.gradeLabels.unshift("F");
						
						//clear grade bound lists before computing.................................
						this.gradeValuesMovable=[];
						this.gradeValuesFixed=[];
						var delta=( (this.max-this.min) / this.gradeCount );
						for(var i=0;i<this.gradeCount;i++){
								this.gradeValuesMovable[i]=Math.round(this.min+(delta*(i+1)));
								this.gradeValuesFixed[i]=Math.round(this.min+(delta*(i+1)));
							}
						
						console.log("grade values are "+this.gradeValuesFixed+" delta is "+ delta);
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
			//end of custom mode code....................................
				else if(this.gradeMode=="custom2"){
					 
						console.log("control is in confirm data custom2 mode");
						//fetch number of grades to partition 	
						this.gradeCount=document.getElementById("c2gradeCount").value;
						if(isNaN(this.c2gradeCount)){
							alert("Number of Grades should be a number. Check input");
							document.getElementById("c2gradeCount").focus();
							}
						//fetch resolution which would be the minimum unit in x-axis
						//fetch labels and credits from user........................
						this.gradeLabels=[];
						this.gradeCredits=[];
						this.gradeValuesMovable=[];
						this.gradeValuesFixed=[];
						for(var i=0;i<this.c2gradeCount;i++){
								var lId="c2g"+(parseInt(i)+1)+"L";
								var vId="c2g"+(parseInt(i)+1)+"V";
								var bId="c2g"+(parseInt(i)+1)+"B";
								console.log("picking from (g/c/b)-id : "+vId);
								this.gradeCredits[i]=document.getElementById(vId).value;
								this.gradeLabels[i]=document.getElementById(lId).value;
								this.gradeValuesMovable[i]=document.getElementById(bId).value;
								this.gradeValuesFixed[i]=document.getElementById(bId).value;
							}	
						this.gradeCredits.unshift(0);
						this.gradeLabels.unshift("F");
												
						//validation of all inputs and report to user the same......
						//check once for any non validated variables before confirming	
						if( isNaN(this.c2gradeCount) || isNaN(this.resolution))
							{
							console.log("Inputs are not completely validated.");
							this.hasData=0;
								}
							this.hasData=1;
							
							
						console.log("Grade Labels are "+this.gradeLabels+"\nGrade Credits: "+this.gradeCredits);
				}
				}
		
		},
	 /*******************************************************************
	  * 						end of confirm data method
	  * ****************************************************************/
	 
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
	 //end of method sed data...........................................
	 
	 /*************************************************************************************************************************************
	  * 														Tab2 methods 								
	  * ***********************************************************************************************************************************/
	  
		plotData:function() {
	  		console.log("Plotting user data");
			var ctx = document.getElementById("myChart").getContext("2d");
				//set height and width of canvas........................
				ctx.canvas.width = window.innerWidth*0.9;
				ctx.canvas.height = window.innerHeight*0.8;
				ctx.canvas.parentNode.style.width = window.innerWidth*0.9;
				ctx.canvas.parentNode.style.height = window.innerHeight*0.5;



			var labels=[];
			var bgColors=[];
			var brdColors=[];
			//create labels based on resolution and max value on x......	
			for(var i=0,j=0;i<this.maxPossible;j=j+1,i=i+this.resolution){
				labels[j]=parseFloat(i).toFixed(2);
				bgColors[j]='#'+Math.floor(Math.random()*16777215).toString(16);
				brdColors[j]='#'+Math.floor(Math.random()*16777215).toString(16);
				}
			
			var arrangedData=this.Data.slice();
			arrangedData.sort();
			console.log("arranged Data :"+arrangedData+"\n labels are:"+labels);
			this.dataFrequency=[];
			for(var i=0,j=0;i<this.maxPossible;i=i+this.resolution,j=j+1)
				this.dataFrequency[j]=0;
			console.log("this is freq:"+this.dataFrequency);
			this.yMax=0;
			var nearMax=this.resolution/2;
			nearMax=nearMax.toFixed(2);
			var i=0,
				j=0;
			while(i<arrangedData.length){
					console.log("labes.length="+labels.length+"i="+i+" j="+j+" arrangedData[i]="+arrangedData[i]+" nearMax="+nearMax+" labels[j]="+labels[j]+"if in "+(parseFloat(arrangedData[i])<(parseFloat(labels[j])+parseFloat(nearMax)))+"sum is "+(labels[j]+nearMax));
					if(parseFloat(arrangedData[i])<(parseFloat(labels[j])+parseFloat(nearMax))){
						this.dataFrequency[j]++
						if(this.dataFrequency[j]>this.yMax)
							this.yMax=this.dataFrequency[j];
						i++
						}
					else
						j++;
						
				}
			
			
			
			
			
			
			//make annotations which are static and label them...	
			console.log(""+this.gradeValuesFixed)
			this.myAnnotationsFixed=[];
			this.myAnnotationsMovable=[];
			for(var i=0;i<(this.gradeCount-1);i++) {
				this.myAnnotationsFixed[i]=this.makeAnnotation(this.gradeValuesFixed[i].toFixed(2),this.gradeLabels[i+1],false,"#008000",5,i);
			}
			
			//make annotations which are dynamic and label them...
			for(var i=0;i<(this.gradeCount-1);i++) {
				this.myAnnotationsMovable[i]=this.makeAnnotation(this.gradeValuesMovable[i].toFixed(2),this.gradeLabels[i+1],true,"#F15454",7,i);
			}

			this.myAnnotations=this.myAnnotationsFixed.concat(this.myAnnotationsMovable);
				
			console.log("Data: "+this.dataFrequency+" \n\nBackgrounds"+bgColors+"\n\nBorders "+brdColors);
				
			this.myChart = new Chart(ctx, {
						type:"line",
						data:  {
							labels: labels,
							datasets: [{
								fill:'origin',
								label: 	'Frequency.',
								data:	this.dataFrequency,
								backgroundColor:	'#90EE90',
								//borderColor:	brdColors,
								borderWidth:	1,
								//cubicInterpolationMode:'monotone'
								lineTension:0.5
							}]
						},
						options: {     responsive:false,
									   title: {        display: true,        text: 'Interactive Grading application'    },
									  scales: {       xAxes: [{suggestedMax: this.maxData+10,position: 'bottom',gridLines: {zeroLineColor: "rgba(0,255,0,1)"},scaleLabel: {display: true,labelString: 'Marks' }     }],        
													  yAxes: [{suggestedMax: this.yMax+5,position: 'left',gridLines: {zeroLineColor: "rgba(0,255,0,1)"}, scaleLabel: {display: true,labelString: 'Frequency'},ticks: { beginAtZero:true, min: 0, max:this.yMax+2 } 		}]    } ,	
								  annotation: {
												events: ['drag'],
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
									max: 10,
									min: 0.25
								}
							} 
						}
							
					});	
			


				  },
				  /*****************************************************
				   * 				end of method plot
				   * ****************************************************/
					validateBarMovement:function(bar){
								console.log(bar);
								var cPos,cPosRight,cPosLeft;
								var index=bar.subject.config.pos;
								console.log(index);
								//for begining
									if(index==0){
										cPosRight=parseInt(this.gradeValuesMovable[index+1]).toFixed(2);
										cPosLeft=-Infinity;
										}
									else if(index==(this.gradeValuesMovable.length-1)) {
										cPosRight=Infinity;
										cPosLeft=parseInt(this.gradeValuesMovable[index-1]).toFixed(2);
										}
									else {
										cPosRight=parseInt(this.gradeValuesMovable[index+1]).toFixed(2);
										cPosLeft=parseInt(this.gradeValuesMovable[index-1]).toFixed(2);
										}
									var cPos=parseInt(this.gradeValuesMovable[index]);
									console.log("setting curr pos to "+cPos+" where cleft is "+cPosLeft+" and cright is "+cPosRight);	
									if(cPos>=cPosRight){
										cPos=cPosRight-this.resolution.toFixed(2);
										bar.subject.config.value=cPos.toString();
										console.log("cPos=cRight+resolution ==="+(cPosRight)+"-"+(this.resolution)+"===>"+(cPos));				
										}
									else if(cPos<=cPosLeft){
										cPos=cPosLeft+this.resolution.toFixed(2);	
										console.log("cPos=cLeft+resolution ==="+cPosLeft+"+"+this.resolution+"===>"+cPos);				
										bar.subject.config.value=cPos.toString();
										}
						
						},
					/****************************************************
					 * 						end of validate method
					 * **************************************************/
		
			
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
								console.log(e.type,e, e.subject.config.value);
								alert("left bar at "+ e.subject.config.value);
								//recompute statistics and position after drag end
								//begin validating drag movement........
								obj.getStats();	
								obj.validateBarMovement(e);
								obj.myChart.update();
								console.log("chart updated");
								//end of validate drag......................		

								},
							onClick: function(e) {
									console.log("clicked on annotation!!! Nothing to do");
									}
								}	
						},
				/*******************************************************
				 * 					end of method make annotation
				 * *****************************************************/
				
	 
	/***************************************************************************************************************************************
	* 							
	* 															Tab3 methods
	* 	
	* *************************************************************************************************************************************/
	
		getStats:function (){
			console.log("calling get statistics function with grade values fixed = "+ this.gradeValuesFixed);
			this.gradeValuesMovable=[];
			for(var i=0;i<this.myAnnotationsMovable.length;i++){
				this.gradeValuesMovable[i]=parseFloat(this.myAnnotationsMovable[i].value);
				this.gradeValuesMovable[i]=this.gradeValuesMovable[i].toFixed(2);
			}
			console.log(this.gradeValuesMovable);
			//Get frequency distibution of students in each partition of grade...............
			this.gradeFrequencyDynamic=this.getGradeFrequency(this.gradeValuesMovable);
			this.gradeFrequencyStatic=this.getGradeFrequency(this.gradeValuesFixed);
			console.log("Dynamic Grade Bounds: "+this.gradeFrequencyDynamic);
			console.log("Static Grade Bounds: "+this.gradeFrequencyStatic);
			console.log("Static values movable: "+this.gradeValuesMovable);
			console.log("Static values fixed: "+this.gradeValuesFixed);
			
		},
		
		


		showPieStats:function(){
			var pie1Ctx=document.getElementById("pie1").getContext("2d");
			var pie2Ctx=document.getElementById("pie2").getContext("2d");
				pie1Ctx.canvas.width = document.getElementById("pieStats").width*0.4;
				pie1Ctx.canvas.height =document.getElementById("pieStats").height*0.5;
				pie2Ctx.canvas.width = document.getElementById("pieStats").width*0.4;
				pie2Ctx.canvas.height = document.getElementById("pieStats").height*0.5;
				pie1Ctx.canvas.parentNode.style.height = '464px';
				pie2Ctx.canvas.parentNode.style.height = '464px';
				pie1Ctx.canvas.parentNode.style.width = window.innerWidth*0.45;
				pie2Ctx.canvas.parentNode.style.width = window.innerWidth*0.45;

			var bg=[];
			for(var i=0;i<this.gradeLabels.length;i++){
				bg[i]='#'+Math.floor(Math.random()*16777215).toString(16);
				}
			this.pie1 = new Chart(pie1Ctx, {
						responsive:false,
						maintainAspectRatio:false,
						type:"pie",
						data:  {
							labels: this.gradeLabels,
							datasets: [{
								data:	this.gradeFrequencyStatic,
								backgroundColor:bg
							}]
						},
						options: {
							legend:{
								position:'left'
								},
							zoom:{
								enabled:false
								}
							}
							
					});		
						
			this.pie2 = new Chart(pie2Ctx, {
						responsive:false,
						maintainAspectRatio:false,
						type:"pie",
						data:  {
							labels: this.gradeLabels,
							datasets: [{
						//		label: 	'Initial result',
								data:	this.gradeFrequencyDynamic,
								backgroundColor:bg
							}]
						},
						options: {
							legend:{
								position:'left'
								},
							zoom:{
								enabled:false
								}
							}	
					});			

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
				tableRow[3].innerHTML=(this.gradeValuesFixed[i+1]);
				tableRow[4].innerHTML=(this.gradeFrequencyStatic[i]);
				tableRow[5].innerHTML=(this.gradeValuesMovable[i]);
				tableRow[6].innerHTML=(this.gradeValuesMovable[i+1]);
				tableRow[7].innerHTML=(this.gradeFrequencyDynamic[i]);		
				}
		
			for(var i=this.gradeCount;i<tableRows.length;i++){
				tableRows[i].style.display="none";
				}
			var avgTable=document.getElementsByClassName("avgTable")[0].children;
				avgTable[3].innerHTML="Average GPA";
				avgTable[4].innerHTML=this.getAverageGPA(this.gradeFrequencyStatic);
				avgTable[6].innerHTML="New Average GPA";
				avgTable[7].innerHTML=this.getAverageGPA(this.gradeFrequencyDynamic);
			
			this.gradeValuesFixed.shift();
			this.gradeValuesFixed.pop();;
			
			this.gradeValuesMovable.shift();
			this.gradeValuesMovable.pop();
	
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
			    
					
		getAverageGPA:function (gradeDist){
			console.log(" grade dist :"+gradeDist);
			console.log("calculating averagae GPA");
			var student_count=0,
				wsum=0;
			for(var i=0;i<gradeDist.length;i++){
				console.log("weight is now "+this.gradeCredits[i]);
				student_count+=gradeDist[i];
				console.log("student count is now "+student_count);
				wsum+=this.gradeCredits[i]*gradeDist[i];
				console.log("weighted sum is now "+wsum);
				}
			
			console.log((wsum/student_count).toFixed(3));
			return (wsum/student_count).toFixed(3);
		},



		exportData:function(){
			  var a = document.getElementById("a");
			  var file = new Blob([this.Data], {type: 'text/plain'});
			  a.href = URL.createObjectURL(file);
			  a.download = Date()+"GradeData.txt";
			  a.click();
			
			}


}

