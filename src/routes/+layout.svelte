<script lang="ts">
  import "../app.scss";
  
  import favicon from "$lib/assets/favicon.svg";  
  import "@fontsource/merriweather/300.css";
  import "@fontsource/grand-hotel/400.css";
  import grandHotel from '@fontsource/grand-hotel/files/grand-hotel-latin-400-normal.woff2?url';
  
  import { resolve } from "$app/paths";
  import Link from "$lib/Link.svelte";

  /* routes and links */
  const root = resolve(`/`);
  const year = new Date().getFullYear();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preload" as="font" type="font/woff2" href={grandHotel} crossorigin="anonymous" />
</svelte:head>

<div class="page-container">
  <div class="brand"></div>

  <header aria-label="Site masthead">
    <h1 aria-label="header">
      Howdy! 👋
    </h1>
  </header>
  <main id="main" aria-label="Main content">
    <slot />
  </main>
  <footer aria-label="Site footer">
    <h2 aria-label="Copyright">
      <Link href={root}>tiffehr.com</Link>
      &copy;&nbsp;{year}
      <Link href="https://gasworksdata.com/">Gasworks Data</Link>
      all rights reserved
    </h2>
  </footer>
</div>
