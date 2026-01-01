import type { WithContext, ProfilePage } from "schema-dts";

import { PUBLIC_BASE_URL } from "$env/static/public";

const dateCreated = new Date(2006, 8, 22).toISOString();
const dateModified = new Date().toISOString();

export function generateSchemaJSContent(): string {
  const data: WithContext<ProfilePage> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified,
    dateCreated,
    name: "Tiff Fehr",
    url: PUBLIC_BASE_URL,
    mainEntity: {
      "@type": "Person",
      name: "Tiff Fehr",
      alternateName: "tiffehr",
      interactionStatistic: [],
      description: "Tiff Fehr's personal website",
      image:
        "https://assets.journa.host/accounts/avatars/109/384/956/899/791/435/original/ff2b453fcd6537b4.png",
      sameAs: [
        "https://gasworksdata.com/",
        "https://journa.host/@tiffehr/",
        "https://linkedin.com/in/tiff-fehr",
        "https://news-bots.org/"
      ]
    }
  };

  const tagBody = JSON.stringify(data, null, 2).replace(/<\/script>/gi, "<\\/script>");

  // build HTML-renderable script tags for analytics
  // eslint-disable-next-line no-useless-escape
  return `<script type="application/ld+json">${tagBody}<\/script>`;
}
