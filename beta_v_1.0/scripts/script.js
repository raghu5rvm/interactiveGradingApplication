/**********************************************************************
 * 						global variables  								
 * ********************************************************************/
var Data=[];
var maximumDataValue;
var myChart;

var min;
var max;
var gradeCount;




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
	if(event.value!=null && event.value!=""){
	var tempData;
	event=event || window.event;
	console.log("go to school");
	tempData=event.value;
	tempData=tempData.split('\n');
	event.value="";
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
	min=document.getElementById("min").value;
	max=document.getElementById("max").value;
	gradeCount=document.getElementById("gradeCount").value;
	if(isNaN(min) || isNaN(max) || isNaN(gradeCount)){
		alert("input only numbers");
		min=null;
		max=null
		gradeCount=null;
		}
	console.log("min is now "+min+" and max is "+max+" grade count=="+gradeCount);
	
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
	
//	validateTab1();
	console.log("inside draw functin");
	var ctx = document.getElementById("myChart").getContext("2d");
	var labels=[];
	var bgColors=[];
	var brdColors=[];
	var myAnnotations=[];
	var usrLabels=["A+","A","B","C","D","E","F","G","H"]
	for(var i=0;i<Data.length;i++){
		labels[i]=i;
		bgColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		brdColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		}	
	for(var i=0;i<(gradeCount-1);i++){
		myAnnotations[i]=makeAnnotation((Math.floor((max-min)*(i+1)/gradeCount)),usrLabels[i],false);
		myAnnotations[i+gradeCount]=makeAnnotation(Math.floor(((max-min)*(i+1)/gradeCount)),usrLabels[i],true);
	}
		
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
				options: {     title: {        display: true,        text: 'Sample model'    },
							  scales: {       xAxes: [{position: 'bottom',gridLines: {zeroLineColor: "rgba(0,255,0,1)"},scaleLabel: {display: true,labelString: 'x axis' }      }],        
											  yAxes: [{position: 'left',gridLines: {zeroLineColor: "rgba(0,255,0,1)"}, scaleLabel: {display: true,labelString: 'y axis'} 		}]    } ,	
						  annotation: {
										events: ['click'],
										annotations: myAnnotations
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
	

	}
