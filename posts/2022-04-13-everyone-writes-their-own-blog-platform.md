---
title: Everyone Writes their own blog platform
date: 2022-04-13
---

A well-known trope in web development is at some point you'll write your own
blog platform, it's the “Hello World” of web dev. One reason for this could be
it's _easier_ to work on something you already know than it is to actually write
a blog post.

I'm not immune from such procrastinations. I've tried numerous blog platforms
and static site generators, spent time learning the theming systems, optimizing
dynamic image compression settings. But, each ended the same way, a git repo
with a fully configured pipeline without any content.

So, in the sprite of the original `.plan` files, I've stripped everything back
and gone for the simplest solution that works for me.

I've written three posts in the last week, so it seems to be working.

The 'simple' solution I've settled on is writing posts in Markdown using a
lovely little editor called [Apostrophe][apostrophe]. I enjoy the clean UI and
distraction-free mode.

[PanDoc][pandoc] handles the generation of HTML. A [small bash script][build]
loops over each `*.md` file and outputs the HTML into a build folder, and a
single `template.html` file structures the output. All static assets live in a
folder that is copied during build. That's it.

I don't write enough to need a complex build chain and I like hand optimizing
assets on the command line with `ffmpeg`, `pngquant` and `jpegoptim`.

Finally, [Cloudflare Pages][pages] handles the hosting. After every git commit,
the [`build.sh`][build] runs and deploys the files to their CDN. I'm using the
free tier because, well, the entire blog site is less than 1 MB and will see
around five visitors a month.

All-in-all, it's been nice getting back to basics and focusing on what's
important, the content.

[apostrophe]:
  https://apps.gnome.org/en-GB/app/org.gnome.gitlab.somas.Apostrophe/
[pandoc]: https://pandoc.org/
[build]: https://github.com/andymason/blog/blob/main/build.sh
[pages]: https://pages.cloudflare.com/
