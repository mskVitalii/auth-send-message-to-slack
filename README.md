# auth-send-message-to-slack

This extension sends a message to your Slack bot once a new user is created

**Author**: Vitalii Popov (**[https://github.com/mskVitalii](https://github.com/mskVitalii)**)

### Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

**Configuration Parameters:**

- SLACK_WEBHOOK_URL: Slack API webhook URL

- SLACK_MESSAGE: The message to send to the telegram bot.This field is optional.

**Cloud Functions:**

- **sendMessage:** Sends a message to the telegram bot.
