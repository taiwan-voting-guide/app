const projectId = process.env.MIXPANEL_PROJECT_ID;

export default defineEventHandler(async () => {
  let response: Response;
  const currentTime = new Date();
  const fromDate = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 10);
  const toDate = currentTime.toISOString().substring(0, 10);
  try {
    response = await fetch(
      `https://data.mixpanel.com/api/2.0/export?project_id=${projectId}&from_date=${fromDate}&to_date=${toDate}&event=%5B%22Tag%20Added%22%5D`,
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
    const count = countMap.get(event.properties.tag) || 0;
    countMap.set(event.properties.tag, count + 1);
  });

  const tagCounts = Array.from(countMap.entries())
    .map(([tag, count]) => {
      return { tag, count };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });

  return {
    timestamp: currentTime.getTime(),
    tagCounts,
  };
});
