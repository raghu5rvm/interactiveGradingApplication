function Constructor(){
/***********************************************************************
 * 
 * 							Testing of graph plot 
 * 
 * *********************************************************************/

this.Data1=[5,8,3,7,3,2,7,10,5,2,5,3,8,6,4,8,8,8,6,5,7,10,6,4,1,1,9,6,5,4,3,9,2,5,6,7,8,2,9,6,5,8,9,7,1,2,10,8,5,8,3,8,2,10,9,8,2,7,8,5,8,4,6,9,6,9,1,6,0,4,8,1,7,6,4,4,2,2,8,3,1,3,3,7,7,8,9,0,5,3,10,3,8,1,8,4,6,7,5,3];
this.Data2=[2,4,6,2,1,5,4,2,1,8,0,3,7,1,4,9,3,7,7,10,5,8,3,7,1,9,7,2,3,2,8,5,4,3,4,5,4,9,8,8,7,5,4,3,0,2,8,8,1,3,7,3,9,1,8,8,10,8,8,8,8,0,1,1,6,3,6,3,3,10,2,7,8,10,7,7,5,2,6,7,2,8,4,1,8,6,7,9,1,1,4,7,8,0,7,1,7,7,5,7];
this.Data3=[7,50,84,100,28,3,76,79,70,74,61,44,20,38,42,61,19,92,5,26,70,63,8,65,75,51,52,8,14,72,40,2,83,84,29,43,83,59,69,21,45,72,93,29,91,15,57,78,11,30,20,41,15,1,47,68,97,77,36,72,48,72,49,55,88,38,29,31,14,99,75,77,73,33,32,61,41,56,33,52,55,75,38,40,14,18,8,96,97,51,42,58,72,32,15,30,67,78,95,42];
this.Data4=[35,33,49,29,57,9,26,50,31,36,17,59,38,19,42,56,27,59,60,10,26,5,51,25,57,29,45,59,34,21,28,20,15,55,56,20,17,59,17,38,23,22,25,53,59,34,17,25,56,13,52,46,27,56,25,11,49,36,5,52,33,23,21,49,34,55,36,4,23,17,53,40,44,43,24,22,11,40,48,25,32,42,31,7,15,50,17,32,42,52,5,57,21,35,8,26,33,41,31,49];
this.dataSet=[this.Data1,this.Data2,this.Data3,this.Data4]
this.data=[];
this.myChart;

this.drawNew=function(){
	if(this.myChart!=null){
		this.myChart.data.datasets.data=this.data;
		this.myChart.update();
		}
	}

this.plotData=function() {
	  		console.log("Plotting user data");
			var ctx = document.getElementById("myChart").getContext("2d");
				//set height and width of canvas........................
				ctx.canvas.width = window.innerWidth*0.9;
				ctx.canvas.height = window.innerHeight*0.8;
			
			var dataset=Math.floor(Math.random()*4);
			this.data=this.dataSet[dataset];

			if(dataset==0)
				document.getElementById("details").innerHTML=("<b>Dataset0</b><br/><br/>Maximum Marks : "+10+"<br/><br/>Data : <br/><br/>"+this.data)
			else if(dataset==1)
				document.getElementById("details").innerHTML=("<b>Dataset1</b><br/><br/>Maximum Marks : "+10+"<br/><br/>Data : "+this.data)
			else if(dataset==2)
				document.getElementById("details").innerHTML=("<b>Dataset2</b><br/><br/>Maximum Marks : "+100+"<br/><br/>Data : "+this.data)
			else if(dataset==3)
				document.getElementById("details").innerHTML=("<b>Dataset3</b><br/><br/>Maximum Marks : "+60+"<br/><br/>Data : "+this.data)

			var labels=[];
			var bgColors=[];
			var brdColors=[];
			for(var i=0;i<this.data.length;i++){
				
				labels[i]=i+1;
				bgColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
				brdColors[i]='#'+Math.floor(Math.random()*16777215).toString(16);
				
				}
				
				
			console.log("Labels: "+labels+" \n\nBackgrounds"+bgColors+"\n\nBorders "+brdColors);
				
			this.myChart = new Chart(ctx, {
						type:"bar",
						//scaleOverride : true,
						//scaleSteps : 10,
						data:  {
							labels: labels,
							datasets: [{
								label: 	'Frequency.',
								data:	this.data,
								backgroundColor:	bgColors,
								borderColor:	brdColors,
								borderWidth:	1
							}]
						},
						options: {     responsive:false,
									   title: {        display: true,        text: 'Interactive Grading application'    },
									  scales: {       xAxes: [{suggestedMin: 0.5,position: 'bottom',gridLines: {zeroLineColor: "rgba(0,255,0,1)"},scaleLabel: {display: true,labelString: 'Marks' },ticks:{	stepSize:0.5}     }],        
													  yAxes: [{position: 'left',gridLines: {zeroLineColor: "rgba(0,255,0,1)"}, scaleLabel: {display: true,labelString: 'Frequency'} 		}]    } 	
																 
						}
									
					});	  
				  }
}

obj=new Constructor();
obj.drawNew();
obj.plotData();
