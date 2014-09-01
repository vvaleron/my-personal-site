appContainer.
  factory('paintChart', function(){

  	function chartInit(canvas){
  		this.applyMethods(canvas);

  		canvas.chart = {
          timeZone: "Day",
          maxTemperature: 50,
          size: {
            width: canvas.width,
            height: canvas.height,
            top: canvas.getPercent(10).height,
            bottom: canvas.height - canvas.getPercent(10).height,
            left: canvas.getPercent(10).width,
            right: canvas.width - canvas.getPercent(10).width,
            verticalDivision: null,
            horizontalDivision: null
          },
          processTimeFormat: function(){
            switch(this.timeZone) {
                case "Day":
                    return {
                      format: 24,
                      divisionsValue: 2
                    };
                    break;
                case "Week":
                    return {
                      format: 7,
                      divisionsValue: 1
                    };
                    break;
                case "Month":
                    return {
                      format: 4,
                      divisionsValue: 1
                    };
                    break;
                case "Year":
                    return {
                      format: 12,
                      divisionsValue: 1
                    };
                    break;
            };
          },
          getTimePxl: function(){
            var size = canvas.chart.size,
            width = size.width - size.left * 2,
            time = canvas.chart.processTimeFormat();

            return width / time.format;
          },
          getTempPxl: function(){
            var size = canvas.chart.size,
            height = size.height - size.top * 2;

            return height / 50;    
          }      
      };

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      //===================REFACTORING==================//
      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      canvas.chart.getXPoint = function(hours, minutes) {
        var chart = canvas.chart,
            inHours = hours + minutes/60;

            return inHours * chart.getTimePxl();
      };
      canvas.chart.getYPoint = function(temperature) {
          return temperature * canvas.chart.getTempPxl();
      };
      /////////////////////////////////////////////////////
      /////////////////////////////////////////////////////

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
  			size = this.chart.size,
        divisionInCelsius = 5,
        timeFormat = this.chart.processTimeFormat(),
        horizontalDivisionsCount,
        horizontalDivisionInPixel,
        verticalDivisionsCount,
        verticalDivisionInPixel;
      
      horizontalDivisionsCount = timeFormat.format / timeFormat.divisionsValue;
      horizontalDivisionInPixel = (size.width - size.left - 50) / horizontalDivisionsCount;

      verticalDivisionsCount = this.chart.maxTemperature / divisionInCelsius;
      verticalDivisionInPixel = (size.height - size.top - 50) / verticalDivisionsCount;

      size.horizontalDivision = horizontalDivisionInPixel;
      size.verticalDivision = verticalDivisionInPixel;

        //horizontal divisions
        var currentHorizontalDivision = 0;
        for (i=0; i <= horizontalDivisionsCount; i++){
        	var currentX = size.left + (size.horizontalDivision * i);
        	context.beginPath();
        	context.moveTo(currentX, size.bottom + 2);
        	context.lineTo(currentX, size.bottom - 2);
        	context.stroke();

          //horizontal text
          if (currentHorizontalDivision) {
            context.fillStyle = "black";
            context.font = "10pt Helvetica";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(currentHorizontalDivision * timeFormat.divisionsValue, currentX , size.bottom + 20);
          }
          ++currentHorizontalDivision;
        }

        //vertical divisions
        var currentVerticalDivision = 0;
        for (i=0; i <= verticalDivisionsCount; i++){
          var currentY = size.bottom - (size.verticalDivision * i);
          context.beginPath();
          context.moveTo(size.left - 2, currentY);
          context.lineTo(size.left + 2, currentY);
          context.stroke();

          //vertical text
          if (currentVerticalDivision) {
            context.fillStyle = "black";
            context.font = "10pt Helvetica";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(currentVerticalDivision * divisionInCelsius, size.left - 10, currentY);
          }
          ++currentVerticalDivision;
        }
  	};

    function repaintBackground(){
        var canvas = this,
        	context = canvas.getContext('2d'),
          size = canvas.chart.size,
          width = size.width,
        	top = size.top,
        	bottom = size.bottom,
        	left = size.left,
        	right = size.right;

        //vertical and horizontal lines
        context.beginPath();
        context.moveTo(left, 0);
        context.lineTo(left, bottom);
        context.lineTo(width, bottom);
        context.stroke();
        
        //arrow for vertical line
        context.beginPath();
        context.moveTo(left, 0);
        context.lineTo(left-5, 20);
        context.lineTo(left+5, 20);
        context.lineTo(left, 0);
        context.fill();
        
        //arrow for horizontal line
        context.beginPath();
        context.moveTo(width, bottom);
        context.lineTo(width-20, bottom-5);
        context.lineTo(width-20, bottom+5);
        context.lineTo(width, bottom);
        context.fill();

        //horizontal text
        context.fillStyle = "black";
        context.font = "18pt Helvetica";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Time", width / 2 ,canvas.height - 10);


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
      if (points && points.length < 10){
        var hours = 1,
            temperature = 1;

        for (var i=0; i < 24; i++){
         var point = {},
             hours = Math.round(hours),
             minutes = hours != 24 ? Math.round(Math.random() * 60) : "00";
          
          point.date = "" + Math.round(Math.random() * 2014) + '-' + Math.round(Math.random() * 12) + '-' + Math.round(Math.random() * 30);    
          point.time = ""+ hours + ':'+ minutes;
          point.temperature = Math.round(temperature);

         points.push(point);

         hours != 24 ? ++hours : hours = 1;
         temperature != 50 ? ++temperature : temperature = 1;
        } 
      }
      //
      points.forEach(function(point, index, points){          
          var hours = +point.time.split(':')[0],
              minutes = +point.time.split(':')[1],
              temperature = point.temperature;

          var x = this.chart.getXPoint(hours,minutes) + this.chart.size.left,
              y = this.chart.size.bottom - this.chart.getYPoint(temperature);

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