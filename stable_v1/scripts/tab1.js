/***********************************************************************
 * 						Tab 1 functions											
 * *********************************************************************/
document.getElementById("divInput").style.display="block";
document.getElementById("divStat").style.display="none";
document.getElementById("divExport").style.display="none";

function tab1() {
	hideOther(document.getElementById("gradingModel").value)
	console.log("inside tab1 function");
	document.getElementById("divInput").style.display="block";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="none";		
	obj.setData();
	visit=0;
	hideOther(obj.gradeMode);
		document.getElementById("tabInput").style.opacity="1";
		document.getElementById("tabInput").style.color="#B93E3E";
		document.getElementById("tabStat").style.opacity="0.4";
		document.getElementById("tabStat").style.color="#4d4d4d";
		document.getElementById("tabExport").style.opacity="0.4";
		document.getElementById("tabExport").style.color="#4d4d4d";

	}
