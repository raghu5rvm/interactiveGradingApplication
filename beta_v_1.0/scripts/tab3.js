
/**********************************************************************
 * 							tab 3 function 
 * ********************************************************************/

function tab3(){
	console.log("inside tab3 function");	
	document.getElementById("divInput").style.display="none";
	document.getElementById("divStat").style.display="none";
	document.getElementById("divExport").style.display="block";

}


function stats() {
	var freqDistStatic;
	var freqDistDynamic
	var grade_values_movable=[],
		grade_values_fixed=[];
		
	for(var i=0;i<myAnnotationsMovable.length;i++){
			grade_values_movable[i]=myAnnotationsMovable[i].value;
			grade_values_fixed[i]=myAnnotationsFixed[i].value;
		}

	var grade_distribution_dynamic=grade_partition(freqDist,grade_values_movable,100);
	var grade_distribution_static=grade_partition(freqDist,grade_values_fixed,100);

	var uList=	document.getElementById("stats").children;
	//console.log(uList.length);
	uList[0].innerHTML=gradeLabels;

	grade_values_fixed=grade_values_fixed.slice(0,-1);
	grade_values_movable=grade_values_movable.slice(0,-1);
	grade_values_fixed=grade_values_fixed.slice(1);
	grade_values_movable=grade_values_movable.slice(1);
	
/*	
	grade_distribution_static=grade_distribution_static.slice(0,-1);
	grade_distribution_dynamic=grade_distribution_dynamic.slice(0,-1);
	grade_distribution_static=grade_distribution_static.slice(1);
	grade_distribution_dynamic=grade_distribution_dynamic.slice(1);
*/	
	
	uList[1].innerHTML=grade_values_fixed;
	uList[2].innerHTML=grade_values_movable;

	uList[3].innerHTML=grade_distribution_static;
	uList[4].innerHTML=grade_distribution_dynamic;

	uList[5].innerHTML=getAverageGPA(grade_distribution_dynamic);
	uList[6].innerHTML=getAverageGPA(grade_distribution_static);
		
	}


function getAverageGPA(grade_dist){
	console.log("inside get averagae gpa");
	var student_count=0,
		wsum=0;
	console.log("weight is now "+weight);
	for(var i=0;i<grade_dist.length;i++){
		console.log("weight is now "+weight);
		student_count+=grade_dist[i];
		console.log("student count is now "+student_count);
		wsum+=weight*grade_dist[i];
		console.log("weighted sum is now "+wsum);
		weight++;
		}
	return (wsum/student_count).toFixed(3);	
}

