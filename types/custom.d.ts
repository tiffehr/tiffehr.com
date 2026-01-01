export type SchemaBase = {
  "@context": "https://schema.org",
  "@type": string;
  dateCreated: Date;
  dateModified?: Date;
  name: string;
  url: string;
  email?: string;
  mainEntityOfPage?: string;
  mainEntity: {
    "@type": "Person";
    name: string;
    alternateName: string;
    description: string;
    image: string;
    sameAs: string[]
  }
};

export type ProfilePage = SchemaBase & {
  mainEntity: {
    "@type": "Person",
    name: "Tiff Fehr",
    alternateName: "tiffehr",
    identifier: 1,
    interactionStatistic: [],
    agentInteractionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 1
    }
  }
};