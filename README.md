# Sharkquila ui demo

This project is an in-depth description of npm package [sharkquila_ui_toolkit](https://github.com/enw860/sharkquila_ui_toolkit).

## What can you expect from this project?

You could threat this project as a playground of seeing how the toolkits performed in run time environment as well as copy and paste the code snippet in your app as a quick startup.

As per UI components listed in the navigation bar at the site, it will describe the component in following dimentions:

* Overview: The designiated use cases for the control.
* Live demo: The demonstration of the control in run time.
* Controls: Part of the configeration options used for manipulate the control.
* Code: The actual code for configure the target control.
* Settings: All of the configurable fields with default values.
* Events: Desiginated events that could be bind to the control. (if any)
* Methods: Buildin functions that could be called by referring the control. (if any)

## Build (Docker image)

```bash
docker run \
    -d \
    -p 8080:<PORT> \
    --name <CONTAINER_NAME> \
    wulionel/sharkquila_ui:latest
```

## Build (local)

Environment setup:
```bash
npm i
```

Launch in production mode:
```bash
npm start
```

Launch in production mode (Docker):
```bash
make
```

Launch in dev mode:
```bash
npm run dev
```