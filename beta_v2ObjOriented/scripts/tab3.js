
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
		document.getElementById("tabExport").style.animation="1s fix linear infinite";
	}
}

