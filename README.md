# Frontend for Meetups app

## Tech stack

### React + TypeScript + Vite + Redux

------

## Running locally

1. Install dependencies

```bash
npm install
```

2. Copy `.env.example` to `.env` anf fill `.env.`.

```bash
cp .env.example .env
```
3. Fill up `.env` using documentation in Clickup.

4. Start Vite development server

```bash
npm run dev
```

## Local development with docker

### Requirements
- Docker compose
- make

### Initial steps
1. Build docker image
  `make docker-build`
2. Download node_modules to the host
  `make download_node_modules`
3. Run dev server
  `make dev` or run it in daemon mode `make dev-daemon`

### Other commands

To see other available commands, please visit the file [Makefile](./Makefile)

### Example
```bash
~/Projects/meetups-ui (fix/asakalouski/fix-docker|✚4) make docker-rm
docker compose rm dev
? Going to remove react-app-dev Yes
[+] Removing 1/0
 ✔ Container react-app-dev  Removed
~/Projects/meetups-ui (fix/asakalouski/fix-docker|✚4) make download_node_modules
docker compose up -d dev
[+] Running 2/0
 ✔ Container react-app-dev                                                                                                                            C[+] Running 2/2
              Started0.0s

docker compose cp dev:/usr/src/app/node_modules ./node_modules
[+] Copying 1/1
 ✔ react-app-dev copy react-app-dev:/usr/src/app/node_modules to ./node_modules Copied                                                           13.3s
docker compose stop dev
[+] Stopping 1/1
 ✔ Container react-app-dev  Stopped                                                                                                              10.4s
~/Projects/meetups-ui (fix/asakalouski/fix-docker|✚4) make dev
docker compose up dev || true
[+] Running 1/0
 ✔ Container react-app-dev  Created                                                                                                               0.0s
Attaching to react-app-dev
react-app-dev  |
react-app-dev  | > meetups-ui@0.0.5 dev
react-app-dev  | > vite
react-app-dev  |
react-app-dev  |
react-app-dev  |   VITE v5.0.11  ready in 910 ms
react-app-dev  |
react-app-dev  |   ➜  Local:   http://localhost:3000/
react-app-dev  |   ➜  Network: http://172.22.0.4:3000/
^CGracefully stopping... (press Ctrl+C again to force)
[+] Stopping 1/1
 ✔ Container react-app-dev  Stopped                                                                                                              10.3s
react-app-dev exited with code 0
canceled
~/Projects/meetups-ui (fix/asakalouski/fix-docker|✚4)
```

------
## Follow the Feature-sliced design
### Hierarchy
The layers are standardized across all projects and vertically arranged.

`app <- pages <- widgets <- features <- entities <- shared`

`higher level layer <------------------- lower level layer`

Main rule: `lower level never imports from higher level`

### Structure

`app/` contains setup of routing, store and global styles.

`pages/` contains the route components for each page in the app, mostly composition, hardly any logic.  Compositional layer to construct full pages from entities, features and widgets.

Within our application, let's consider an event card in a news feed.

`widgets/` contains the "assembled" event card, with content and interactive buttons that are wired up to the relevant calls  on the back-end. Compositional layer to combine entities and features into meaningful blocks.

`features/` contains the interactivity of the card (e.g., like button) and the logic of processing those interactions.

`entities/` contains the shell of the card with slots for content and the interactive elements. The tile representing the event author is also here, but in a different slice.

`shared/` — reusable functionality, detached from the specifics of the project/business. (e.g. UIKit, API and config)

Then there are [slices](https://feature-sliced.design/docs/reference/slices-segments#slices), which partition the code by business domain. This makes your codebase easy to navigate by keeping logically related modules close together. Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling.

Each slice, in turn, consists of segments.

These are tiny modules that are meant to help with separating code within a slice by its technical purpose.

The most common segments are:

`ui` - UI components, data formatting functions

`model` - business logic and data storage, as well as functions to manipulate this data: store, actions

`api` - communication with external APIs, backend API methods

`lib` -  auxiliary and infrastructural code: utils/hooks

 but you can omit some or add more, as you see fit.

Look for examples of segments for each level here: https://feature-sliced.design/docs/reference/slices-segments#examples
