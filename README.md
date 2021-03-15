# Sharkquila ui demo

This project is an in-depth description of npm package [sharkquila_ui_toolkit](https://github.com/enw860/sharkquila_ui_toolkit).

You can initiate your own project with this [template](https://github.com/enw860/sharkquila_quick_startup) as a quick startup. 

## What can you expect from this project?

You could use this site as a playground for seeing how the toolkits performed in run time environment, then you could copy and paste the code snippet in your app as a quick startup.

As per UI components listed in the navigation bar, it will describe the component in following dimentions:

* Overview: The designiated use cases for the control.
* Live demo: The demonstration of the control in run time.
* Controls: Part of the configeration options used for manipulate the control.
* Code: Vue code for fast startup.
* DOM structure: DOM structure of the current control.
* Settings: All of the configurable fields with default values.
* Slots: Available slots of the control. (if any)
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