
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
		document.getElementById("tabInput").style.opacity="0.4";
		document.getElementById("tabInput").style.color="#4d4d4d";
		document.getElementById("tabStat").style.opacity="1";
		document.getElementById("tabStat").style.color="#B93E3E";
		document.getElementById("tabExport").style.opacity="0.4";
		document.getElementById("tabExport").style.color="#4d4d4d";

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
			obj.chartBg[i]="#BFBFBF";

		obj.plotData();
		document.getElementById("lineChartBtn").style.opacity="0.5";
		document.getElementById("barChartBtn").style.opacity="1";

		}
	
	else if(type=="line"){
		document.getElementById("lineChartBtn").style.opacity="1";
		document.getElementById("barChartBtn").style.opacity="0.5";
		changeChartBg("#BFBFBF");
		}
	
}
