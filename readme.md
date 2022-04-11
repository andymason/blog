# Personal blog

Nothing fancy here. Just a simple bash script using [Pandoc](pandoc) to convert
Markdown files into HTML.

I tried lots of different static site generators but realized I was spending
more time setting them up than I was writing posts.

With this stripped down approach I can focus more on the content and less on the
tooling.

## Requirements

Linux, Bash, Pandoc, watchexec (optional)

## Development

No local server is needed as everything can be viewed via local file access.

[watchexec](watchexec) is used to monitor files changes and rebuild the HTML.

```
watchexec -w assets/ -w posts/ ./build.sh
```

## License

MIT

[pandoc]: https://pandoc.org/
[watchexec]: https://github.com/watchexec/watchexec
