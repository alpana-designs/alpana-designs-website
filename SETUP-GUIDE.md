# Alpana Designs Website — Setup & Maintenance Guide

This guide walks you through setting up the website on your computer, making changes, and publishing them online.

You do **not** need to do anything on GoDaddy. The domain is already connected.

---

## Important accounts (fill these in)

Keep this section private. Do not share it publicly.

| Service | Website | Username / Email | Password | Notes |
|---------|---------|------------------|----------|-------|
| GitHub | https://github.com | admin@alpanas.design| Amey#9753 | Code is stored here |
| Netlify | https://app.netlify.com | admin@alpanas.design | Amey#97531 | Website hosting |
| Cursor (editor) | https://cursor.com | ________________ | ________________ | Optional paid account; free is fine to start, create account |

**GitHub repository:**  
https://github.com/alpana-designs/alpana-designs-website

**Live site:** hosted on Netlify (already connected)

---

## How the workflow works (read this once)

Think of it like drafts and a final published version:

1. You make changes on your computer.
2. You save those changes to the **`develop`** branch on GitHub (this is the working / draft branch).
3. When you are happy with the changes, you merge **`develop`** into **`main`**.
4. Netlify watches **`main`**. When `main` updates, Netlify rebuilds and publishes the live website automatically.

**Rule of thumb:**  
Work and push to `develop`. Only update `main` when you want the live site to change.

---

## Part 1 — One-time setup on your computer

Do these steps once. After that, day-to-day work is much shorter (see Part 2).

### Step 1: Install Cursor (the code editor)

1. Go to: https://cursor.com
2. Download Cursor for your computer (Mac or Windows).
3. Install it and open it.
4. Sign in if prompted (optional at first).

> Cursor looks similar to VS Code. You will use it to open the project folder and edit files.

### Step 2: Install Node.js

Node.js lets the website run on your computer while you edit it.

1. Go to: https://nodejs.org
2. Download the **LTS** version (recommended).
3. Install it with the default options.
4. Restart Cursor after installing.

**Check it worked:**

1. In Cursor, open the Terminal:
   - Mac: `Terminal → New Terminal`, or press `` Ctrl + ` ``
   - Or go to the menu: **View → Terminal**
2. Type this and press Enter:

```bash
node -v
```

You should see something like `v20.x.x` or `v22.x.x`.

Then type:

```bash
npm -v
```

You should see a version number (for example `10.x.x`).

If both show version numbers, you are good.

### Step 3: Install Git

Git is how your computer talks to GitHub.

**Mac:**

1. Open Terminal and type:

```bash
git --version
```

2. If Mac asks to install developer tools, click **Install** and wait.
3. Run the command again. You should see a version number.

**Windows:**

1. Go to: https://git-scm.com/download/win
2. Download and install Git (default options are fine).
3. Restart Cursor.
4. In Terminal, run:

```bash
git --version
```

You should see a version number.

### Step 4: Sign in to GitHub on your computer

You need access to the repository:  
`alpana-designs/alpana-designs-website`

Easiest options:

**Option A — GitHub Desktop (recommended if you are new to Git)**

1. Download: https://desktop.github.com
2. Install and sign in with the GitHub account above.
3. You can use GitHub Desktop for cloning, committing, and pushing (see notes below).

**Option B — Sign in through Cursor / browser**

When you clone or push for the first time, GitHub may ask you to sign in in the browser. Use the GitHub username/password (or passkey / 2FA) from the accounts table.

### Step 5: Download (clone) the project

1. Open Cursor.
2. Open the Terminal in Cursor.
3. Go to the folder where you want to keep the project, for example Documents:

```bash
cd ~/Documents
```

4. Clone the repository:

```bash
git clone https://github.com/alpana-designs/alpana-designs-website.git
```

5. Enter the project folder:

```bash
cd alpana-designs-website
```

6. Switch to the working branch (`develop`):

```bash
git checkout develop
```

7. Open the folder in Cursor:
   - **File → Open Folder…**
   - Select the `alpana-designs-website` folder
   - Click Open

### Step 6: Install project packages

Still in the Terminal, inside the project folder, run:

```bash
npm install
```

This can take a few minutes the first time. Wait until it finishes.

You only need to run this again later if someone adds new packages, or if `npm run dev` complains about missing modules.

### Step 7: Start the website on your computer

In the Terminal, run:

```bash
npm run dev
```

You should see something like:

```text
Local: http://localhost:5173/
```

1. Hold `Command` (Mac) or `Ctrl` (Windows) and click that link, **or**
2. Open your browser and go to: http://localhost:5173

You should see the Alpana Designs website running locally.

**To stop the local server later:**  
Go back to the Terminal and press `Ctrl + C`.

---

## Part 2 — Everyday workflow (making changes)

Use this whenever you want to update text, images, layout, etc.

### Step 1: Open the project and update to the latest code

1. Open Cursor.
2. Open the `alpana-designs-website` folder.
3. Open Terminal.
4. Make sure you are on `develop`:

```bash
git checkout develop
```

5. Download the latest changes from GitHub:

```bash
git pull origin develop
```

### Step 2: Start the local preview

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

Keep this running while you edit. When you save a file, the browser usually updates automatically.

### Step 3: Make your edits

Most day-to-day content lives under the `src` folder.

Common places:

- `src/app/App.tsx` — main pages and a lot of the site content
- `src/styles/` — colors, fonts, theme
- `public/` — images/files that are served as-is (like logos / social preview images)
- `src/imports/` — imported assets like the logo

Tips:

- Make one change at a time when possible.
- Save the file (`Command + S` / `Ctrl + S`).
- Check the browser to confirm it looks right on desktop and phone-sized window.
- If something breaks, stop and undo (`Command + Z` / `Ctrl + Z`), or ask for help before pushing.

### Step 4: Save your work with Git (commit)

When you are happy with the local preview:

1. Stop and check what changed:

```bash
git status
```

2. Stage the files you changed:

```bash
git add .
```

3. Commit (save a snapshot with a short message):

```bash
git commit -m "Update homepage text"
```

Use a clear message that describes what you changed, for example:

- `Update contact email`
- `Replace studio page photos`
- `Fix mobile spacing on work page`

### Step 5: Upload your work to GitHub (`develop`)

```bash
git push origin develop
```

This updates the draft branch on GitHub.  
At this point, the **live website has not changed yet**.

---

## Part 3 — Publishing to the live website

Netlify deploys from the **`main`** branch.

When your changes on `develop` are ready to go live:

### Option A — Publish using GitHub website (easiest)

1. Go to: https://github.com/alpana-designs/alpana-designs-website
2. Click the branch dropdown (it may say `main` or `develop`) and select **`develop`** if needed, just to confirm your latest commits are there.
3. Open a Pull Request from `develop` → `main`:
   - Click **Contribute** / **Compare & pull request**, or
   - Go to the **Pull requests** tab → **New pull request**
   - Set base: `main`
   - Set compare: `develop`
4. Create the pull request.
5. Click **Merge pull request**, then confirm.

After merging:

1. Go to Netlify: https://app.netlify.com
2. Open the Alpana Designs site.
3. Watch **Deploys**. A new deploy should start automatically.
4. Wait until it says **Published**.
5. Open the live website and check your changes.

### Option B — Publish using Terminal

Only if you are comfortable with this:

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
git checkout develop
```

Then check Netlify deploys as above.

---

## Quick command cheat sheet

Run these from inside the `alpana-designs-website` folder.

| What you want | Command |
|---------------|---------|
| Go to working branch | `git checkout develop` |
| Get latest draft code | `git pull origin develop` |
| Install packages | `npm install` |
| Preview site locally | `npm run dev` |
| See what changed | `git status` |
| Stage all changes | `git add .` |
| Save a snapshot | `git commit -m "Your message here"` |
| Upload draft to GitHub | `git push origin develop` |
| Build production version (optional check) | `npm run build` |

---

## What Netlify does (no action needed most days)

- Netlify is already connected to this GitHub repo.
- It builds from the **`main`** branch.
- Build command: `npm run build`
- Publish folder: `dist`
- Node version: 20

You usually do **not** need to change Netlify settings.

If a deploy fails:

1. Open the failed deploy in Netlify.
2. Read the error log.
3. Most common fix: make sure the same change still works locally with `npm run build`.
4. If stuck, send the error screenshot/log to whoever helps with technical support.

---

## Simple “do / don’t” list

**Do**

- Work on `develop`
- Preview with `npm run dev` before pushing
- Push to `develop` often
- Merge to `main` only when ready for the public site
- Write short clear commit messages

**Don’t**

- Don’t edit directly on `main` unless you know you want an immediate live deploy
- Don’t change GoDaddy DNS settings
- Don’t delete the `node_modules` folder unless someone asks you to (you can always recreate it with `npm install`)
- Don’t commit passwords or private notes into the repo
- Don’t panic if the Terminal looks scary — copy the error text and ask for help

---

## Common problems

### “command not found: npm” or “node”
Node.js is not installed, or Cursor was not restarted after install. Reinstall Node LTS and restart Cursor.

### “Permission denied” or GitHub login errors
You are not signed in, or your GitHub account does not have access to the repo. Sign in again and confirm you can open the repo in the browser.

### `npm run dev` fails after pulling new code
Run:

```bash
npm install
```

then try again:

```bash
npm run dev
```

### I made a mistake and want to undo uncommitted edits
If you have **not** committed yet, in Cursor you can usually right-click a file → discard changes, or use undo in the editor. Ask for help before running any “reset” Git commands.

### My changes are on GitHub (`develop`) but the live site looks the same
That is expected. Merge `develop` into `main`, then wait for Netlify to finish deploying.

### The local site won’t open
Make sure `npm run dev` is still running in the Terminal, then open http://localhost:5173 again.

---

## Suggested first practice run

After setup, do this once so the flow feels familiar:

1. `git checkout develop`
2. `git pull origin develop`
3. `npm run dev`
4. Make a tiny harmless text change locally
5. Check it in the browser
6. `git add .`
7. `git commit -m "Test edit"`
8. `git push origin develop`
9. Confirm the commit appears on GitHub under the `develop` branch
10. Only merge to `main` if that test edit should go live

---

## Need help later?

When asking for help, include:

1. What you were trying to do
2. The exact command you ran
3. A screenshot or copy of the Terminal / Netlify error
4. Whether the problem is local preview, GitHub, or the live site
