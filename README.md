Link to live site : https://geass-code.vercel.app/  
Link to VsCode Extention : https://marketplace.visualstudio.com/items?itemName=CodeGeass.codegeass
 # CodeGeass: AI-Powered Code Analysis and Execution

## Overview

CodeGeass is a web-based platform that allows users to write, analyze, and execute code with the help of a Large Language Model (LLM). It features a code editor, authentication system, and AI-powered code analysis. The project is built using React for the frontend and Django for the backend.

## Features

- **Code Editor**: Write and execute code in various programming languages.
- **AI Code Analysis**: Get step-by-step solutions and explanations from an LLM.
- **User Authentication**: Sign up, log in, and manage user sessions.
- **Syntax Highlighting**: Provides an enhanced coding experience.
- **Backend API**: Handles user authentication and AI-powered code analysis.

## Tech Stack

### Frontend

- React
- React Router
- CSS Modules

### Backend

- Django
- Django Rest Framework
- SQLite (or other databases)

---

## Folder Structure

```
CodeGeass/
├── api/                    # Django app for API endpoints
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializer.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│
├── backend/                # Django project root
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── CodeEditor.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SignUpPage.js
│   │   │   ├── Header.js
│   │   │   ├── RunCode.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   ├── css/
│   │   │   ├── App.css
│   │   ├── App.js          # Main React app
│   │   ├── index.js
│
├── .env                    # Environment variables
├── .gitignore
├── db.sqlite3               # Database file
├── manage.py                # Django management script
├── package.json             # Frontend dependencies
└── README.md
```

---

## Setup and Installation

### Backend Setup

```sh
# Navigate to the backend directory
cd backend

# Create a virtual environment and activate it
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Apply migrations and start the Django server
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

---

## API Endpoints

- `POST /api/generate/` - Sends a prompt and code to the AI model for analysis.
- `POST /api/auth/login/` - User login endpoint.
- `POST /api/auth/signup/` - User registration endpoint.

---

## Usage

1. Run the backend and frontend servers.
2. Open `http://localhost:3000` in your browser.
3. Sign up or log in to access the code editor.
4. Write and analyze code using the AI assistant.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit changes and push to GitHub.
4. Open a pull request.

# CodeGeass VScode Extension

## Features
- **AI-Powered Code Analysis**: Get insights and explanations for selected code snippets.
- **Code Recommendations**: Receive suggestions for improving code quality, efficiency, and readability.
- **Seamless Integration**: Works directly within VS Code with a simple selection.
- **Supports Multiple Languages**: Works with various programming languages like Python, JavaScript, C++, and more.

## Installation
1. Install the extension from the **VS Code Marketplace** (or manually via `.vsix` file).
2. Ensure **Node.js** is installed on your system.
3. Run the following command to install dependencies:
   ```sh
   npm install
   ```

## Usage
1. **Select a code snippet** in your VS Code editor.
2. **click** on top-right button named `Use Geass` .
3. The extension sends the snippet to the LLM API for analysis.
4. View the suggestions and improvements in the output panel.


## Permissions
This extension requires an internet connection to send code snippets to the AI model for analysis. No data is stored locally or shared beyond the configured API.

# Chrome Extension Installation Guide

## Download & Install

Follow these steps to install the Chrome extension from GitHub (without publishing it to the Chrome Web Store).

### 1️ Download the Extension

- Go to the GitHub repository: [(https://github.com/utsav1072/CodeGeass/tree/main/ChromeGeass)]
- Click **Code** → **Download ZIP**
- Extract the ZIP file on your computer

### 2️ Load the Extension in Chrome

- Open Google Chrome
- Go to `chrome://extensions/`
- Enable **Developer Mode** (toggle in the top right corner)
- Click **Load unpacked**
- Select the extracted folder containing `manifest.json`

The extension will now be installed and appear in the toolbar.

### 3️ Using the Extension

- Click the extension icon in the toolbar to open the popup
- If the extension interacts with specific websites (like LeetCode), ensure it has the correct permissions in `manifest.json`

### 4️ Updating the Extension

If a new version is available:
- Delete the old version from `chrome://extensions/`
- Re-download and extract the latest ZIP from GitHub
- Reload it using **"Load unpacked"**

## Troubleshooting

- **Extension not appearing?** Ensure Developer Mode is enabled and `manifest.json` is present.
- **Permission issues?** Check Chrome's settings to allow necessary permissions.
- **Errors in console?** Open Chrome Developer Tools (F12 → Console) to debug.

##  Need Help?

Open an issue on GitHub!

