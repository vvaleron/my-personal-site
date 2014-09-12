(function(){
appContainer.
  controller('charts-controller', ['$scope', '$filter', 'paintChart', function($scope, $filter, paintChart) {
    		console.log("charts-controller", this);
        var game = $(".charts > .wrapper")[0],
            scope = $scope;

        scope.canvas = $('canvas.wrapper')[0];
        scope.paint = paintChart;
        scope.points = [];
        scope.formData = {};
        scope.formData.temperature = 27;
        scope.formData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        scope.formData.time = $filter('date')(new Date(), 'HH:mm');

        scope.submitTemperature = function(){
            this.points.push(this.formData);
            this.canvas.chart.points = this.points;
            this.canvas.repaint();
        };

        $('.charts .time-zone button').on('click', function(){
            var canvas = $('.charts .temperature-chart')[0];

            $(this).addClass('active').siblings().removeClass('active');
            canvas.chart.timeZone = $(this).text();
            canvas.repaint();
        });       
    }]);
}());