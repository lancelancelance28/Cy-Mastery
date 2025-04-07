# Saucedemo Website Automation with Cypress 🚀

This test automation sample project contains **Saucedemo Swag Labs** using **Cypress**  framework for testing. It includes tests for the **Login**  features with the flexibility to run them in **headless** and **headed** modes. 🌐

## Table of Contents 📚

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---

## Installation 🛠️

### 1. Create a Project Folder
- First, create a project folder named Cypress Projects on your Desktop (or in your preferred location):

- Windows: Navigate to your Desktop, right-click, and select New Folder. Name it Cypress-Projects.

- Mac/Linux: Open your terminal and run the following command to create a folder:

```bash
mkdir Cypress Projects
```
### 2. Clone the Repository

```bash
cd ~/Desktop
cd "Cypress Projects"
git clone https://github.com/lancelancelance28/Cy-Mastery.git
```
### 3. Install Dependencies

```bash
cd Cy-Mastery
npm install
```

## Running the Tests 🏃‍♂️
- We have spec file (a Test Code/File) Login features, and they can be run in both headless and headed modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

Login Test (Headless)
- To run the login test in headless mode:

```bash
npm run login-test
```

### Headed Mode 🖥️ (With Browser UI)
- In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions.

Login Test (Headed)
- To run the login test in headed mode:

```bash
npm run test
```

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the Saucedemo Website
- **Headless Mode**: Run the tests without opening the browser window for faster execution.
- **Headed Mode**: Run the tests with the browser window open, useful for debugging and visual checks.


