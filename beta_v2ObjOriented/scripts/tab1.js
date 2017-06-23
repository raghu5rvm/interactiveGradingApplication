/***********************************************************************
 * 						Tab 1 functions											
 * *********************************************************************/
function tab1() {
	console.log("inside tab1 function");
	document.getElementById("divInput").style.display="block";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="none";
	
	obj.setData();

	document.getElementById("tabInput").style.animation="1s fix linear infinite";
	document.getElementById("tabStat").style.animation="1s flash linear infinite";
	
	}
