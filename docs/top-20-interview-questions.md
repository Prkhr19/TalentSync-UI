# TalentSync Top 20 Interview Questions (Last-Day Revision)

Short, high-probability questions with concise answers for fresher interviews.

## 1) What is TalentSync?
TalentSync is a role-based job platform frontend where Candidates manage profile/applications and Admins manage companies, jobs, and applications.

## 2) Which stack did you use?
React + Vite + React Router + Axios + Tailwind CSS.

## 3) Why Vite?
Fast dev server, fast HMR, simpler build config, and good DX for React projects.

## 4) How did you implement authentication?
JWT token is stored in localStorage after login and attached to requests using Axios request interceptor.

## 5) How did you implement authorization?
`ProtectedRoute` checks token + role and allows route only for the permitted role.

## 6) What was wrong with the home route and how did you fix it?
Logged-in users still saw landing page at `/`. I added `HomeRedirect` to route by auth+role and used `<Navigate replace />`.

## 7) Why use `Navigate replace`?
To prevent browser history pollution so users cannot go back to an invalid previous route.

## 8) What is the purpose of Axios interceptors in your project?
Centralized auth header injection and centralized 401 handling (session clear + redirect).

## 9) What bug did you face with interceptor logic?
Profile preload 401 triggered forced logout unexpectedly. I added a request-level bypass flag (`skipAuthRedirect`) for non-critical preload call.

## 10) How did you handle API response shape differences?
I normalized responses in service layer so UI gets stable fields regardless of nested/flat payload differences.

## 11) What issue was fixed in Admin View Applications?
Candidate name and resume link were missing due to response key mismatch. I added fallback mapping paths for name and resume fields.

## 12) How is candidate profile prefilled on revisit?
On page load, frontend calls `GET /candidate/profile`, maps response to form model, and hydrates state.

## 13) Why do you use a service layer?
Separation of concerns: components handle UI, services handle API calls, payload mapping, and normalization.

## 14) What is DTO mapping in your project?
Transforming API DTO to form state (`mapProfileToForm`) and form state to API payload (`buildProfilePayload`).

## 15) Why did you allow `currentCTC = 0`?
To support freshers/unemployed candidates. Validation changed from `> 0` to `>= 0`.

## 16) You removed Education field from UI. How did backend compatibility remain?
Mapped `education` payload value from `highestQualification` so backend DTO requirement is still satisfied.

## 17) How do you avoid redirect loops?
Scoped redirect logic to root wrapper only and kept role-protected routes separate with fallback-safe logic.

## 18) What env variable detail is important in Vite?
Only `VITE_*` vars are exposed to frontend, so API URL must be `VITE_API_BASE_URL`.

## 19) How did you validate your fixes?
Manual role/user flow testing + lint checks + production build verification.

## 20) One key learning from this project?
Robust frontend is about contracts and state flow as much as UI: routing, auth boundaries, API compatibility, and defensive mapping.

---

## 60-Second Project Pitch (Quick Practice)
I built and improved a role-based job platform frontend using React and Vite. I implemented secure role routing, fixed session handling with Axios interceptors, integrated candidate profile prefill via GET API, and normalized admin application data to correctly render candidate names and resume links. I focused on API contract alignment, clean service-layer architecture, and production-safe behavior.

