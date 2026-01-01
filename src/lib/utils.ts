import type { ProfilePage } from "../../types/custom";

import { PUBLIC_BASE_URL } from "$env/static/public";

const name = "Tiff Fehr";
const dateCreated = new Date(2006, 8, 22);
const dateModified = new Date();
const sameAs = [
  "https://gasworksdata.com/",
  "https://journa.host/@tiffehr/",
  "https://linkedin.com/in/tiff-fehr",
  "https://news-bots.org/"
];

export function generateSchemaJSContent(): string {
  const data: ProfilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated,
    dateModified,
    name,
    url: PUBLIC_BASE_URL,
    // email: "info@gasworksdata.com",
    mainEntity: {
      "@type": "Person",
      name,
      alternateName: "tiffehr",
      identifier: 1,
      interactionStatistic: [],
      agentInteractionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/WriteAction",
        userInteractionCount: 1
      },
      description: "Tiff Fehr's personal website",
      image: "https://assets.journa.host/accounts/avatars/109/384/956/899/791/435/original/ff2b453fcd6537b4.png",
      sameAs,
    }
  };

  const tagBody = JSON
    .stringify(data, null, 2)
    .replace(/<\/script>/gi, "<\\/script>");

  // build HTML-renderable script tags for analytics
  // eslint-disable-next-line no-useless-escape
  return `<script type="application/ld+json">${tagBody}<\/script>`;
}