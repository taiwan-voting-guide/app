import twilio from 'twilio';
import isEmail from 'validator/lib/isEmail';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendgridToken = process.env.SENDGRID_TOKEN || '';

const client = twilio(accountSid, authToken);

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event);
  if (!email) {
    throw createError({ statusCode: 400, message: 'email is required' });
  }

  if (!isEmail(email)) {
    throw createError({ statusCode: 400, message: 'email format is wrong' });
  }

  try {
    await client.verify.v2
      .services(sendgridToken)
      .verifications.create({ to: email, channel: 'email' });

    return 'success';
  } catch (err) {
    throw createError({ statusCode: 500 });
  }
});
