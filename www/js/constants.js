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
Constants' list:                                      //
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

//Constants.js linted:
angular.module('app.constants',['ngRoute', 'angular-jwt', 'angular-storage'])
    .constant('CONFIG', 
              {
    APIURL: "https://hoyportibppr.com/api",
})
    .constant('AUTH_EVENTS', 
              {
    notAuthenticated: 'auth-not-authenticated'
})
    .config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        whiteListedDomains: ['https://hoyportibppr.com/api', 'localhost']
    });
});
