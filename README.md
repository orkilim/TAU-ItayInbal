# TAU-ItayInbal

this the manual and settings of the front-end/UI/interface for the formcreator system

__IMPORTANT TIPS:

each time you see $ command it means to type the command (without the $) in the terminal and press Enter key to execute it

STOP THE RUNNING COMMAND WITH Ctrl+C on Windows or Linux

these are the instructions, settings and everything needed to use the formcreator system __SERVER__ successfully.

__STEPS:

in order to use the Formcreator successfully the following steps need to be done:

__installation:

1. download and install FROM THE INTERNET Node.js (and NPM with it), Git, and your prefered IDE (I used Visual Studio Code)
2. create a new folder for the front-end
3. open the terminal on the specified folder, there are two ways to do so:
 a. open the cmd (or the OS command line) and navigate to the desired folder with $ cd path/to/folder

OR

 b.right-clicking on the folder and selecting "open with (prefered IDE)"- in my case it would be "open with Visual Studio Code" and the symbol of the IDE near it, press the Terminal tab on the top bar and press "New Terminal"


4. use the following commands to clone and work with this Github repository:
 4.1 ```$ git clone``` https://github.com/orkilim/TAU-ItayInbal.git to clone(/download the repository to your local machine) 
 4.2 ```$ npm install``` to install all the used dependencies ALREADY in the project

you have now downloaded the git repository to you local machine and downloaded and installed all the required dependancies(/libraries)

__working/running the front-end/UI:__

althoug coming with the ```$ git clone``` done earlier in step 4 check for the following lines in the PACKAGE.JSON file under "script":

    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",


run the following commands in the terminal of the IDE (or the OS's command line after navigating to the proper folder)


for example when I use the commands it looks like so: C:\Users\Or\Desktop\TAU- work\Itay and Inbal's project\formcreator>npm start

__Available Commands

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


__STOP THE RUNNING COMMAND WITH Ctrl+C on Windows or Linux__


__saving changes in the code to this repository:__

use the following commands to commit (=send changes) to the github repository (=save changes in github online repository):

```$ git add nameOfFile``` for a specific file OR ```git add .``` to add all files
```$ git commit -m "(your commit message goes here)"``` to commit changes to the repository (add message if you want where it says "(your commit message here)")
```$ git push``` to send the changes


__AVAILABLE URL ROUTES:__

__(hostname)/formcreator__

goes to the page where you actually create the form

you load the required schema json from your computer and the optional ui-schema input the name of the research/form when prompt to.

you will get an url link to the created form so you can actually send to to participants

__(hostname)/forms/name-of-research__

__WILL BE RECEIEVED AS URL LINK THAT WILL BE SENT TO PARTICIPANTS OF THE RESEARCH__

in this route we use the url link receieved from the /formcreator route and send it to to participants

they can use the link to get to the form and answer the questions in it and save them to the formcreator database in the appropriate collection


__(hostname)/results__

a route to get the results of a specific research. input the name of the form or research you want to get the results to in the text input and press the search button

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
