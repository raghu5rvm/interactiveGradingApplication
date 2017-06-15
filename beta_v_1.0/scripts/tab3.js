
/**********************************************************************
 * 							tab 3 function 
 * ********************************************************************/

function tab3(){
	console.log("inside tab3 function");	
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="block";
	stats();
	showStats();
}


function stats() {
		
	for(var i=0;i<myAnnotationsMovable.length;i++){
			grade_values_movable[i]=myAnnotationsMovable[i].value;
			grade_values_fixed[i]=myAnnotationsFixed[i].value;
		}
/*	grade_values_fixed=grade_values_fixed.slice(0,-1);
	grade_values_movable=grade_values_movable.slice(0,-1);
	grade_values_fixed=grade_values_fixed.slice(1);
	grade_values_movable=grade_values_movable.slice(1);
*/
}

function showStats(){
	
	var grade_distribution_dynamic=grade_part(Data,grade_values_movable);
	var grade_distribution_static=grade_part(Data,grade_values_fixed);


	var uList=	document.getElementById("stats").children;
	//console.log(uList.length);
	uList[0].innerHTML=gradeLabels;

	uList[1].innerHTML=grade_values_fixed;
	uList[2].innerHTML=grade_values_movable;

	uList[3].innerHTML=grade_distribution_static;
	uList[4].innerHTML=grade_distribution_dynamic;

	uList[5].innerHTML=getAverageGPA(grade_distribution_dynamic);
	uList[6].innerHTML=getAverageGPA(grade_distribution_static);

	var table=document.getElementsByClassName("statsTableRows");
	console.log("table rows are "+table.length);
		
	}


function getAverageGPA(grade_dist){
	console.log("inside get averagae gpa");
	var student_count=0,
		wsum=0;
	for(var i=0;i<grade_dist.length;i++){
		console.log("weight is now "+gradeCredits[i]);
		student_count+=grade_dist[i];
		console.log("student count is now "+student_count);
		wsum+=gradeCredits[i]*grade_dist[i];
		console.log("weighted sum is now "+wsum);
		}
	return (wsum/student_count).toFixed(3);	
}

