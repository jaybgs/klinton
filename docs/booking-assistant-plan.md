# Nadon booking assistant — implementation plan

Status: planned, not implemented. Bell Toggle is installed separately and must remain unused until placement is requested.

## First complete workflow
Guided inquiry -> durable record -> date conflict check -> structured brief -> draft proposal -> photographer approval -> delivery -> follow-up task.
Inquiries never reserve dates. Confirmation must recheck availability atomically, including travel buffers and time zones.

## Interfaces
- Public /booking: name, email, optional phone, session type, local date/time and timezone, duration, venue, budget/currency, preferences, optional reference links, privacy acknowledgment. No account required to inquire.
- Private dashboard: New, Needs details, Proposal ready, Proposal sent, Confirmed, Declined, Cancelled. Calendar, inquiry detail, editable brief, approval, and activity history.
- Settings: packages, prices, currency, coverage, business timezone, unavailable dates, travel buffers, templates, reminder rules.

## Records
Inquiry; Client; Package; Booking; AvailabilityBlock; Proposal (version and approval); Message (queued/sent/failed and provider reference); ScheduledTask; ActivityEvent.

## Platform
Use Base44 data/auth/workflows for the final contest app. Prove one inquiry write/read and one admin-only view from the local frontend before building the entire assistant. Local preview currently uses Next.js and is not yet a native Base44 editor project; repository import alone does not establish that publishing path.
Avoid simultaneously keeping MongoDB and Base44 as competing booking databases.
Base44 Workflows requires Builder or higher according to documentation reviewed during setup. Verify account capabilities before provisioning.
Email: built-in delivery to non-registered recipients requires a paid app plan and verified app custom domain per current docs; alternatively configure supported external email delivery with verified sender. No live sends until configured and authorized. Begin with a clearly labeled test outbox.
AI: draft summaries and responses using supplied facts and approved package information; deterministic code handles pricing, dates, and status changes. Save inquiries even if AI fails; fall back to templates and mark for review.

## Reliability and permissions
Server-side validation and spam protection. Public callers may submit inquiries but cannot list client records. Only authenticated authorized staff may review or modify bookings. Secrets remain server-side.
Unique submission IDs prevent duplicate records. Unique job IDs and delivery reconciliation prevent duplicate sends. Failed jobs stay visible with bounded retries. Cancel scheduled reminders after decline, cancellation, or the relevant reply. Begin with manual reply tracking; automatic inbox detection requires an inbound integration.

## Configuration needed
Base44 app/account and plan; owner identity; package names/prices/currency; location/timezone; available days; buffers; deposit and confirmation rules; client-facing terms; verified sender; response templates. Payment provider and calendar sync are optional later additions.

## Validation
Submit inquiry, reload and confirm persistence; reject invalid input; handle duplicate submit; test overlapping bookings and simultaneous confirmations; deny unauthorized reads/writes; test AI outage; simulate email failure/retry; cancel reminders; verify real delivery only to an approved test recipient.
Measure actual inquiry-to-draft time, review time, workflow completion, and delivery failures. Do not invent savings claims.

## References
https://docs.base44.com/Building-your-app/Creating-workflows
https://docs.base44.com/documentation/building-your-app/sending-emails
https://docs.base44.com/Setting-up-your-app/Managing-security-settings

## User-confirmed setup
Base44 account exists on Free plan. Nadon package pricing will be supplied later. Recommended split: local frontend first with explicitly labeled demo data, then real assistant/data/permissions in Base44. Do not present demo flows as live automation. Confirm local-to-Base44 publishing compatibility before completing the full dashboard. No upgrade or external service purchase has been authorized.
