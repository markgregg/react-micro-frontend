# A micro frontend approach for JavaScript
[Demo](https://markgregg.github.io/react-micro-front-ends/) 
## Intro
For those of you don’t who know what a micro frontend is – a micro frontend is an architecture in which the UI is decomposed into individual, loosely coupled components that can be built, tested, and deployed independently. A parallel is the microservices architecture, where the backend is divided into individual services.

The approach I am taking is aimed at doing what is best for the UI, and focused on productivity. What do I mean by that? Well, one of the key benefits of microservices is they can be written in any language and hosted independently. For a UI this is not necessarily a great, for two reasons. 
-	The first reason is down to UX. If different components of the same UI are hosted independently, then it is harder to leverage style. Yes, stylesheets can be provided by a library, but it’s extra work and what if the user wants a light/dark mode switch. Of course, it is possible, but it comes at a higher cost. 
-	The second reason, is baggage. If the UI components are delivered in a single package, then the dependencies are shared, and overall the size is far smaller. This results in less time spent initialising and faster performance. 
## The approach
The approach I am promoting is to divide the application into components, that are developed, tested and published independently. The components are then incorporated back into an app before the app is deployed. 

When setup correctly, the approach adds little terms of overhead and has almost all the benefits of the micro frontend architecture, combined with the benefits of JavaScript. 

In practical terms the approach involve creating a component for every page or content panel. For example, a typically application would have a menu bar, in which  each option loads a separate page. In the approach, each of these pages would be a separate component. The menu and all general functionality would remain in the app.

The approach has the following benefits
-	Easy to maintain, as the source code is divided and entry points are easier to identify
-	Parallel development of components is easier than in a monolithic app
-	More performant than hosting components independently  
-	Keep a uniform style across the UI is easier than when host independently 
## Project structure
The structure of the project would look as follows-

![alt text](https://github.com/markgregg/react-micro-front-ends/blob/main/components/micro-front-end-component3/src/images/structure.png?raw=true)

The structure may look like a mono repo, but that is only because the above is an example. In an actual project, the app and components would be separate repos.

## Components

When breaking out elements of a UI into separate components, there is a great deal less to think about than if they were to be hosted independently. There are still a few things to consider, and below is a list the main points.

### How to style

One of the benefits of not hosting the component independently, is the ability to leverage style from the parent. In my opinion, the best way to achieve this, is to give each component its own stylesheets and to drive the stylesheets from variables. This will allow the component to be developed independently, while at the same time, allowing the look and feel to be controlled form the parent.

#### Parent stylesheet
```css
{
  --color: white;
  --backgroundColor: black;
  --fontSize: small;
}
```
#### Component stylesheets
```css
.element {
   color: var(--color);
   background-color: var(--backgroundColor);
   font-size: var(--fontSize);
}
```

Tackling style like this also allows easy retheming, as the variables can be updated dynamically.

### Dependencies
All shared dependencies should be peer and dev dependencies. By making them peer and dev dependencies, it will be easier to control the versioning and will simplify things when it comes to upgrading.

```node
"peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "dependency": "^1.0.1"
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "dependency": "^1.0.1"
  }
```
### Publishing
To publishing the components, rollup is recomended. Rollup has numerous averages over webpack for component publications - simple configuration, better tree shaking and minimum size bundles. 

### Visualising
Publishing components to visualise changes is not ideal. Apart from slowing down development, it also results in unnecessary versions. To overcome this problem, there is a handy library called __relative-deps__.

Relative-deps adds a link to the component in the app. Then, when it comes to building the app, relative-deps will build the component and copy the distribution files to the node_modules directory. 

Just a note, when using relative-deps, the version number of the component must be incremented to see the local changes.

### Testing
The components should be tested in isolation. In a multi repo approach, the tests can be run in the same pipeline that publishes the component.

## The app
The application should be considerably smaller and only consist of a frame, menu and any authentical calls. 
As I mentioned earlier, Relative-deps should be used in the app to load local changes before they are published.

## A working example
A working example can be seen [here](https://markgregg.github.io/react-micro-front-ends/) 

The code is available  [here](https://github.com/markgregg/react-micro-front-ends)