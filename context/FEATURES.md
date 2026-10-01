# Features and specification

Status: ACTIVE. Copy and revise your own HW2 FEATURES.md here.

## Context
## Users
## Scope and non-goals
Selected feature: F-01 Definition-of-done checklist (serves JOB-01).
HW3 builds F-01 as a single-user, browser-local app: a section name plus
a checkable completion criterion, saved and listed. Owners, reviewers,
review status, invites, authentication, deadlines, risk flags, and the
activity record (F-02 to F-06 and the rest of the Behavior section) are
DEFERRED. See ADR-001 for the storage decision.
## Behavior
## Constraints
## Acceptance

| ID | Feature | Job | Criterion |
|----|---------|-----|-----------|
| AC-F01-1 | F-01 | JOB-01 | When a member creates a section, the system shall require at least one checkable completion criterion. |
| AC-F01-2 | F-01 | JOB-01 | While any criterion is marked Not met, the system shall display Revision needed and the reviewer's correction note. |
| AC-F01-3 | F-01 (HW3) | JOB-01 | When a section is saved, the system shall still list it after the page reloads. |
| AC-F01-4 | F-01 (HW3) | JOB-01 | If saving fails, then the system shall show an error and keep the user's typed text and the existing list. |
| AC-F02-1 | F-02 | JOB-02 | The system shall display one owner, a different reviewer, and the current review status for every section. |
| AC-F03-1 | F-03 | JOB-02 | When an owner requests review, the system shall record the request time and display Review requested within two seconds. |
| AC-F04-1 | F-04 | JOB-02 | When 24 hours remain before the internal-draft deadline, the system shall flag every section not marked Ready and identify its unmet criteria. |
| AC-PR-1 | Readiness | JOB-02 | While any section is not Ready, the system shall prevent the project from being marked Combined draft ready. |
| AC-RO-1 | Repair ownership | JOB-02 | If a proposed repair owner declines, then the system shall preserve the existing owner and record the decline. |

## Verification

| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|-----------|-----------------|-----------------|-----------------|--------|-------------------|
| AC-F01-1 | Submit section "Competitor pricing" with the criterion left empty | Not saved; error shown; list unchanged | | | |
| AC-F01-1 | Submit "Competitor pricing" / "Cites 3 sources" | Saved with an ID and listed; form clears | | | |
| AC-F01-3 | Save an entry, then reload | Entry still listed | | | |
| AC-F01-4 | Open with `?failSave`, submit a valid entry | Error shown; typed text and list kept | | | |
| AC-F01-2 | n/a (needs reviewer) | n/a | n/a | DEFERRED | Out of HW3 slice |
| AC-F02-1 to AC-RO-1 | n/a | n/a | n/a | DEFERRED | Out of HW3 slice |

Cover a normal action, relevant invalid input, and persistence or failure. Classify unselected requirements separately. Record actual outcomes; all-PASS is acceptable with evidence.
