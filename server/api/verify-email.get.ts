import twilio from 'twilio';
import isEmail from 'validator/lib/isEmail';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendgridToken = process.env.SENDGRID_TOKEN || '';

export default defineEventHandler(async (event) => {
  const query = getQuery<{ email: string; token: string }>(event);
  if (!query.token || !query.email || !isEmail(query.email)) {
    throw createError({
      statusCode: 400,
      message: 'email and token are required',
    });
  }

  const client = twilio(accountSid, authToken);
  try {
    const res = await client.verify.v2
      .services(sendgridToken)
      .verificationChecks.create({
        to: query.email,
        code: query.token,
      });
    console.log(res);
  } catch (err) {
    console.log(err);
    throw createError({ statusCode: 500 });
  }

  setCookie(event, 'session', '123');

  return 'success';
});
