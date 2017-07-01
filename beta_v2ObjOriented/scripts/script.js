/**********************************************************************
 * 						global variables  								
 * ********************************************************************/
window.onload=function(){
	obj=new MyInstance();
	console.log(obj);

	MyInstance.prototype.newMethod=function(k){
		alert("new method is added to existing code with text "+k);
	}

}
console.log("after this");
function hideOther(option){
	console.log("hiding all other except needed block");
	var e=document.getElementsByClassName("row14");
	for(var i=0;i<e.length;i++){
		if(e[i].id==option)
			e[i].style.display="block";
		else
			e[i].style.display="none";
		}
	console.log("done hiding other block");
	}

function showCreditEntryBox(count,flag){
	if(!isNaN(parseInt(count))){
		if(flag==1){
			console.log("called by custom 1 with count = "+count);
			var labelBox=document.getElementById("customRow12").children;
			var creditBox=document.getElementById("customRow13").children;
			console.log(labelBox);
			console.log("label box= "+creditBox);
			for(var i=0;i<count;i++){
				labelBox[i].style.display="inline-block";
				creditBox[i].style.display="inline-block";
				}
			console.log("done one part, has to hide remaining boxes");
			for(var i=count;i<10;i++){
				labelBox[i].style.display="none";
				creditBox[i].style.display="none";
				}
			}
		else if(flag==2){
			console.log("called by custom 2 with count = "+count);
			var labelBox=document.getElementById("customRow22").children;
			var creditBox=document.getElementById("customRow23").children;
			console.log("label box= "+labelBox);
			console.log("label box= "+creditBox);
			for(var i=0;i<count;i++){
				labelBox[i].style.display="inline-block";
				creditBox[i].style.display="inline-block";
				}
			for(var i=count;i<11;i++){
				labelBox[i].style.display="none";
				creditBox[i].style.display="none";
				}				
			}
		
	}
	
}
			
