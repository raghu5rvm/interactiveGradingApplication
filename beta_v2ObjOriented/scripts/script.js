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
