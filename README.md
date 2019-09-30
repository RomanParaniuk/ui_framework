# TestAssignment
### To Get Started

#### Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/ 
(min node version is 6.9.x)

2.Chrome browser installed.
#### Run Scripts
* Clone the repository into a folder
```
git clone https://github.com/RomanParaniuk/MobiquityAssignment.git
```
* Go inside the folder and run following command from terminal/command prompt which would then install all the dependencies from package.json

```
npm install
```

* Then run following command to install **chromedriver** locally
```
npm run webdriver-update
``` 

* Add new run-configuration - Node.js
* In field **JavaScript file** type **run.js**
* Parameters: 

    - --specs="XXX" - relative path of feature file for run. By default - run all tests from folder "features"
    - --maxInstances="X" - max number for running browsers in parallel. By default - 1. Could be used when parameter 'specs' is not defined

* Alternative version for running tests: 
  - in terminal type following string: 
```
 node run.js --specs=features/layout.feature
``` 
Tests from file "layout.feature"  will be run

* Results of run are saved
```
./report/index.html
``` 
* Test-cases are described in 
```
./testCases.txt
``` 
