/***********************************************************************
 * default variables
 * ********************************************************************/

var minCols=20;
var minRows=102;
var colCount=0;
var rowCount=0;
var data=null;
var plotData=[];
//var table=document.getElementById("dataDisplay");
var colLableSet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

var svg; 
var svgcWidth, svgcHeight, svgcMargin, svgcSpace;
var svgcMarginSpace, svgcMarginHeight;
var bcWidth, bcMargin, totalChartBars, maximumDataValue, bcWidthMargin;
var totalLabelOnYAxis;

/**********************************************************************/

//alert(colLableSet);
makeGrid();

function makeGrid(){
	var m,n;
	document.getElementById("dataDisplay").innerHTML="";
	(rowCount>minRows)?m=rowCount:m=minRows;
	(colCount>minCols)?n=colCount:n=minCols;
	
	for(var i=0;i<m;i++){
		var rowCode='<tr>';
		for(var j=0;j<n;j++){
				rowCode+='<td class="row'+i+' col'+j+'"><input type="text" class="row'+i+'Data col'+j+'Data" min="0" max="100" step="1" autofocus></td>';	
			}
			rowCode+='</tr>';
			$("#dataDisplay").append(rowCode);
	}
	var	rowZero=document.getElementsByClassName("row0");
	var	colZero=document.getElementsByClassName("col0");
	rowZero[0].innerHTML=colZero[0].innerHTML="";
	rowZero[0].style.opacity="0";
	colZero[0].style.opacity="0";
	colZero[0].style.border="0px";
	
	for(var i=1;i<n;i++){
			rowZero[i].innerHTML=colLableSet[i-1];
		}
	for(var j=1;j<m;j++){
			colZero[j].innerHTML=j-1;	
		}
	
}

function getData(event){
	if(event.value!=null && event.value!=""){
	var rowData,colData,tempData;
	event=event || window.event;
	console.log("go to hell");
	tempData=event.value;
	tempData=tempData.split('\n');
	event.value="";
	for(var i=0;i<tempData.length;i++){
		tempData[i]=tempData[i].split('\t');
		if(tempData[i].length>colCount){
			colCount=tempData[i].length;
			}
		}
	rowCount=tempData.length-1;
	for(var i=0;i<tempData.length-1;i++){
		for(var j=0;j<tempData[i].length;j++){
			tempData[i][j]=parseInt(tempData[i][j]);
			console.log(tempData[i][j]);
			if(isNaN(tempData[i][j])){	
				rowCount=0;
				colCount=0;
				tempData=null;
				alert("enter only marks which are integers");
				return;
				}
			}
		}
		
	console.log("i'm after validation");
	data=tempData;
	data.pop();	
	makeGrid();
	for(var k=0;k<101;k++){
		plotData[k]=0;
		}
	console.log(plotData);
	var total=0,average=0;
	for(var i=0;i<data.length;i++){
	var rowPointer=document.getElementsByClassName("row"+(i+1)+'Data');			
		for(var j=0;j<data[i].length;j++){
			rowPointer[j].value=data[i][j];
			total+=data[i][j];
			console.log(data[i][j]);
			plotData[data[i][j]] = plotData[data[i][j]]+1;
			//g[data[i][j]]=g[data[i][j]]+1;
			console.log(plotData);
	}
		}
		average=total/data.length
//		alert(total+" is the toatal and avg is "+average);	
		document.getElementById("avgMarks").innerHTML=average.toFixed(3);
		document.getElementById("dataCount").innerHTML=data.length;
		
	}
}





/***********************************************************************
 * 						svg												
 * 
 **********************************************************************/
 
 function draw(){
	alert('inside plot function');
	if(data.length<=0){
		alert("no data to plot. Please enter some data");
		}
	else {
		
			
		
		}
	 
 } 
 
function chartSetting(){
	svgcMargin=20;
	svgcSpace=40;
	svgcHeight=svg.height.baseVal.value-2*svgcMargin-svgcSpace;
	svgcWidth=svg.width.baseVal.value-2*svgcMargin-svgcSpace;
	
	svgcMarginSpace=svgcMargin+svgcSpace;
	svgcMarginHeight=svgcMargin+svgcHeight;
	
	bcMargin=15;
	totalChartBars=data.length;
	bcWidth = (svgcWidth / totalChartBars) - bcMargin;
	}

























/***********************************************************************
 * 						using char js                                   
 * ********************************************************************
function draw(){
var ctx = document.getElementById("myChart").getContext("2d");
var labels=[];
for(var i=0;i<101;i++){
	labels[i]=i;
	}
var myChart = new Chart(ctx, {
    type: 'bar',
	data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data:plotData ,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
		barThickness:10,
		responsive:true,
		title: {
            display: true,
            text: 'Grading'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

}


*/
























/**********************************************************************
 * 						Plotting of graph
 * ********************************************************************
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, 90/20, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth*0.902,window.innerHeight*0.8);
			document.getElementById("drawSpace").appendChild( renderer.domElement );

			var gridXY = new THREE.GridHelper(15,20);
			gridXY.position.set( 0,0,0 );
			gridXY.rotation.x = Math.PI/2;
			//gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
			gridXY.scale.x=1.075;
			gridXY.scale.z=0.23;
			scene.add(gridXY);

			var Xdir = new THREE.Vector3( 10,0,0 );
			var Ydir = new THREE.Vector3(0,10,0);
		//normalize the direction vector (convert to vector of length 1)
			Xdir.normalize();
			Ydir.normalize();
			var origin = new THREE.Vector3( -16.15, -3.45, 0 );
			var Xlength = 33,
				Ylength = 7.2;
			var hex = 0xffff00;
			var XarrowHelper = new THREE.ArrowHelper( Xdir, origin, Xlength, hex,0.2,0.01 );
			scene.add( XarrowHelper );
			var YarrowHelper = new THREE.ArrowHelper( Ydir, origin, Ylength, hex,0.2,0.01 );
			//scene.add( YarrowHelper );
			
			
			            var canvas1 = document.createElement('canvas');
                        var context1 = canvas1.getContext('2d');
                        context1.font = "Bold 7px Arial";
                        context1.fillStyle = "#ffffff";
                        context1.fillText('1', 0, 60);

                        // canvas contents will be used for a texture
                        var texture1 = new THREE.Texture(canvas1)
                        texture1.needsUpdate = true;

                        var material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
                        material1.transparent = true;

                        var mesh1 = new THREE.Mesh(
                            new THREE.PlaneGeometry(50, 10),
                            material1
                          );
                        mesh1.position.set(25, 0, 0);
                        mesh1.rotation.x = 0;
                        YarrowHelper.add(mesh1);
                        // Note that mesh1 gets added to the shape and not to the scene

                       scene.add(YarrowHelper)
			
			
			
			
			function plotBarGraph(){
								
				}
			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame( render );

				renderer.render(scene, camera);
			};
			
			render();


*/






