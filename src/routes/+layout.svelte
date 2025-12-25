<script lang="ts">
  // import { PUBLIC_BASE_URL } from "$env/static/public";
  import "../app.scss";
  import favicon from "$lib/assets/favicon.svg";
  import humanMade from "$lib/assets/human-made-badge.webp";
  import "@fontsource/lexend/600.css";
  import "@fontsource-variable/roboto";
  import "@fontsource/roboto-slab/200.css";
  import "@fontsource/roboto-slab/300.css";
  import { onMount } from "svelte";
  import { resolve } from "$app/paths";
  import Link from "$lib/Link.svelte";

  /* routes and links */
  const root = resolve(`/`);
  const year = new Date().getFullYear();

  // toggle theme on body data attr
  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", theme);

    // set cookie
    document.cookie = `theme=${theme}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  }

  onMount(() => {
    // read cookie for theme (if set)
    const match = document.cookie.match(new RegExp("(^| )theme=([^;]+)"));
    if (match) {
      document.documentElement.setAttribute("data-theme", match[2]);
    }

    // setup theme button
    document.getElementById("theme")?.addEventListener("click", toggleTheme);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header aria-label="Site masthead">
  <h1 aria-label="header">
    Howdy! 👋
  </h1>
</header>
<nav>
  <a href="#main" class="visually-hidden">Skip to main content</a>
</nav>
<nav id="nav" aria-label="Main navigation"></nav>
<main id="main" aria-label="Main content">
  <slot />
</main>
<footer aria-label="Site footer">
  <h2 aria-label="Copyright">
    <Link href={root}>tiffehr.com</Link>
    &copy;&nbsp;{year}
    <Link href="https://thehumanmade.org">human-made</Link> by
    <Link href="https://gasworksdata.com/">Gasworks Data</Link>
    <img class="human-made" src={humanMade} alt="TheHumanMade badge" width="50" height="50" />
    <br />
    All rights reserved
  </h2>
</footer>
