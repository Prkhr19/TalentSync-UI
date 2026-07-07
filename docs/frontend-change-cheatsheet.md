# HireNex Frontend Change Cheatsheet

This is a revision-friendly summary of the important frontend changes made, with technical terminology and implementation details.

## 1) Home Route Role-Based Redirect (`/`)

### Requirement
- Guest users should see landing page.
- Authenticated users should be redirected by role:
  - `ADMIN` -> `/admin/dashboard`
  - `CANDIDATE` -> `/candidate/dashboard`

### Before
- `/` directly rendered the landing page component for everyone.

### After
- Introduced a **route wrapper component**: `HomeRedirect`.
- `HomeRedirect` performs **client-side auth gate checks** using `localStorage`:
  - `token` presence check
  - `role` check
- Uses React Router's **imperative route substitution** via:
  - `<Navigate to={...} replace />`
- `replace` prevents **history stack pollution** (avoids back navigation to stale landing route after redirect).

### Technical Notes
- Existing **ProtectedRoute authorization boundary** remains unchanged.
- This change is scoped only to the public root route (`/`) and avoids redirect loops.

---

## 2) Candidate Profile Form Validation + Field Model Update

### Requirement
- Allow `currentCTC = 0`.
- Remove separate `education` input; keep `highestQualification`.

### Before
- Validation enforced `currentCTC > 0`.
- Form included both `education` and `highestQualification`.

### After
- Validation rule updated to:
  - `currentCTC >= 0`
  - `expectedCTC > 0` (unchanged positive constraint)
- UI/form state now captures only `highestQualification`.
- Numeric input constraints updated (`min=0` for current CTC).

### Technical Notes
- This is a **front-end domain model simplification** while preserving backend contract compatibility.

---

## 3) Profile Persistence + Prefill on Re-open

### Requirement
- After candidate updates profile once, next time opening update page should prefill values.

### Before
- Update page did not hydrate full profile from backend.
- Only resume metadata was fetched.

### After
- Added `getCandidateProfile()` API call:
  - `GET /candidate/profile`
- On mount, page performs **parallel data hydration** using `Promise.all`:
  - profile data
  - resume metadata
- Response is transformed by a **mapping adapter** (`mapProfileToForm`) to normalize DTO -> form state keys.
- Form state is then pre-populated.

### Technical Notes
- Supports common API envelope variations (`response.data?.data || response.data`).
- Improves **state rehydration** and user continuity.

---

## 4) Session Expired Regression (401 Interceptor Side Effect)

### Problem Encountered
- Opening/updating profile triggered unexpected "session expired".

### Root Cause
- Global Axios response interceptor handled all `401` by clearing auth and redirecting to login.
- Non-critical profile preload errors could trigger this behavior.

### Fix
- Added request-level escape hatch: `skipAuthRedirect`.
- `GET /candidate/profile` is called with this flag.
- Interceptor checks this flag before executing forced logout redirect.

### Technical Notes
- This is a **cross-cutting concern control** in HTTP middleware/interceptor behavior.
- Prevents accidental auth teardown from feature-specific preload calls.

---

## 5) Backend DTO Compatibility While UI Field Was Removed

### Problem
- UI removed `education`, but backend DTO still expects it in profile update payload.

### Solution
- In payload builder, map:
  - `education: highestQualification`
- Keeps request DTO backward-compatible without reintroducing duplicate UI fields.

### Technical Notes
- This is a **compatibility adapter pattern** between frontend view-model and backend contract.

---

## 6) Admin View Applications: Name/Resume Not Showing

### Problem
- Application cards displayed fallback "Candidate" instead of real name.
- Resume link appeared unavailable.

### Root Cause
- API response shape variance (flat vs nested candidate fields) was not normalized.

### Fix
- Added **response normalization layer** in `getJobApplications`.
- Fallback resolution now supports multiple property paths:
  - Name: `name | fullName | candidateName | candidate.fullName | candidate.name`
  - Resume: `resumeUrl | resumePath | candidate.resumeUrl | candidate.resumePath`
  - Also normalized education, experience, status, applied date, and id.

### Technical Notes
- This is **defensive deserialization** and **schema normalization** to support heterogeneous API payloads.

---

## Files Touched (High Importance)

- `src/Routes/HomeRedirect.jsx`
- `src/App.jsx`
- `src/Pages/Candidate/CandidateUpdateProfile.jsx`
- `src/Services/CandidateService.js`
- `src/Api/Axios.js`
- `src/Services/AdminService.js`
- `src/Pages/Recruiter/ViewApplications.jsx`
- `src/Pages/Candidate/CDashboard.jsx` (qualification display wording/local cache usage)

---

## Key Technical Terminology Used in This Work

- Route guard
- Role-based redirection
- History replacement (`Navigate replace`)
- DTO (Data Transfer Object)
- View-model to API-model mapping
- Response envelope handling
- State hydration / rehydration
- Fallback cache (localStorage)
- HTTP interceptor
- Cross-cutting auth concern
- Defensive normalization / adapter layer
- Backward compatibility contract

---

## Quick Verification Checklist

- [ ] Guest opening `/` sees landing page.
- [ ] Admin/Candidate opening `/` is redirected to role dashboard with replaced history entry.
- [ ] Candidate can submit profile with `currentCTC = 0`.
- [ ] Update profile form pre-fills on revisit.
- [ ] No false session-expired redirect while profile preloads.
- [ ] Admin applications page shows real candidate name and resume links when present in API data.

