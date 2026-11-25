# Shared lead storage setup

The website's browser storage is device-specific. These steps connect website
submissions and the dashboard to the shared Google Sheet.

## 1. Create the Apps Script endpoint

1. Open the linked spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) and save.
3. In **Project Settings → Script properties**, add `API_SECRET` with a new, long random value. Keep it private.
4. Choose **Deploy → New deployment → Web app**.
5. Set **Execute as** to your account, and **Who has access** to **Anyone**. The script checks the private secret before returning or changing leads.
6. Deploy, authorize spreadsheet access, and copy the web app `/exec` URL.

The script uses the `LP Lead sheet PB` tab in the linked spreadsheet, creating it if needed. Other tabs are left untouched.
When updating the script later, use **Deploy → Manage deployments → Edit → New version → Deploy**. If you create a new deployment instead, update `GOOGLE_APPS_SCRIPT_URL` in Vercel to the new URL.

## 2. Configure Vercel

In the Vercel project settings, add these environment variables for Production (and Preview if required):

- `GOOGLE_APPS_SCRIPT_URL`: the deployed Apps Script `/exec` URL
- `GOOGLE_APPS_SCRIPT_SECRET`: the same value as the Apps Script `API_SECRET`
- `DASHBOARD_ACCESS_KEY`: a separate private password for `/dashboard`

Redeploy after saving the environment variables. The dashboard prompts for the access key and keeps it only for the current browser session.

## 3. Confirm the connection

Submit a test application from a different device, then open `/dashboard` on the PC and enter the dashboard access key. New submissions appear automatically; the dashboard refreshes periodically.

To transfer leads saved by the old browser-only version, open `/dashboard` on each device that has old leads and sign in once. It imports those leads to the sheet and removes the local copy only after the import succeeds.
