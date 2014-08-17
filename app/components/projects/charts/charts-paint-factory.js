appContainer.
  factory('paintChart', function(){

  	function chartInit(canvas){
  		this.applyMethods(canvas);

  		canvas.chart = {};
        canvas.chart.size = {
        	width: canvas.width,
        	height: canvas.height,
        	top: canvas.getPercent(10).height,
        	bottom: canvas.height - canvas.getPercent(10).height,
        	left: canvas.getPercent(10).width,
        	right: canvas.width - canvas.getPercent(10).width,
          verticalDivision: 30,
        	horizontalDivision: 30
        };
        canvas.chart.getHourPxl = function() {
          var size = canvas.chart.size,
              width = size.width - size.left * 2;

          return width/24;
        };
        canvas.chart.getTempPxl = function() {
          var size = canvas.chart.size,
              height = size.height - size.top * 2;

          return height/50;
        };
        canvas.chart.getXPoint = function(hours, minutes) {
          var chart = canvas.chart,
              inHours = hours + minutes/60;

              return inHours * chart.getHourPxl();

        };
        canvas.chart.getYPoint = function(temperature) {
            return temperature * canvas.chart.getTempPxl();
        };

        canvas.repaintBackground();
  	};

  	function getPercent(percent){
  		if(percent){		
	  		return {
		  		width  : (percent * this.width)  / 100,
		  		height : (percent * this.height) / 100
	  		}
  		}
  	};

  	function repaintDivisions(){
  		var context = this.getContext('2d'),
  			size = this.chart.size;

  		//vertical divisions
        for (i=0; i < (size.bottom - size.top) / size.verticalDivision; i++){
        	var currentY = size.bottom - (size.verticalDivision * i);
        	context.beginPath();
        	context.moveTo(size.left - 2, currentY);
        	context.lineTo(size.left + 2, currentY);
        	context.stroke();
        }

        //horizontal divisions
        for (i=0; i < (size.right - size.left) / size.horizontalDivision; i++){
        	var currentX = size.left + (size.horizontalDivision * i);
        	context.beginPath();
        	context.moveTo(currentX, size.bottom + 2);
        	context.lineTo(currentX, size.bottom - 2);
        	context.stroke();
        }
  	};

    function repaintBackground(){
        var canvas = this,
        	context = canvas.getContext('2d'),
        	top = canvas.chart.size.top,
        	bottom = canvas.chart.size.bottom,
        	left = canvas.chart.size.left,
        	right = canvas.chart.size.right;

        //vertical and horizontal lines
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left, bottom);
        context.lineTo(right, bottom);
        context.stroke();
        
        //arrow for vertical line
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left-5, top+20);
        context.lineTo(left+5, top+20);
        context.lineTo(left, top);
        context.fill();
        
        //arrow for horizontal line
        context.beginPath();
        context.moveTo(right, bottom);
        context.lineTo(right-20, bottom-5);
        context.lineTo(right-20, bottom+5);
        context.lineTo(right, bottom);
        context.fill();

        //horizontal text
        context.fillStyle = "black";
        context.font = "18pt Helvetica";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Time", right / 2 ,canvas.height - 20);


        //vertical text
        context.save();
		context.translate(20, bottom / 2);
		context.rotate(-0.5*Math.PI);

		context.fillText("Temperature" , 0, 0);
		context.restore();

		canvas.repaintDivisions();
    };

    function repaintPoints(){            
      var canvas = this,
          context = canvas.getContext('2d'),
          top = canvas.chart.size.top,
          bottom = canvas.chart.size.bottom,
          left = canvas.chart.size.left,
          right = canvas.chart.size.right;
          points = canvas.chart.points;

      // Create mock points for dev
      if (points && points.length < 10) {
        for (var i=0; i < 50; i++) {
         var point = {};
          point.date = "" + Math.round(Math.random() * 2014) + '-' + Math.round(Math.random() * 12) + '-' + Math.round(Math.random() * 30);    
          point.time = ""+ Math.round(Math.random() * 24) + ':'+ Math.round(Math.random() * 60);
          point.temperature = Math.round(Math.random() * 50);

         points.push(point);
        } 
      }
      //
      points.forEach(function(point, index, points){
          
          var hours = +point.time.split(':')[0],
              minutes = +point.time.split(':')[1],
              temperature = point.temperature;

          var x = this.chart.getXPoint(hours,minutes) + this.chart.size.left,
              y = this.chart.getYPoint(temperature) + this.chart.size.top;



          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 1, y + 1);
          context.stroke();
      }, canvas);



    	console.log(points, 'repaintPoints()');
    };

    function repaint(){
    	var chart = this.chart;

    	if(!chart.currentTimeZone && chart.timeZone){
    		chart.currentTimeZone = chart.timeZone;
    	}

    	if(chart.currentTimeZone != chart.timeZone){
    		this.repaintDivisions();
        	chart.currentTimeZone = chart.timeZone;
    	}

    	if(chart.points){
    		this.repaintPoints();
    	}

    	
    };

  	function applyMethods(el){
  		el.repaint = this.repaint;
  		el.getPercent = this.getPercent;
  		el.repaintDivisions = this.repaintDivisions;
  		el.repaintPoints = this.repaintPoints;
  		el.repaintBackground = repaintBackground;
  	};

    return {
    	chartInit: chartInit,
    	repaint: repaint,
    	repaintPoints: repaintPoints,
      applyMethods : applyMethods,
      getPercent	: getPercent,
      repaintBackground: repaintBackground,
      repaintDivisions : repaintDivisions
    }
});