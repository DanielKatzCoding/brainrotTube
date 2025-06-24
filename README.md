# BrainRotTube

A full-stack TikTok-like video platform focused on "brainrot" content. This project is designed to practice and showcase full-stack development skills using Next.js (React, MUI) for the frontend and FastAPI for the backend.

## Features
- Videos with interactive controls (play/pause, seek, volume, mute)
- Keyboard shortcuts for video control
- Responsive, modern UI with Material UI (MUI) and dark mode
- Backend API for serving and paginating video files
- Video navigation/history (forward, backward, random)

## Tech Stack
- **Frontend:** Next.js (React, MUI, Emotion)
- **Backend:** FastAPI (Python)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.9+
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/DanielKatzCoding/brainrot-tube.git
cd brainrot-tube
```

#### 2. Install frontend dependencies
```sh
cd frontend
pnpm install
# or
npm install
```

#### 3. Install backend dependencies
```sh
cd ../backend
# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh
# Install backend dependencies (no dev dependencies)
uv sync
```

---

## Running the App

### 1. Start the backend (FastAPI)
```sh
cd backend
uv run app.py
```
- The backend will be available at `http://localhost:8000`

### 2. Start the frontend (Next.js)
```sh
cd frontend
pnpm dev
# or
npm run dev
```
- The frontend will be available at `http://localhost:3000`

---

## Deployment

### Frontend (Any Node Host)
- Build the frontend:
  ```sh
  pnpm build
  # or
  npm run build
  ```
- Deploy the `frontend/.next` output to your preferred Node.js host.

### Backend (Any Python Host/Cloud)
- Deploy the FastAPI app using `uv run app.py` or a compatible Python host/cloud service.
- Make sure to set the correct CORS and environment variables for production.

---

## Project Summary
This project aims to practice my full-stack skills. I will be making a TikTok-like platform that will focus on brainrot content. The app demonstrates modern React patterns, API integration, and a clean, interactive UI for video consumption.

---

## License
MIT
