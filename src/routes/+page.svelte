<script lang="ts">
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import Link from "$lib/Link.svelte";
  import NorefLink from "$lib/NorefLink.svelte";
</script>

<svelte:head>
  <link rel="canonical" href={PUBLIC_BASE_URL} />
  <meta property="og:url" content={PUBLIC_BASE_URL} />
  <meta name="description" content="tiffehr.com - Tiff Fehr's personal website" />
  <meta property="og:description" content="tiffehr.com - Tiff Fehr's personal website" />
  <meta property="og:title" content="tiffehr.com" />
  <title>from tiffehr.com</title>
</svelte:head>

<article>
  <p>
    I am a project leader and full-stack newsroom software developer, formerly with The New York Times and msnbc.com (not the cable channel, but close). I now run Gasworks Data, a small low-profit shop that parners with newsrooms, NGOs and other organizations to complete projects that require tech + editorial expertise.
  </p>
  <p>
    My news-nerd work includes custom software & web development, data journalism and occasional reporting & editing.
  </p>
  <p>
    Where else I can also be found:
  </p>
  <ul id="links">
    <li>
      <Link href="https://gasworksdata.com">Gasworks Data</Link>
    </li>
    <li>
      <NorefLink href="https://github.com/tiffehr">GitHub</NorefLink>
    </li>
    <li>
      <NorefLink href="https://linkedin.com/in/tiffehr">LinkedIn</NorefLink>
    </li>
    <li>
      <NorefLink href="https://nytimes.com/by/tiffehr">NYT byline page</NorefLink>
    </li>
    <li>
      <NorefLink href="https://muckrack.com/tiffehr">MuckRack</NorefLink>
    </li>
    <li>
      <NorefLink href="https://mastodon.social/@tiffehr">Mastodon (mostly quiet)</NorefLink>
    </li>
  </ul>
</article>
