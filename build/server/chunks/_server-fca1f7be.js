import { j as json } from './index-2b68e648.js';
import { a as auth, P as ParseIncidentPayload, G as GHIssueToKenerIncident } from './webhook-57da3550.js';
import { U as UpdateIssue, a as GetIncidentByNumber } from './github-ed3bad6d.js';
import { p as public_env } from './shared-server-58a5f352.js';
import fs from 'fs-extra';
import './tool-153dc604.js';
import 'randomstring';
import 'axios';
import 'marked';

async function PATCH({ request, params }) {
  const authError = auth(request);
  if (authError !== null) {
    return json(
      { error: authError.message },
      {
        status: 401
      }
    );
  }
  const incidentNumber = params.incidentNumber;
  const payload = await request.json();
  if (!incidentNumber || isNaN(incidentNumber)) {
    return json(
      { error: "Invalid incidentNumber" },
      {
        status: 400
      }
    );
  }
  let { title, body, githubLabels, error } = ParseIncidentPayload(payload);
  if (error) {
    return json(
      { error },
      {
        status: 400
      }
    );
  }
  let site = JSON.parse(fs.readFileSync(public_env.PUBLIC_KENER_FOLDER + "/site.json", "utf8"));
  let github = site.github;
  let resp = await UpdateIssue(github, incidentNumber, title, body, githubLabels);
  if (resp === null) {
    return json(
      { error: "github error" },
      {
        status: 400
      }
    );
  }
  return json(GHIssueToKenerIncident(resp), {
    status: 200
  });
}
async function GET({ request, params }) {
  const authError = auth(request);
  if (authError !== null) {
    return json(
      { error: authError.message },
      {
        status: 401
      }
    );
  }
  const incidentNumber = params.incidentNumber;
  let site = JSON.parse(fs.readFileSync(public_env.PUBLIC_KENER_FOLDER + "/site.json", "utf8"));
  let github = site.github;
  let issue = await GetIncidentByNumber(github, incidentNumber);
  if (issue === null) {
    return json(
      { error: "incident not found" },
      {
        status: 404
      }
    );
  }
  return json(GHIssueToKenerIncident(issue), {
    status: 200
  });
}

export { GET, PATCH };
//# sourceMappingURL=_server-fca1f7be.js.map
