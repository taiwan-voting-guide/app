import { kv } from '@vercel/kv';
import twilio from 'twilio';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendgridToken = process.env.SENDGRID_TOKEN || '';
const sessionExpireTime = 60 * 60 * 24 * 7;

export default defineEventHandler(async (event) => {
  const query = getQuery<{ email: string; token: string }>(event);
  if (!query.token || !query.email || !validator.isEmail(query.email)) {
    throw createError({
      statusCode: 400,
      message: 'email and token are required',
    });
  }

  const client = twilio(accountSid, authToken);
  try {
    await client.verify.v2.services(sendgridToken).verificationChecks.create({
      to: query.email,
      code: query.token,
    });
  } catch (err) {
    throw createError({ statusCode: 500 });
  }

  const token = uuidv4();
  const ts = Math.floor(Date.now() / 1000).toString();
  const sessionKey = generateSessionKey(query.email, token);
  try {
    await kv.setex(sessionKey, sessionExpireTime, ts);
    setCookie(event, 'user_session', sessionKey, {
      maxAge: sessionExpireTime,
    });
  } catch (err) {
    throw createError({ statusCode: 500 });
  }

  return sendRedirect(event, '/', 302);
});
