# TAU-ItayInbal

this the manual and settings of the front-end/UI/interface for the formcreator system

the system runs on Red Hat Linux

these are the instructions, settings and everything needed to use the formcreator system __UI__ successfully.

__STEPS:__

in order to use the Formcreator successfully the following steps need to be done:

__installation:__

1. download and install Node.js (and NPM with it)<br/>

NODE.JS- https://nodejs.org/en/download/ <br/>

(we used NODE.js v14.18.1)

 2. ```git clone https://github.com/orkilim/TAU-ItayInbal.git```
 3. ```cd TAU-ItayInbal```<br/>
 4. ```npm install``` to install all the used dependencies in the project<br/>
 5. ```npm start```<br/>


__about consts.js__<br/>
this is the file where all the configurations should be __besides the port of the UI__ (that is configured in the package.json file)<br/>

here we define the ___server__ hostname and port- ```const server="(ip and port here)"```.<br/>
and the UI host-```const uihost=(ui host here)```<br/>
can be found inside the __src__ folder

__changing port:__<br/>
if you wish to change the UI's port you can do it in the package.json:<br/>

the package.json can be found on the root folder (the first layer of folders) of the project<br/>
(alongside this README file and the src folder)
<br/>
in order to change the UI's port:

go to "scripts"--> change FROM ```"start": "react-scripts start"``` TO:<br/>

__on Windows:__ ```"start": " set PORT=(number of port) && react-scripts start"``` <br/>

__on Mac/Linux:__ ```"start": " PORT=(number of port) react-scripts start"``` 

and run the app as usual with ```npm start```

__working/running the front-end/UI:__


run the following commands in the terminal of the IDE (or the OS's command line after navigating to the proper folder)<br/>


```$ npm start```- to start the front-end<br/>

```$ npm test```- to run tests<br/>

```$ npm run build```- to create build<br/>


__Available Commands__

In the project directory, you can run:

 ## ```$ npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## ```$ npm test```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## ```$ npm run build```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


__AVAILABLE URL ROUTES:__

__(hostname)/create-form__

goes to the page where you actually create the form
you load the required schema json from your computer and the optional ui-schema input the name of the research/form when prompt to.
you will get an url link to the created form so you can actually send to to participants

<br/>

__(hostname)/forms/name-of-research__

__WILL BE RECEIEVED AS URL LINK THAT WILL BE SENT TO PARTICIPANTS OF THE RESEARCH__<br/>
in this route we use the url link receieved from the /formcreator route and send it to to participants
they can use the link to get to the form and answer the questions in it and save them to the formcreator database in the appropriate collection

<br/>


__(hostname)/results__

a route to get the results of a specific research. input the name of the form or research you want to get the results to in the text input and press the search button
