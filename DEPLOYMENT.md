# Environment Variables — Deployment Reference

## Backend (Render)

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `MONGODB_DB` | Database name | `klinton` |
| `ALLOWED_ORIGIN` | Your Vercel frontend URL (for CORS) | `https://your-site.vercel.app` |
| `PORT` | Port to listen on (Render sets this automatically) | `4000` |

## Main App (Vercel)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Full URL of your Render backend | `https://nadon-backend.onrender.com` |
| `NIBGATE_SITE_ORIGIN` | Full URL of your Vercel main site | `https://your-site.vercel.app` |
| `NIBGATE_SECRET` | Secret key for Nibgate token signing | any random string |
| `NIBGATE_PAYMENT_NETWORK` | Chain ID | `eip155:5042002` |

## Admin App (Vercel)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Full URL of your Render backend | `https://nadon-backend.onrender.com` |
| `ADMIN_USERNAME` | Login username | `nadon` |
| `ADMIN_PASSWORD` | Login password | your password |

---

## Step-by-Step Deployment

### 1. MongoDB Atlas (free)
1. Go to https://cloud.mongodb.com and create a free account
2. Create a free **M0** cluster
3. Create a database user with read/write access
4. Whitelist `0.0.0.0/0` in Network Access (allows Render to connect)
5. Click **Connect > Drivers** and copy the connection string
6. Replace `<password>` with your database user password

### 2. Render Backend
1. Push this repo to GitHub
2. Go to https://render.com and create a new **Web Service**
3. Connect your GitHub repo
4. Set Root Directory to `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables from the table above
8. Deploy — note the URL (e.g. `https://nadon-backend.onrender.com`)

### 3. Vercel — Main App
1. Go to https://vercel.com and import your GitHub repo
2. Set Root Directory to `.` (the root)
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Add environment variables from the table above

### 4. Vercel — Admin App
1. Import the same GitHub repo again as a separate project
2. Set Root Directory to `admin-app`
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Add environment variables from the table above
