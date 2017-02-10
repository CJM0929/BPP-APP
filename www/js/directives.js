/*
//=====================================================================================================//
//-----------------------------------------------------------------------------------------------------//
// File name: main.c                                                                                   //
//-----------------------------------------------------------------------------------------------------//
//                                                                                                     //
// Author: Pedro Grillo (Coder)                                                                        //
//         Jose Freytes (Tester)                                                                       //
// Group: Codiceaeneas                                                                                 //
// Class name: Operating Systems                                                                       //
// Class code:CECS 4230                                                                                //
// Class section: 21                                                                                   //
// Instructor(s): Medina Delgado, Jose R.                                                              //
//-----------------------------------------------------------------------------------------------------//
// Purpose: The purpose of this program is to simulate a console environment where the program         //
// displays the types and amount of resources that a process uses. Resources can be classified         //
// in different types.                                                                                 //
//                                                                                                     //
// Inputs : The available inputs in the console program are:                                           //
// a) -t : means the types of resources that are available in the program for the processes            //
// b) -r : the resources that are gonna run in the program, the user can input as many as they can     //
//         (be sure to match the same number of processes that are gonna run, this is explained on     //
//         the next point).                                                                            //
// c) -p : the amount of processes that are gonna run in the program, this has to match with the same  //
//         amount of resources in -r.                                                                  //
//                                                                                                     //
// Note: before writing all these commands, remember to write the name of the program.                 //
//                                                                                                     //
// Outputs:                                                                                            //
//                                                                                                     //
// Last date of Modification, by:  1/26/16                                                             //
// Reasons for Modification: Finishing touches on the program, everything has been implemented.        //
//                                                                                                     //
// Compatibility: Windows Operating systems.                                                           //
// Compilator used: Code::Block, GNU GCC Compiler.                                                     //
// Modifications:                                                                                      //
// Implementation for optional functions for further implementation for user interface improvement.    //
// ---                                                                                                 //
// Last debug stage test: 1/26/16; on 10:00 A.M.                                                       //
// Result of the last date of test: The program is running successful, but still needs implementation  //
// for optional functions for further implementation for user interface improvement.                   //
=========================================================================================================


==========================================================
/Program's template index:                              //
--------------------------------------------------------//
The program template is organized in the form as:       //
                                                        //
A) Preprocessor's library implementation declarations.  //
B) Macro declarations.                                  //
C) Global variables.                                    //
E) Function Prototypes.                                 //
F) Main function source code definition.                //
G) Functions' definitions.                              //
                                                        //
Template of organization:                               //
                                                        //
//Libraries                                             //
//Macros.                                               //
//Global variables.                                     //
//Function prototypes.                                  //
//Main function source code: int main(void).            //
//Functions' definitions.                               //
========================================================//

========================================================
Directives' list:                                     //
------------------------------------------------------//
Purpose: Function prototypes are to make the function //
definitions and types of the functions available      //
before the program compiles, to be able to determine  //
pre-bugs before they happen very uncertain            //
to the human eyes.                                    //
------------------------------------------------------//
------------------------------------------------------//
int input_read(char *a);                              //
int examine_string(char a[]);                         //
int examine_t_part(char a[]);                         //
int examine_r_part(char a[]);                         //
int examine_p_part(char a[]);                         //
------------------------------------------------------//
int examine_input_data();                             //
void set_resources();                                 //
void set_resources_needs();                           //
------------------------------------------------------//
int deadlock_algorithm();                             //
int verify_resources_for_p_n(int p);                  //
------------------------------------------------------//
void allocate_resources_for_p_n();                    //
void deallocate_resources(int const p);               //
void set_max_resources();                             //
------------------------------------------------------//
------------------------------------------------------//
======================================================//
*/








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