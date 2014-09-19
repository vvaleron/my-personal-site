(function(){

appContainer.
  controller('animate-controller', ['$scope', function($scope) {
 	    	var processSubCategories = function(subCategories) {
 	    		
 	    	};

 	    	var initCaegories = function(){
	    	    
	    	    $scope.currentCategory = null;
	    	    $scope.$watch('currentCategory', function() {
	    	    	var fullObj = $scope.categories.filter(function(el){
	    	    		return el.name == $scope.currentCategory;
	    	    	})[0];

	    	    	if (!fullObj) {
	    	    		return
	    	    	}

	    	    	processSubCategories(fullObj.childs);
					console.log(fullObj);
				});

				$scope.categories = [
					{
						name: "Трансмісія",
						childs: [
							"Коробка",
							"Мастило"
						]
					},
					{
						name: "Двигун",
						childs: [
							"Поршні",
							"Кільця"
						]
					},
					{
						name: "Кузов",
						childs: [
							"Двері",
							"Вікна",
							"Ручки"
						]
					},
					{
						name: "Гальма",
						childs: [
							"Педалі",
							"Мастило"
						]
					}
				];

	    	};
	    $scope.categoryClick = function(e){
	    	$scope.currentCategory = $(e.target).text();
	    };

    	$scope.initCaegories = initCaegories();

    }]);


appContainer.
	directive('slideMenu', function () {
  
  return {
    restrict: 'EA',
    link: function ($scope, $element, $attrs) {
      $element.on('click', function(e){
      if(!this.hasAttribute('sub')){
      	var subCategoryDiv = document.createElement('div');
	    $(subCategoryDiv).addClass('sub-category-div');
	    $(subCategoryDiv).attr('style', 'padding:20px 10px; display: none;');
	    $(this).attr('sub', 'true');
	    $(this).after(subCategoryDiv);  	
      }
      $(this).next('div').slideToggle();
      $(this).toggleClass('active');
      });
    }
  };
});

}());