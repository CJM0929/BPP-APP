

/* header-shrink.directives.js */

/**
* @description briefing
* @Element example <header-shrink></header-shrink>
* @Attribute example <div header-shrink></div>
**/
angular
    .module('app.directives', [])
    .directive('headerShrink',  headerShrinkDirectiveFunction);
               
function headerShrinkDirectiveFunction($document) 
{
    
    return {    
        
        restrict: 'AE',
        
        link: function($scope, $element, $attr) 
        {
            var header = $document[0].body.querySelector('.about-header');
            var resizeFactor, scrollFactor, blurFactor;           
            
            $scope.$on('userDetailContent.scroll', function(event,scrollView) {
                
                if (scrollView.__scrollTop >= 0) 
                {
                    scrollFactor = scrollView.__scrollTop/3.5;
                    header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';
                } 
                else if (scrollView.__scrollTop > -70) 
                {
                    resizeFactor = -scrollView.__scrollTop/100 + 0.99;
                    header.style[ionic.CSS.TRANSFORM] = 'scale('+resizeFactor+','+resizeFactor+')';
                }
            });
        }
    }; //return end.
    
}
/********************************************************************************************************/

/* file-model.directives.js */

/**
* @description briefing
* @Element example <file-model></file-model>
* @Attribute example <div file-model></div>
**/
    angular
    .module('app.directives')
    .directive('fileModel', fileModelDirectiveFunction);

function fileModelDirectiveFunction($parse) 
{    
    return {
        restrict: 'AE',
        link: function(scope, element, attrs)
        {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                }); //end of $scope.$apply and so on.
            });
		}
	};
}
/********************************************************************************************************/

/* app-filereader.directives.js */

/**
* @description briefing
* @Element example <app-filereader></app-filereader>
* @Attribute example <div app-filereader></div>
**/
 angular
.module('app.directives')
.directive('appFilereader', appFilereaderDirectiveFunction);
             
function appFilereaderDirectiveFunction($q) 
{  
    var slice = Array.prototype.slice;
    
    return {
        restrict: 'AE',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            
            if (!ngModel) return;
            
            ngModel.$render = function() {};
            
            element.bind('change', function(e) {
                
                var element = e.target;
                
                $q.all(slice.call(element.files, 0).map(readFile)).then(function(values) {
                    
                    if (element.multiple)
                    { 
                        ngModel.$setViewValue(values);
                    }
                    else 
                    {
                        ngModel.$setViewValue(values.length ? values[0] : null);
                    }
                }); // end $q.all function.
                
                function readFile(file) {
                    var deferred = $q.defer();
                    var reader = new FileReader();
                    
                    reader.onload = function(e) {
                        deferred.resolve(e.target.result);
                    };
                    
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    };
                    
                    reader.readAsDataURL(file);
                    
                    return deferred.promise;
                }
            }); //change
        } //link
    }; //return

}
/********************************************************************************************************/

/* file-button.directives.js */

/**
* @description briefing
* @Element example <file-button></file-button>
* @Attribute example <div file-button></div>
**/
angular
.module('app.directives')
.directive('fileButton', fileButtonDirectiveFunction);

function fileButtonDirectiveFunction() 
{
    
    return {
        link: function(scope, element, attributes) {
            
            var el = angular.element(element);
            var button = el.children()[0];
            
            el.css({
                
                position: 'relative',overflow: 'hidden',
                width: button.offsetWidth,
                height: button.offsetHeight
            
            });
            
            var fileInput = angular.element('<input type="file" multiple />');
            
            fileInput.css({
                position: 'absolute',
                top: 0,
                left: 0,
                'z-index': '2',
                width: '100%',
                height: '100%',
                opacity: '0',
                cursor: 'pointer'
            });
            
            el.append(fileInput);
        }
    };
}
/********************************************************************************************************/