# Neo QA automation assessment

In order to complete this test, you will need to clone this repository and run Cypress locally.
Please follow the setup instructions below to ensure that everything is set up correctly before continuing to the task below.

## Setup instructions

1. Ensure that you have a recent version of [Node JS](https://nodejs.org) installed. 
We recommend installing Node v20.9.0 to ensure compatibility, but other recent Node versions may also work.

2. Clone this repository and navigate to its location in your terminal or command prompt.

3. Run `npm install` and wait for the dependencies to install. 
If you encounter errors, ensure that you're running a compatible version of Node JS.

4. Run `npm run test` to open Cypress.

## The task

Here is a link for a demo parking app: http://www.shino.de/parkcalc/. 
Please take a look at the app, then complete the steps below.

1. Find 3 bugs in the parking app and write a bug report for each.
   1. Include all relevant information that you would normally include in a bug report.
2. Write a small automated test suite for the parking app within this repository.
   1. Include tests for **at least two** of the selectable parking lots, using the displayed parking rates to determine the expected result of each cost calculation.
   2. Include **at least one** test that fails, proving one of the bugs you found in step 1.
   3. You can write your tests using Gherkin or standard Cypress syntax. A simple example of each has been provided.
   4. If you wish, you can use the `commands.ts` file or create your own files to add reusable methods, indicating how you might start to construct a testing framework.

## Submitting your solution

When you have completed this task, please follow the steps below to submit your solution for assessment.

1. Write an email including the following information
   1. Your 3 bug reports
   2. Any information you'd like us to know about your approach to writing the automated test suite
   3. A brief summary of what you would do next if you had more time to work on this project
2. Compress the `cypress` folder of this repository into a zip file and attach it to the email
3. Send the email to mh@neoftl.com

You may be asked to present your solution at interview, and we will discuss the approach you took.

## Useful links

* [Node JS](https://nodejs.org) version 20.9.0
* [Cypress](https://www.cypress.io/) version 13.4.0
* [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md#write-a-test)
