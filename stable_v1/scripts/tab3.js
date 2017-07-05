
/**********************************************************************
 * 							tab 3 function 
 * ********************************************************************/

function tab3(){
	if(obj.hasData==0){
		alert("Can't show statistics without data");
		}
	else{
		visit=3;
		console.log("inside tab3 function");	
		document.getElementById("divInput").style.display="none";
		document.getElementById("divStat").style.display="none";
		document.getElementById("divExport").style.display="block";
		obj.getStats();
		obj.showStats();
		if(obj.pie1==null){
				obj.showPieStats();
			}
		else{
			obj.pie1.destroy();
			obj.pie2.destroy();
			obj.pie1=null;
			obj.pie2=null;				
			obj.showPieStats();
			}
		document.getElementById("tabInput").style.opacity="0.4";
		document.getElementById("tabInput").style.color="#4d4d4d";
		document.getElementById("tabStat").style.opacity="0.4";
		document.getElementById("tabStat").style.color="#4d4d4d";
		document.getElementById("tabExport").style.opacity="1";
		document.getElementById("tabExport").style.color="#B93E3E";
	}
}

