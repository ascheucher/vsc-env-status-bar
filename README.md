# Status Bar Environmen Display

Just a simple extension of Visual Studio Code to just show the value of one ENV variable.

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
