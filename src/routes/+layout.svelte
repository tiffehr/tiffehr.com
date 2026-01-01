<script lang="ts">
  import "../app.scss";

  import favicon from "$lib/assets/favicon.svg";
  import faviconIco from "$lib/assets/favicon.ico";
  import favicon512 from "$lib/assets/favicon-512x512.png";
  import "@fontsource/merriweather/300.css";
  import "@fontsource/grand-hotel/400.css";
  import grandHotel from "@fontsource/grand-hotel/files/grand-hotel-latin-400-normal.woff2?url";

  import { resolve } from "$app/paths";
  import Link from "$lib/Link.svelte";
  import { generateSchemaJSContent } from "$lib/utils";

  /* routes and links */
  const root = resolve(`/`);
  const year = new Date().getFullYear();
  const ldJson = generateSchemaJSContent();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noarchive, max-image-preview:small" />
  <meta name="referrer" content="no-referrer-when-downgrade" />
  <meta name="author" content="Tiff Fehr" />
  <meta name="fediverse:creator" content="@tiffehr@journa.host" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={favicon512} />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <link rel="preload" as="font" type="font/woff2" href={grandHotel} crossorigin="anonymous" />
  <!-- favicons -->
  <link rel="icon" href={favicon} type="image/svg+xml" />
  <link rel="icon" href={faviconIco} sizes="any" />
</svelte:head>

<div class="page-container">
  <div id="brand"></div>
  <header aria-label="Site masthead">
    <h1 aria-label="Header">Howdy! 👋</h1>
  </header>
  <main id="main" aria-label="Main content">
    <slot />
  </main>
  <footer aria-label="Site footer">
    <h2 aria-label="Copyright">
      <Link href={root}>tiffehr.com</Link>
      &copy;&nbsp;{year}
      <a href="https://thehumanmade.org">human-made</a> by
      <a rel="me" href="https://journa.host/@tiffehr">me</a> &amp;
      <Link href="https://gasworksdata.com/">Gasworks Data</Link>
      all rights reserved
      <a rel="me" class="visually-hidden" href="https://journa.host/@tiffehr">Mastodon</a>
    </h2>
  </footer>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html ldJson}
  <script
    defer
    src="https://darkvisitors.com/tracker.js?project_key=e7b36ef2-e9c5-4c6e-b788-b0694015d64a"
    async
  ></script>
</div>
