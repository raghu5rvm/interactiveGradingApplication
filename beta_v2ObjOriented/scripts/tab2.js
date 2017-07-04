
/***********************************************************************
 * 							Tab 2 functions								
 * ********************************************************************/
var visit=0;
function tab2(){
	//remove later
	if(visit!=3){
		obj.confirmData();
		visit=0;
	}
	if(obj.hasData==0)
		alert("Fill all fields with valid data before plotting!!!")
	else{
		console.log("inside tab2 function");
		document.getElementById("divInput").style.display="none";
		document.getElementById("divStat").style.display="block";
		document.getElementById("divExport").style.display="none";
		//obj.getStats();
		if(obj.myChart==null && visit==0){
			visit=1;
			obj.confirmData();
			obj.plotData();
		}
		else{
			obj.myChart.update();
			}
		document.getElementById("tabStat").style.animation="1s fix linear infinite";
		document.getElementById("tabExport").style.animation="1s flash linear infinite";
}
}
function changeChartBg(color){
	obj.chartBg=null;
	obj.chartBg=color;
	obj.plotData();
	}
function changeChartType(type){
	obj.chartType=type;
	//alert(obj.chartType);
	obj.myChart.destroy();
		if(type=="bar"){	
		obj.chartBg=[];
		for(var i=0;i<obj.dataFrequency.length;i++)
			obj.chartBg[i]='#'+Math.floor(Math.random()*16777215).toString(16);

		obj.plotData();
		}
	
	else if(type=="line"){
		changeChartBg("#BFBFBF");
		}
	
}
