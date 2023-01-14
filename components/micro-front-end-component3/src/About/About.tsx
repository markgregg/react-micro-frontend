import "./About.css";
import structure from "../images/structure.png";

const About = () => {
  return (
    <div
      className="about"
    >
      <h1>A micro frontend approach for JavaScript</h1>
      <h2>Intro</h2>
      <p>For those of you don’t who know what a micro frontend is – it's an architecture, in which the UI is decomposed into individual, loosely coupled components that can be built, tested, and deployed independently. A parallel is the microservices architecture, where the backend is divided into individual services.</p>

      <p>The approach I am taking is aimed at doing what is best for the UI, and focused on productivity. What do I mean by that? Well, one of the key benefits of microservices is they can be written in any language and hosted independently. For a UI this is not necessarily a great, for two reasons.</p>
      <ul>
      <li>The first reason is down to UX. If different components of the same UI are hosted independently, then it is harder to leverage style. Yes, stylesheets can be provided by a library, but it’s extra work and what if the user wants a light/dark mode switch. Of course, it is possible, but it comes at a higher cost. </li>
      <li>-	The second reason, is baggage. If the UI components are delivered in a single package, then the dependencies are shared, and overall the size is far smaller. This results in less time spent initialising and faster performance.</li>
      </ul>
      <h2>The approach</h2>
      <p>The approach I am promoting is to divide the application into components, that are developed, tested and published independently. The components are then incorporated back into an app before the app is deployed.</p>

      <p>When setup correctly, the approach adds little terms of overhead and has almost all the benefits of the micro frontend architecture, combined with the benefits of JavaScript. </p>

      <p>In practical terms the approach involve creating a component for every page or content panel. For example, a typically application would have a menu bar, in which  each option loads a separate page. In the approach, each of these pages would be a separate component. The menu and all general functionality would remain in the app.</p>

      <p>The approach has the following benefits</p>
      <ul>
      <li>Easy to maintain, as the source code is divided and entry points are easier to identify</li>
      <li>Parallel development of components is easier than in a monolithic app</li>
      <li>More performant than hosting components independently</li>
      <li>Keep a uniform style across the UI is easier than when host independently </li>
      </ul>
      <h2>Project structure</h2>
      <p>The structure of the project would look as follows-</p>
      <img src={structure} width="400px"/>
      <p>The structure may look like a mono repo, but that is only because the above is an example. In an actual project, the app and components would be separate repos.</p>

      <h2>Components</h2>

      <p>When breaking out elements of a UI into separate components, there is a great deal less to think about than if they were to be hosted independently. There are still a few things to consider, and below is a list the main points.</p>

      <h3>How to style</h3>

      <p>One of the benefits of not hosting the component independently, is the ability to leverage style from the parent. In my opinion, the best way to achieve this, is to give each component its own stylesheets and to drive the stylesheets from variables. This will allow the component to be developed independently, while at the same time, allowing the look and feel to be controlled form the parent.</p>

      <h4>Parent stylesheet</h4>
      <p>{`{`}
        --color: white; <br/>
        --backgroundColor: black; <br/>
        --fontSize: small; <br/>
      {`}`}
      </p>

      <h4>Component stylesheets</h4>
      <p>
      .element {`{`} <br/>
        color: var(--color); <br/>
        background-color: var(--backgroundColor); <br/>
        font-size: var(--fontSize); <br/>
      {`}`}
      </p>
      <p>Tackling style like this also allows easy retheming, as the variables can be updated dynamically.</p>

      <h3>Dependencies</h3>
      <p>All shared dependencies should be peer and dev dependencies. By making them peer and dev dependencies, it will be easier to control the versioning and will simplify things when it comes to upgrading.</p>

      <p>
        "peerDependencies": {`{`}
          "react": "^18.2.0", <br/>
          "react-dom": "^18.2.0", <br/>
          "dependency": "^1.0.1" <br/>
        {`}`},
      </p>
      <p> 
        "devDependencies": {`{`}
          "react": "^18.2.0", <br/>
          "react-dom": "^18.2.0", <br/>
          "dependency": "^1.0.1" <br/>
        {`}`}
      </p>
      <h3>Publishing</h3>
      <p>To publishing the components, rollup is recomended. Rollup has numerous averages over webpack for component publications - simple configuration, better tree shaking and minimum size bundles. </p>

      <h3>Visualising</h3>
      <p>Publishing components to visualise changes is not ideal. Apart from slowing down development, it also results in unnecessary versions. To overcome this problem, there is a handy library called <b>relative-deps</b>.</p>

      <p>Relative-deps adds a link to the component in the app. Then, when it comes to building the app, relative-deps will build the component and copy the distribution files to the node_modules directory. </p>

      <p>Just a note, when using relative-deps, the version number of the component must be incremented to see the local changes. The component can updated run while the app is running by executing the prepare command</p>

      <h3>Testing</h3>
      <p>The components should be tested in isolation. In a multi repo approach, the tests can be run in the same pipeline that publishes the component.</p>

      <h2>The app</h2>
      <p>The application should be considerably smaller and only consist of a frame, menu and any authentical calls. </p>
      <p>As I mentioned earlier, Relative-deps should be used in the app to load local changes before they are published.</p>

      <h2>The code</h2>

      <p>The code is available <a href="https://github.com/markgregg/react-micro-front-ends">here</a></p>
    </div>
  );
};

export default About;
