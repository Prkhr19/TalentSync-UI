# TalentSync Fresher Interview Q&A

This Q&A is based on your actual TalentSync frontend project work (React + Vite + React Router + Axios + Tailwind).

## 1) Project Overview

### Q1. Tell me about your project in 1-2 minutes.
**Answer:**  
TalentSync is a role-based job platform frontend with two user roles: Candidate and Admin. Candidates can update profile, upload resume, apply to jobs, and track application status. Admins can create companies/jobs, view applications, and review candidates. I worked on API integration, routing security, profile persistence, session handling, and response mapping across the app.

### Q2. What was your core responsibility in this project?
**Answer:**  
My responsibility was frontend-backend integration and role-based UX correctness. I aligned service layer APIs with backend contracts, fixed route behavior, implemented profile prefill, improved auth/session handling, and normalized API response data for reliable UI rendering.

### Q3. Which tech stack did you use and why?
**Answer:**  
I used React with Vite for fast development/builds, React Router for route control, Axios for HTTP client with interceptors, and Tailwind CSS for fast UI styling. This stack is lightweight and good for scalable frontend structure without adding unnecessary complexity.

---

## 2) Routing, Auth, and Authorization

### Q4. How did you implement role-based redirection on the home route?
**Answer:**  
I created a wrapper component (`HomeRedirect`) for `/`. It checks token and role from `localStorage`. If no token, it renders landing page. If role is Admin/Candidate, it redirects to corresponding dashboard using `<Navigate replace />` to avoid back-stack pollution.

### Q5. Why did you use `replace` in `<Navigate replace />`?
**Answer:**  
`replace` replaces the current history entry instead of pushing a new one. This prevents users from pressing back and returning to a page they should no longer see (like public landing page after login).

### Q6. Difference between authentication and authorization in your app?
**Answer:**  
Authentication checks whether user is logged in (token exists). Authorization checks whether logged-in user has correct role (`ADMIN` or `CANDIDATE`) for a protected route. `ProtectedRoute` handled both.

### Q7. How does your app handle unauthorized API responses?
**Answer:**  
Axios response interceptor watches for `401`. For non-auth requests, it clears auth session and redirects to login with a session-expired message. I also added a request flag (`skipAuthRedirect`) to avoid unnecessary logout on non-critical preload requests.

---

## 3) API Integration and Data Modeling

### Q8. How did you structure API calls?
**Answer:**  
I used a service-layer approach (`CandidateService`, `AdminService`, etc.). UI components call service functions instead of Axios directly, improving reusability, testing potential, and separation of concerns.

### Q9. Why did you use `response.data?.data || response.data` pattern?
**Answer:**  
Backend responses can come as wrapped (`{ data: ... }`) or direct payload. This fallback pattern handles both shapes safely and keeps components simpler.

### Q10. What issue did you face with API response shape in applications page?
**Answer:**  
Candidate name and resume were not rendering because response fields varied (sometimes flat, sometimes nested under `candidate`). I implemented normalization in `getJobApplications` with fallback mappings to support multiple response shapes.

### Q11. What is DTO mapping and where did you use it?
**Answer:**  
DTO mapping means transforming API data model to UI form model and vice versa. I used `mapProfileToForm` for prefill and `buildProfilePayload` for update requests in candidate profile flow.

---

## 4) Candidate Profile Flow

### Q12. How did you make update profile prefill on revisit?
**Answer:**  
I added `GET /candidate/profile` call on page load and mapped response to form state. I fetched profile and resume metadata in parallel (`Promise.all`) and hydrated the form.

### Q13. What if backend profile fetch fails?
**Answer:**  
I added fallback handling: if profile GET fails, app can use cached profile data from localStorage (`candidateProfileCache`) so user still sees previous values.

### Q14. You removed education field from UI. How did you maintain backend compatibility?
**Answer:**  
Backend expected `education` in payload, so I mapped `education` to `highestQualification` in payload builder. This keeps API contract compatible while simplifying frontend form.

### Q15. Why allow `currentCTC = 0`?
**Answer:**  
Freshers or currently unemployed candidates may have zero CTC. So validation changed from `> 0` to `>= 0`, while expected CTC remained strictly positive.

---

## 5) Debugging and Problem Solving

### Q16. Explain one bug you fixed and your approach.
**Answer:**  
Bug: Clicking update profile caused "session expired".  
Approach:
1. Traced Axios interceptor behavior.
2. Found 401 from profile preload path triggered global logout.
3. Added request-level bypass (`skipAuthRedirect`) for profile preload call.
4. Verified no false logout while keeping global security behavior intact.

### Q17. How do you debug API/UI mismatch issues?
**Answer:**  
I inspect network response, compare with component expectations, add shape guards/fallbacks in service layer, and keep UI mapping centralized. This avoids scattering conditional logic across components.

### Q18. What tools/practices did you use to ensure changes are safe?
**Answer:**  
I used incremental changes, build checks (`vite build`), linter checks, and preserved route/auth boundaries. I avoided broad refactors and targeted only affected modules.

---

## 6) Architecture and Code Quality

### Q19. Why is service-layer abstraction better than calling Axios directly in every component?
**Answer:**  
It centralizes API logic, reduces duplication, makes endpoint updates easy, and keeps components focused on UI. It also makes normalization and error handling consistent.

### Q20. How did you avoid redirect loops in routing?
**Answer:**  
I scoped redirect logic to only root route wrapper and used existing protected routes for role pages. Unknown or unauthenticated states fall back safely without cyclical redirects.

### Q21. What is a cross-cutting concern in your project?
**Answer:**  
Global auth/session management via Axios interceptors is a cross-cutting concern because it affects all API calls, not a single feature module.

### Q22. How did you keep UI and backend loosely coupled?
**Answer:**  
By introducing mapping/normalization adapters in service layer. UI reads stable keys, while service layer absorbs backend shape differences.

---

## 7) Deployment and Environment

### Q23. Any deployment-related learning from this project?
**Answer:**  
Yes: environment variable key consistency is critical (`VITE_API_BASE_URL` in frontend). Also route rewrite/case-sensitivity issues can break production builds; these must be validated before deployment.

### Q24. How would you explain Vite env usage in interview?
**Answer:**  
In Vite, only variables prefixed with `VITE_` are exposed to frontend code. So API base URL must be configured as `VITE_API_BASE_URL`.

---

## 8) Testing and Validation

### Q25. How did you validate feature correctness manually?
**Answer:**  
I tested key role journeys:
- Guest vs logged-in root route behavior
- Candidate profile save and revisit prefill
- Session behavior around unauthorized calls
- Admin view applications name/resume rendering
And verified build/lint after changes.

### Q26. What would you automate next if given time?
**Answer:**  
I would add integration tests for role routing, profile prefill, and application rendering normalization, plus API contract tests for service-layer mappers.

---

## 9) Behavioral + Fresher-Friendly Questions

### Q27. What was the toughest part for you as a fresher?
**Answer:**  
Handling inconsistent API response shapes while maintaining clean UI code. I learned to solve it by introducing normalization in service layer rather than patching each component.

### Q28. How did you prioritize changes when multiple issues existed?
**Answer:**  
I prioritized user-impacting blockers first (session expiry, incorrect routing), then data correctness (prefill, resume/name rendering), then documentation/study notes.

### Q29. If interviewer asks "Did you just code or also reason about architecture?"
**Answer:**  
I worked both on coding and architecture-level decisions: route wrappers, interceptor strategy, DTO mapping, service abstractions, and compatibility adapters.

### Q30. What did this project teach you overall?
**Answer:**  
Production frontend is not only UI; it needs robust routing, auth boundaries, API contract discipline, fallback handling, and clean abstractions so features remain stable as backend evolves.

---

## 10) Quick Rapid-Fire (One-Line Answers)

- **Route guard?** Component-level check that allows/blocks route rendering based on auth/role.
- **Interceptor?** Middleware-like hook for all requests/responses in Axios.
- **Normalization?** Converting varying API shapes into one predictable frontend shape.
- **Hydration?** Filling UI state from persisted/remote data when component loads.
- **Why service files?** Separation of concerns and maintainability.
- **Why fallback mapping?** To handle backend response variability safely.
- **Why `replace` navigation?** Better UX and cleaner history.

---

## 11) Practice Prompt (Mock Interview)

**Prompt:**  
"Explain one real bug from your project, root cause, impact, and fix."

**Model Answer Structure:**  
1. Context (where bug appeared)  
2. Reproduction steps  
3. Root cause (technical)  
4. Fix implementation  
5. Verification done  
6. Preventive improvement

Use this structure for any debugging story in interviews.

