
/**********************************************************************
 * 							tab 3 function 
 * ********************************************************************/

function tab3(){
	console.log("inside tab3 function");	
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="block";
	obj.getStats();
	obj.showStats();
	document.getElementById("tabExport").style.animation="1s fix linear infinite";

}

