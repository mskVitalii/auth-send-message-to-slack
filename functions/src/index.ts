import * as functions from "firebase-functions";
import {UserRecord} from "firebase-admin/auth";
import axios from "axios";

/**
 * Sends a message to a Slack webhook when a new user is created in Firebase.
 * The message is generated based on a template,
 * with user information dynamically inserted.
 *
 * @param {UserRecord} user - The user record object
 * from Firebase Authentication, containing user information.
 */
async function onCreate(user: UserRecord) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL as string;
  const slackMessageTemplate = process.env.SLACK_MESSAGE as string;

  // For nested "${user.metadata.creationTime}"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string): any =>
    path.split(".").reduce((acc, key) => acc && acc[key], obj);

  const message = slackMessageTemplate.replace(/\${user\.(\w+(\.\w+)*)}/g,
    (match, property) => {
      const value = getNestedValue(user, property);
      return value ? String(value) : match;
    });

  try {
    await axios.post(slackWebhookUrl, {text: message});
  } catch (error) {
    console.error(`ERROR! Please open an issue on GitHub with:\n${error}`);
  }
}

exports.sendSlackMessage = functions.auth.user().onCreate(onCreate);
