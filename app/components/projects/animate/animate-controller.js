(function(){
appContainer.
  service('AbstractCategory', function () {
    return function (){

        return {
            current: null,
            
            setCurrent: function(target) {
               this.current = target;
            },
            getCurrent: function() {
               return this.current;
            },
            getChilds: function() {
            },
            getParent: function() {
            },
            onClick: function(event) {
                var me = this;
                me.setCurrent($(event.target));
                me.slide();
                me.click(event);
            },
            slide: function() {
                console.log("slide", this);
            }       
        }  
    }
  });

appContainer.
  controller('animate-controller', ['$scope','AbstractCategory', function($scope, AbstractCategory) {
 	    	var initCaegories = function(){
	    	    function Category() {
	            	this.type = "category";
	            	this.click = function(event) {
	            		var btn = this.getCurrent();
	            	};
	            };
				Category.prototype = AbstractCategory();
	            
	            function SubCategory() {
	            	this.type = "subCategory";
	            	this.click = function(event) {
	            	};
	            };
				SubCategory.prototype = AbstractCategory();

				$scope.category = new Category;
				$scope.subCategory = new SubCategory;         
	    	};

    	$scope.initCaegories = initCaegories();

    }]);
  
}());