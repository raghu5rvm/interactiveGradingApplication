/**********************************************************************
 * 						global variables  								
 * ********************************************************************/
var Data=[];
var maximumDataValue;
var myChart;

var min;
var max;
var gradeCount;
var gradeLabels=[];

var myAnnotationsFixed=[];
var myAnnotationsMovable=[];
	

tab1();
/***********************************************************************
 * 						Tab 1 functions											
 * *********************************************************************/

function tab1(){
	console.log("inside tab1 function");
	document.getElementById("divInput").style.display="block";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="none";
	
	}


function getData(event){
//	event=document.getElementById("tabInput");
	if(event.value!=null && event.value!=""){
	var tempData;
	event=event || window.event;
	console.log("go to school");
	tempData=event.value;
	tempData=tempData.split('\n');
	//event.value="";
	for(var i=0;i<tempData.length;i++){
		tempData[i]=parseInt(tempData[i]);//.split('\t');
		if(tempData[i]==NaN)
			i--;
		}
	tempData.pop();
/*	for(var i=0;i<tempData.length-1;i++){
		console.log("inside for loop");
		for(var j=0;j<tempData[i].length;j++){
			tempData[i][j]=parseInt(tempData[i][j]);
			if(isNaN(tempData[i][j])){	
				tempData=null;
				alert("enter only marks which are integers");
				return;
				}
			}
		}*/
	console.log("i'm after validation with data :"+tempData);
	Data=tempData;
	var total=0,
		average=0;
	for(var i=0;i<Data.length;i++)
		for(var j=0;j<Data[i].length;j++)
			total+=Data[i][j];
		
		average=total/Data.length;
		document.getElementById("avgMarks").innerHTML=average.toFixed(3);
		document.getElementById("dataCount").innerHTML=Data.length;
		
	}
}


function confirmData(){
	var k=document.getElementById("dataField");
	getData(k);
	min=document.getElementById("min").value;
	max=document.getElementById("max").value;
	gradeCount=document.getElementById("gradeCount").value;
	if(isNaN(min) || isNaN(max) || isNaN(gradeCount)){
		alert("input only numbers");
		min=null;
		max=null
		gradeCount=null;
		}
	else {
		gradeLabels=[];
		for(var i=0;i<gradeCount;i++){
				var id="g"+(i+1)+"L";
				console.log("picking label from id : "+id);
				gradeLabels[i]=document.getElementById(id).value;
				gradeLabels.reverse();
				console.log(	gradeLabels[i]   );			
			}
		}
	console.log("min is now "+min+" and max is "+max+" grade count=="+gradeCount);
	drawChart();
	}




/***********************************************************************
 * 							Tab 2 functions								
 * ********************************************************************/

function tab2(){
	
	console.log("inside tab2 function");
	//hide all other tabs
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="block";
	document.getElementById("divExport").style.display="none";
}
function drawChart(){	
//	validateTab1();
	console.log("inside draw functin");
	var ctx = document.getElementById("myChart").getContext("2d");
	ctx.canvas.width = window.innerWidth*0.9;
	ctx.canvas.height = window.innerHeight*0.8;
	var labels=[];
	var bgColors=[];
	var brdColors=[];
	for(var i=0;i<Data.length;i++){
		labels[i]=i;
		bgColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		brdColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		}	
	for(var i=0;i<(gradeCount);i++){
		myAnnotationsFixed[i]=makeAnnotation((Math.floor((max-min)*(i+1)/gradeCount)),gradeLabels[i],false);
	}
	for(var i=0;i<(gradeCount);i++){
		myAnnotationsMovable[i]=makeAnnotation((Math.floor((max-min)*(i+1)/gradeCount)),gradeLabels[i],true);
	}
	
	var myAnnotations=[];
	
	myAnnotations=myAnnotationsFixed.concat(myAnnotationsMovable);
	
	console.log("my annotations are: "+myAnnotations);
		
	console.log("Labels: "+labels+" \nData: "+Data+" \nBackgrounds"+bgColors+"\nBorders "+brdColors);
		
    myChart = new Chart(ctx, {
				type:"bar",
				data:  {
					labels: labels,
					datasets: [{
						label: '# of Votes',
						data:Data,
						backgroundColor:bgColors,
						borderColor: brdColors,
						borderWidth: 1
					}]
				},
				options: {     responsive:false,
							   title: {        display: true,        text: 'Sample model'    },
							  scales: {       xAxes: [{position: 'bottom',gridLines: {zeroLineColor: "rgba(0,255,0,1)"},scaleLabel: {display: true,labelString: 'x axis' }      }],        
											  yAxes: [{position: 'left',gridLines: {zeroLineColor: "rgba(0,255,0,1)"}, scaleLabel: {display: true,labelString: 'y axis'} 		}]    } ,	
						  annotation: {
										events: ['click'],
										annotations:myAnnotations
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
							min: 0.5
						}
					} 
                }
					
            });
}


function makeAnnotation(val,text,dragFlag){
var annot;
return  annot = {
		type: 'line',
		mode: 'vertical',
		scaleID: 'x-axis-0',
		value: val,
		borderWidth: 5,
		label: {
			enabled: true,
			content: text
				},
		draggable: dragFlag,
		onDragStart: function(e) {
			console.log(e.type, e.subject.config.value);
				},
		onDrag: function(e) {
			console.log("\ndragging .......\n");
				},
		onDragEnd: function(e) {
			console.log(e.type, e.subject.config.value);
				},
		onClick: function(e) {
			console.log(e.type, this);
				}
			}	
	}





/**********************************************************************
 * 							tab 3 function 
 * ********************************************************************/

function tab3(){
	console.log("inside tab3 function");	
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="block";
	var freqDist=freq_dist(Data,100);
	var grade_values_movable=[],
		grade_values_fixed=[];
	for(var i=0;i<myAnnotationsMovable.length;i++){
			grade_values_movable[i]=myAnnotationsMovable[i].value;
			grade_values_fixed[i]=myAnnotationsFixed[i].value;
		}
	var grade_distribution_dynamic=grade_partition(freqDist,grade_values_movable,100);
	var grade_distribution_static=grade_partition(freqDist,grade_values_fixed,100);

	var uList=	document.getElementById("stats").children;
	//alert(uList.length);
	uList[0].innerHTML=gradeLabels;

	grade_values_fixed=grade_values_fixed.slice(0,-1);
	grade_values_movable=grade_values_movable.slice(0,-1);
	grade_values_fixed=grade_values_fixed.slice(1);
	grade_values_movable=grade_values_movable.slice(1);
	
/*	
	grade_distribution_static=grade_distribution_static.slice(0,-1);
	grade_distribution_dynamic=grade_distribution_dynamic.slice(0,-1);
	grade_distribution_static=grade_distribution_static.slice(1);
	grade_distribution_dynamic=grade_distribution_dynamic.slice(1);
*/	
	
	uList[1].innerHTML=grade_values_fixed;
	uList[2].innerHTML=grade_values_movable;

	uList[3].innerHTML=grade_distribution_static;
	uList[4].innerHTML=grade_distribution_dynamic;

	uList[5].innerHTML=getAverageGPA(grade_distribution_dynamic);
	uList[6].innerHTML=getAverageGPA(grade_distribution_static);
		
	}


function getAverageGPA(grade_dist){
	console.log("inside get averagae gpa");
	var student_count=0,
		wsum=0;
	var weight=11-grade_dist.length;
	console.log("weight is now "+weight);
	for(var i=0;i<grade_dist.length;i++){
		console.log("weight is now "+weight);
		student_count+=grade_dist[i];
		console.log("student count is now "+student_count);
		wsum+=weight*grade_dist[i];
		console.log("weighted sum is now "+wsum);
		weight++;
		}
		return (wsum/student_count).toFixed(3);	
	}
