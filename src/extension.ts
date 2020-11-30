/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { env } from "process";
import { print } from "util";
import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;

export function activate( context:  vscode.ExtensionContext) {

  // register a command that is invoked when the status bar
  // item is selected
  const myCommandId = "ascheucher.showEnvironment";
  context.subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      vscode.window.showInformationMessage(getEnviroMessage());
    })
  );

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  myStatusBarItem.command = myCommandId;
  context.subscriptions.push(myStatusBarItem);

  // register some listener that make sure the status bar
  // item always up-to-date
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  // update status bar item once at start
  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  myStatusBarItem.text = getEnviroMessage();
  myStatusBarItem.show();
}

function getEnviroMessage(): string {
  // https://stackoverflow.com/questions/65080704/access-to-env-variables-defined-in-workspacefolder-env-files
  const path = process.env["PATH"];
  const envValue = process.env["ENVIRO"];
  vscode.window.showInformationMessage(`ENVIRO: ${envValue}`);
  
  if (envValue == "prod") {
    return `$(zap) ENVIRO:  ${envValue}`;
  } else {
    return `$(flame) ENVIRO:  ${envValue}`;
  }
}
