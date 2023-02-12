import { buildInboxSection } from "./inbox";
import "./style.css";

const contentDiv = document.getElementById("content");
// currentTab = Inbox, Today, This week, Project
let currentTab;

function buildPage() {
  // ----------- Header ----------
  const header = document.createElement("header");

  const heading1 = document.createElement("h1");
  heading1.textContent = "Todo List";

  header.appendChild(heading1);
  header.classList.add("header");

  // ------------ Main ----------
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main");

  // --- Nav Bar ---
  const navBar = document.createElement("div");
  navBar.classList.add("nav-bar");

  const inboxTab = document.createElement("div");
  inboxTab.classList.add("tab");
  inboxTab.textContent = "Inbox";

  const todayTab = document.createElement("div");
  todayTab.classList.add("tab");
  todayTab.textContent = "Today";

  navBar.appendChild(inboxTab);
  navBar.appendChild(todayTab);

  // Add projects later...

  // -- Task Container ---
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  buildInboxSection(taskContainer);
  currentTab = inboxTab;
  styleTab(inboxTab);

  mainDiv.appendChild(navBar);
  mainDiv.appendChild(taskContainer);

  // ------------- Footer ----------
  const footer = document.createElement("footer");

  const footerText = document.createElement("p");
  footerText.textContent = "Copyright © The Odin Project 2023";

  footer.appendChild(footerText);

  footer.classList.add("footer");

  // -------------------------------

  contentDiv.appendChild(header);
  contentDiv.appendChild(mainDiv);
  contentDiv.appendChild(footer);

  // ----- Event Listeners for Tabs -------
}

// Helper function to clear main div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Helper function to style tab, while removing style from current tab
function styleTab(newTab) {
  currentTab.style.backgroundColor = "inherit";
  currentTab.style.fontWeight = "inherit";
  newTab.style.backgroundColor = "#ccc";
  newTab.style.fontWeight = "bold";
}

buildPage();
