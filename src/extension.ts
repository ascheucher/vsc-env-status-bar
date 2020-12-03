/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as fs from "fs";
import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar
  // item is selected
  const myCommandId = "ascheucher.showEnvironment";
  context.subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      updateStatusBarItem();
    })
  );

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  myStatusBarItem.command = myCommandId;
  context.subscriptions.push(myStatusBarItem);

  // update status bar item once at start
  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  const msg = getEnviroMessage();
  vscode.window.showInformationMessage(msg);
  myStatusBarItem.text = msg;
  myStatusBarItem.show();
}

function getEnviroMessage(): string {
  const envValue = getEnviroFromEnvFile();
  return `ENVIRO:  ${envValue}`;
}

function getEnviroFromEnvFile(): string {
  try {
    let enviro = "No .env file.";
    if (vscode.workspace.workspaceFolders) {
      for (const envUri of vscode.workspace.workspaceFolders) {
        const envFilePath = `${envUri.uri.path}/.env`;

        if (fs.existsSync(envFilePath)) {
          enviro = "is not set in .env file.";
          const data = fs.readFileSync(envFilePath, "UTF-8");
          const lines = data.split(/\r?\n/);
          lines.forEach((l) => {
            const tokens = l.split("=");
            if (tokens.length > 1) {
              const envVarName = tokens[0].trim();
              if (envVarName === "ENVIRO") {
                enviro = tokens[1].trim();
              }
            }
          });
          return enviro;
        }
      }
    }
    return enviro;
  } catch (e) {
    return ".env file parsig ERR.";
  }
}
