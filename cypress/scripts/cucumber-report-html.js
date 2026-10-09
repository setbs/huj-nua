var reporter = require('cucumber-html-reporter');

var options = {
	theme: 'hierarchy',
	jsonDir: 'cypress/results/json',
	output: 'cypress/results/app.cucumber.html',
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: true
};

reporter.generate(options);
