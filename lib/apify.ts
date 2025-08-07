import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function getReelsData(urls: string[]) {
  const input = {
    addParentData: false,
    directUrls: urls,
    enhanceUserSearchWithFacebookPage: false,
    isUserReelFeedURL: false,
    isUserTaggedFeedURL: false,
    onlyPostsNewerThan: '2025-04-01',
    resultsLimit: 5,
    resultsType: 'stories',
  };
  const run = await client.actor('apify/instagram-scraper').call(input);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items;
}
