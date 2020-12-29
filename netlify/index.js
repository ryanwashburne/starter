const NetlifyAPI = require("netlify");

class NetlifyClient {
  accessToken;
  stage;
  siteId;

  constructor(accessToken, inDevelopment, siteId) {
    this.client = new NetlifyAPI(accessToken);
    this.stage = inDevelopment ? "development" : "production";
    this.siteId = siteId;
  }

  async write(obj) {
    const metadata = await client.getSiteMetadata({
      site_id: this.siteId,
    });
    return await client.updateSiteMetadata({
      site_id: this.siteId,
      body: {
        ...metadata,
        [this.stage]: {
          ...metadata[this.stage],
          ...obj,
        },
      },
    });
  }

  async read(key) {
    const metadata = await client.getSiteMetadata({
      site_id: this.siteId,
    });
    return key ? metadata?.[this.stage]?.[key] : metadata?.[this.stage];
  }
}

module.exports = NetlifyClient;
