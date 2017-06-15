
/***********************************************************************
 * 							Tab 2 functions								
 * ********************************************************************/

function tab2(){
	
	console.log("inside tab2 function");
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="block";
	document.getElementById("divExport").style.display="none";
	if(myChart==null)
		drawChart();
	else
		myChart.update();
}


function drawChart(){	
	console.log("inside draw functin");
	var ctx = document.getElementById("myChart").getContext("2d");
	var labels=[];
	var bgColors=[];
	var brdColors=[];
		ctx.canvas.width = window.innerWidth*0.9;
		ctx.canvas.height = window.innerHeight*0.8;
		
		
	for(var i=0;i<Data.length;i++){
		labels[i]=i;
		bgColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		brdColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
		}	
	for(var i=0;i<(gradeCount);i++){
		myAnnotationsFixed[i]=makeAnnotation((Math.floor((max-min)*(i+1)/gradeCount)),gradeLabels[i],false,"#008000",5,i);
	}
	for(var i=0;i<(gradeCount);i++){
		myAnnotationsMovable[i]=makeAnnotation((Math.floor((max-min)*(i+1)/gradeCount)),gradeLabels[i],true,"#F15454",7,i);
	}

	
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
							max: 5,
							min: 0.25
						}
					} 
                }
					
            });
}


function makeAnnotation(val,text,dragFlag,brdrColor,brdrWidth,index){
var annot;
if(brdrColor==null)
	brdrColor='#'+Math.floor(Math.random()*16777215).toString(16);
if(brdrWidth==null)
	brdrWidth=5;
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
			validateDrag(e);
			console.log(e.type, e.subject.config.value);
				},
		onClick: function(e) {
			
				}
			}	
	}


function validateDrag(bar){
	stats();
	console.log(bar);
	var index=bar.subject.config.pos;
	console.log(index);
	//for begining
	if(index==0){
		cPosRight=parseInt(grade_values_movable[index+1]);
		cPosLeft=Infinity;
		}
	else if(index==(grade_values_movable.length-1)) {
		cPosRight=Infinity;
		cPosLeft=parseInt(grade_values_movable[index-1]);
		}
	else {
		cPosRight=parseInt(grade_values_movable[index+1]);
		cPosLeft=parseInt(grade_values_movable[index-1]);
		}
	var cPos=parseInt(grade_values_movable[index]);
	console.log("setting curr pos to "+cPos+" where cleft is "+cPosLeft+" and cright is "+cPosRight);
		
	if(cPos>=cPosRight){
		cPos=cPosRight-resolution;
		bar.subject.config.value=cPos;
		console.log("cPos=cRight+resolution ==="+(cPosRight)+"-"+(resolution)+"===>"+(cPos));				

		}
	else if(cPos<=cPosLeft){
		cPos=cPosLeft+resolution;	
		console.log("cPos=cLeft+resolution ==="+cPosLeft+"+"+resolution+"===>"+cPos);				
		bar.subject.config.value=cPos;
	}
//	console.log(bar);
	test=bar;
	myChart.update();	
	
}

