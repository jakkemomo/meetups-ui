# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Before starting : 

Add a .env file with two lines following the example from the .env.example file.\
You can find the data to fill out in the documentation in Clickup.

### Follow the Feature-sliced design
### Hierarchy
The layers are standardized across all projects and vertically arranged.


`higher level layer <------------------- lower level layer`

`app <- pages <- widgets <- features <- entities <- shared`

Main rule: `lower level never imports from higher level`

### Structure

`app/` contains setup of routing, store and global styles.

`pages/` contains the route components for each page in the app, mostly composition, hardly any logic.  Compositional layer to construct full pages from entities, features and widgets.

Within our application, let's consider a event card in a news feed.

`widgets/` contains the "assembled" event card, with content and interactive buttons that are wired up to the relevant calls  on the back-end. Compositional layer to combine entities and features into meaningful blocks. 

`features/` contains the interactivity of the card (e.g., like button) and the logic of processing those interactions.

`entities/` contains the shell of the card with slots for content and the interactive elements. The tile representing the event author is also here, but in a different slice.

`shared/` — reusable functionality, detached from the specifics of the project/business. (e.g. UIKit, API and config)

Then there are slices, which partition the code by business domain. This makes your codebase easy to navigate by keeping logically related modules close together. Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling.

Each slice, in turn, consists of segments.

These are tiny modules that are meant to help with separating code within a slice by its technical purpose.

The most common segments are `ui`, `model` (store, actions), `api` and `lib` (utils/hooks), but you can omit some or add more, as you see fit.

