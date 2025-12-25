<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  let { href, children }: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} target="_blank" rel="noopener noreferrer nofollow">
  {@render children()}
</a>
