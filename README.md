# Describo crate builder web component development

- [Describo crate builder web component development](#describo-crate-builder-web-component-development)
  - [2 x vite config](#2-x-vite-config)
  - [Repository layout](#repository-layout)
    - [Cleanups](#cleanups)
  - [wc-test-app-react](#wc-test-app-react)
  - [Next Steps](#next-steps)

This repo is to try and figure out how to get the crate builder built as a fully functioning web
component. It is based on the pull request created by @beepsoft @
https://github.com/describo/crate-builder-component/pull/28 but without the full crate builder
inside it. This is really about figuring out how to wire it all up and how that works inside an
external env like a react app.

## 2 x vite config

It doesn't make sense having a webpack based development system for the vue component and then a
vite based build system to produce the web component so the first thing I did was remove the webpack
system. (I've been moving to vite across my projects so migrating this to vite makes a lot of
sense.) The vite config to run the vue application is `vite.config.js` and the one to build the web
component library is `vite.wc.config.js`.

-   To start the dev env: `npm run develop`
-   To build the vue and web component libraries (they go into the `dist folder`): `npm run build`.

When you build the libraries dist will look like:

```
dist
├── vue
│   ├── describo-crate-builder.mjs
│   ├── describo-crate-builder.umd.js
│   └── style.css
└── web-component
    ├── describo-crate-builder-wc.mjs
    ├── describo-crate-builder-wc.umd.js
    └── style.css

2 directories, 6 files
```

## Repository layout

The repo layout is like the original layout - just simplified for the sake of this work.

-   `./src/app` is the vue js app
-   `./src/app/crate-builder` is the describo component
-   `./src/app/crate-builder/index.js` is the vue plugin entry point
-   `./src/app/crate-builder/index.wc.js` is the webcomponent plugin entry point

Things to note:

-   There are two `Shell.components` in src/crate-builder. The file `Shell.component.vue` is the
    original one that I wrote. I've removed the additions to that file (parsing crate / profile back
    into objects from strings and the style stuff at the bottom. That file should not be edited.
-   The other one is for the webcomponent build: `Shell.component.wc.vue`. If there is some data pre
    handling that needs to be done in the web component then do it here. Then, pass the data in the
    expected form to my component: ie convert the string to an object then pass that object to
    Shell.component.vue. That way we keep the relevant bits nice and separate from each other. I've
    also renamed it to `wc` from `ce` just to keep the naming consistent.
-   I couldn't see anything in the config anywhere that required the files to be renamed as `ce`. It
    doesn't seem necessary to me either. Provided you have an entry point to the webcomponent
    (index.wc.js) then it shouldn't matter what gets pulled in from there as it will all be
    rewritten when it's bundled anyway (npm run build).

### Cleanups

-   You don't need to build the full tailwind css or directly import all of font awesome. The build
    step will bundle everything that's needed into styles.css in the dist folder. So, all of that
    stuff has been removed.
-   The style imports that were in the `style` section of `Shell.component.vue` are now pulled into
    index.wc.js.

## wc-test-app-react

Before you try and wire it up you need to build the libs: `npm run build`. They aren't checked in to
the repo.

The app has been copied in but I don't know react so I don't know what is required to import the
webcomponent in the dist folder into the app. When you sort that out you should see the following:

![app screenshot](app%20screenshot.png)

This is what you see when you start the vue app for development with `npm run develop`. If you get
this then you've imported the web component which has imported the main shell component which has
then imported the render entity shell component. That means it should all work as expected. Note
that these components have their original name (no ce in the name)

## Next Steps

If you can get this built web component into the react app and showing as it does in the vue app
then the next thing you need to figure out is how to pass data into it from the containing env (ie
react -> webcomponent). If we can't sensibly pass the crate, profile, all of the config properties
and the lookup class then this won't work. The lookup class is especially important as that is how
the component calls out to the containing env to do data lookups for it. If you can't get this into
the component then it loses a key piece of functionality.

Currently, using attributes means you need to stringify and then parse inside. That will work for
the crate and the profile but what about all of the config properties and the lookup class? There's
a good blog post explaining different ways of getting data into web components @
https://itnext.io/handling-data-with-web-components-9e7e4a452e6e. I suggest you look at doing it via
properties. If you need to stringify / parse things, then the parse should be done inside
`Shell.component.wc.vue` and the parsed object passed to my code.
`DON'T do it inside my code as I won't accept the pull request`.
