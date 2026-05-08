# SupplyAI Ultimate Demo

A complete local project with:
- login and register
- JWT based auth
- CSV upload
- inventory CRUD
- dashboard analytics
- prediction, recommendations, alerts and reports
- premium modern animated UI

## Folder structure
- `Backend` -> Node.js + Express API
- `Frontend` -> HTML, CSS, JavaScript pages

## Full installation process

### 1) Install Node.js
Download **Node.js LTS** from the official website and install it.

After installation, restart VS Code.

### 2) Check Node.js and npm
Open terminal and run:

```bash
node -v
npm -v
```

If both show versions, Node is installed correctly.

### 3) Fix PowerShell npm permission issue on Windows
If you get this error:

```bash
npm.ps1 cannot be loaded because running scripts is disabled
```

Open **Windows PowerShell as Administrator** and run:

```powershell
Set-ExecutionPolicy RemoteSigned
```

Press `Y` and Enter.

Then close PowerShell and reopen VS Code.

### 4) Open the backend folder
In VS Code terminal:

```bash
cd Backend
```

If you are already inside `Backend`, do not run it again.

### 5) Install backend packages

```bash
npm install
```

### 6) Start backend server

```bash
node server.js
```

You should see:

```bash
Server running on http://localhost:5000
```

Keep this terminal open.

### 7) Open the frontend
Install the VS Code extension **Live Server**.

Then:
- open `Frontend/login.html`
- right click
- choose **Open with Live Server**

### 8) Register and login
1. Open `register.html`
2. Create your account
3. Open `login.html`
4. Login with the same email and password

### 9) Upload data
Use `Frontend/sample_template.csv` or create your own CSV with these columns:

```csv
product,category,stock,sold,last_sold_date,expiry_date,price
```

### 10) Use all pages
- `index.html` -> dashboard
- `upload.html` -> upload CSV
- `inventory.html` -> manage products
- `prediction.html` -> forecast view
- `recommend.html` -> smart suggestions
- `alerts.html` -> low stock and expiry alerts
- `reports.html` -> report snapshot
- `profile.html` -> update profile

## Important notes
- This is a local demo project
- Data is stored in `Backend/data/db.json`
- Use `localhost:5000` for backend
- Use Live Server for frontend pages
- Register first before login

## If login or upload shows "Failed to fetch"
Check these:
1. backend server is running
2. browser opens `http://localhost:5000/`
3. Node packages are installed
4. frontend is opened from Live Server

## Demo flow for presentation
1. Register
2. Login
3. Upload CSV
4. Show dashboard stats
5. Show inventory table
6. Show prediction and recommendations
7. Show alerts and reports
