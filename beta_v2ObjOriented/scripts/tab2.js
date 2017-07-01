
/***********************************************************************
 * 							Tab 2 functions								
 * ********************************************************************/
var visit=0;
function tab2(){
	if(obj.hasData==0)
		alert("Fill all fields with valid data before plotting!!!")
	else{
		console.log("inside tab2 function");
		document.getElementById("divInput").style.display="none";
		document.getElementById("divStat").style.display="block";
		document.getElementById("divExport").style.display="none";
		//obj.getStats();
		if(obj.myChart==null){
			visit=1;
			obj.plotData();
		}
		else{
			obj.myChart.update();
			}
		document.getElementById("tabStat").style.animation="1s fix linear infinite";
		document.getElementById("tabExport").style.animation="1s flash linear infinite";
}
}
