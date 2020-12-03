# Status Bar Environmen Display

Just a simple extension of Visual Studio Code to just show the value of one ENV variable.

It reads the ${projectPath}/.env file content and shows the value of the ENVIRO variable.
Clicking on the StatusBarItem reloads the file and shows new values.
Be careful, this will not change the environment variable. Restart VSC for that!

This is my first Visual Studio Code extension and also my first lines of Typescript. Bear with me... ;)

## create a private packe

Use `vsce` tool in the project root directory to create a .vsix file:

```bash
npm install -g vsce
vsce package
```

## install it in a Docker devcontainer VSC project

In the .devcontainer/devcontainer.json add following;

```JSON
    ...
    // Add the IDs of extensions you want installed when the container is created.
    "extensions": [
    "/tmp/env-monitor-0.0.1.vsix"
    ],
    ...
```

In the .devcontainer/Dockerfile add:

```Dockerfile
COPY env-monitor-0.0.1.vsix /tmp/
```

This is a bit hacky, but it works for now.
