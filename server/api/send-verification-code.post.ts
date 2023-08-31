import twilio from 'twilio';
import validator from 'validator';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendgridToken = process.env.SENDGRID_TOKEN || '';

export default defineEventHandler(async (event) => {
  const client = twilio(accountSid, authToken);

  const { email } = await readBody<{ email: string }>(event);
  if (!email) {
    throw createError({ statusCode: 400, message: 'email is required' });
  }

  if (!validator.isEmail(email)) {
    throw createError({ statusCode: 400, message: 'email format is wrong' });
  }

  try {
    await client.verify.v2.services(sendgridToken).verifications.create({
      to: email,
      channel: 'email',
      channelConfiguration: {
        substitutions: {
          email,
        },
      },
    });

    return 'success';
  } catch (err) {
    console.error((err as Error).message);
    throw createError({ statusCode: 500 });
  }
});
