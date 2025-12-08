# Deployment Guide

This guide covers how to deploy your portfolio to popular hosting platforms.

## Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and provides excellent support for Vite projects.

1.  **Push your code to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Sign up/Login to Vercel**: Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
3.  **Add New Project**:
    *   Click "Add New..." -> "Project".
    *   Import your `m-vivekananda---portfolio` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect `Vite`.
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build` (default)
    *   **Output Directory**: `dist` (default)
    *   **Environment Variables**:
        *   Add `GEMINI_API_KEY` with your actual API key value.
5.  **Deploy**: Click "Deploy".

## Option 2: Netlify

1.  **Push your code to GitHub**.
2.  **Sign up/Login to Netlify**: Go to [netlify.com](https://netlify.com).
3.  **Add New Site**:
    *   Click "Add new site" -> "Import from existing project".
    *   Connect to GitHub and select your repository.
4.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Go to "Site settings" -> "Environment variables".
    *   Add `GEMINI_API_KEY`.
6.  **Deploy**: Click "Deploy site".

## Option 3: GitHub Pages

To deploy to GitHub Pages, you need to make a small change to your configuration.

1.  **Update `vite.config.ts`**:
    Add the `base` property with your repository name.
    ```typescript
    export default defineConfig({
      base: '/your-repo-name/', // Replace with your actual repo name
      // ... rest of config
    })
    ```

2.  **Create a Deploy Script**:
    Create a file named `deploy.sh` in your project root:
    ```bash
    #!/usr/bin/env sh
    # abort on errors
    set -e
    # build
    npm run build
    # navigate into the build output directory
    cd dist
    # if you are deploying to a custom domain
    # echo 'www.example.com' > CNAME
    git init
    git checkout -b main
    git add -A
    git commit -m 'deploy'
    # if you are deploying to https://<USERNAME>.github.io/<REPO>
    # git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
    cd -
    ```

3.  **Run the script**:
    Run `sh deploy.sh` (Git Bash recommended on Windows).
