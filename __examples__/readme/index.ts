import { Component, Document, render } from "./../..";
import View from "./view";
// Bind components to real window-object by special class `Document`
Component.setDocument(new Document({
    window,
}));
// Instance of view
const view = new View();
// Render into container #root
render(view, document.getElementById("root") as HTMLElement);
