import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function getReelsData(urls: string[], date: Date) {
  const input = {
    addParentData: false,
    directUrls: urls,
    enhanceUserSearchWithFacebookPage: false,
    isUserReelFeedURL: false,
    isUserTaggedFeedURL: false,
    onlyPostsNewerThan: date.toISOString(),
    resultsLimit: 5,
    resultsType: 'stories',
  };
  const run = await client.actor('apify/instagram-scraper').call(input);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items;
}

export async function getTestData() {
  const { items } = await client.dataset('SGeVRJNbl0pCyRgJQ').listItems();
  return items;
}
