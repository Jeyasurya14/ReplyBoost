# ReplyBoost

A daily system that helps freelancers get more client replies.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Ant Design
- **Backend**: FastAPI, MongoDB, Python
- **AI**: OpenAI / Groq

## Quick Start

### 1. Configuration
1.  **Backend**: Rename `backend/.env` (if needed) and add your API keys:
    ```env
    GROQ_API_KEY=your_key_here
    ```
2.  **Frontend**: Check `frontend/.env.local`.

### 2. Run Locally

**Backend:**
```bash
cd backend
# Windows:
./venv/Scripts/Activate
# Install reqs if needed: pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Architecture
- `models/`: Database schemas (User, Proposal)
- `routes/`: API Enpoints (Auth, Generator, Income)
- `core/`: Config & AI logic

## Troubleshooting
- **Vercel 404**: Ensure "Root Directory" is set to `frontend` in Vercel Project Settings and **Redeploy**.
