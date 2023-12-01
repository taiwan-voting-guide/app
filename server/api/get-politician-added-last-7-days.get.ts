import { kv } from '@vercel/kv';

const projectId = process.env.MIXPANEL_PROJECT_ID;
const key = `analytics:politician_added_last_7_days`;

export default defineEventHandler(async () => {
  const resStr = await kv.get(key);
  if (resStr) {
    return resStr;
  }

  let response: Response;
  const currentTime = new Date();
  const fromDate = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 10);
  const toDate = currentTime.toISOString().substring(0, 10);
  try {
    response = await fetch(
      `https://data.mixpanel.com/api/2.0/export?project_id=${projectId}&from_date=${fromDate}&to_date=${toDate}&event=%5B%22Politician%20Added%22%5D`,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          'Accept-Encoding': 'gzip',
          authorization: `Basic ${process.env.MIXPANEL_SECRET}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
    return;
  }

  const str = await response.text();
  const eventStrs = str.substring(0, str.length - 1).split('\n');
  const events = eventStrs.map((str) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      return;
    }
  });

  const countMap = new Map<string, number>();
  events.forEach((event) => {
    if (!event) {
      return;
    }

    if (!Array.isArray(event.properties.politicians)) {
      return;
    }

    event.properties.politicians.forEach((p: string) => {
      const count = countMap.get(p) || 0;
      countMap.set(p, count + 1);
    });
  });

  const politicianCounts = Array.from(countMap.entries())
    .map(([politician, count]) => {
      return { politician, count };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });

  const res = {
    timestamp: currentTime.getTime(),
    politicianCounts,
  };

  await kv.set(key, res, { ex: 60 * 60 });

  return res;
});
