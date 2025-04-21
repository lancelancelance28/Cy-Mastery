

#  Website Automation with Cypress

This is a sample test automation project for **Saucedemo Swag Labs** using the **Cypress** framework. It contains tests for the **Login** functionality and offers flexibility to run them in **headless** and **headed** modes. 🌐

## 📚 Table of Contents

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---

## 🛠️ Installation

### 1. Create a Project Folder
- Create a folder for your project, called `Cypress Projects` on your Desktop (or another location of your choice).

  **Windows:**
  - Right-click on your Desktop, select "New Folder," and name it `Cypress-Projects`.

  **Mac/Linux:**
  - Open your terminal and run the following command to create the folder:

    ```bash
    mkdir "Cypress Projects"
    ```

### 2. Clone the Repository
Navigate to the `Cypress Projects` folder and clone the repository:

```bash
cd ~/Desktop/"Cypress Projects"
git clone https://github.com/lancelancelance28/Cy-Mastery.git
```

### 3. Install Dependencies
Change into the project directory and install the necessary dependencies:

```bash
cd Cy-Mastery
npm install
```

---

## 🏃‍♂️ Running the Tests

The test suite includes a login feature test that can be executed in both **headless** and **headed** modes.

### 🧑‍💻 Headless Mode (No Browser UI)

Run all the tests in headless mode to execute the test without launching the browser's UI, for faster execution:

```bash
npx cypress run
```

### 🖥️ Headed Mode (With Browser UI)

In **headed mode**, the browser runs with a visible UI. This is useful for debugging and visual confirmation of test actions. To run the login test in headed mode:

```bash
npx cypress open
```

---

## ✨ Features

- **Headless Mode:** Runs the tests without opening the browser window, speeding up the test execution.
- **Headed Mode:** Runs the tests with the browser window open, which is helpful for debugging and visually verifying the test actions.

---
### Version

- **This runs in Cypress Version 14.2.1 and Node Version v22.14.0** 