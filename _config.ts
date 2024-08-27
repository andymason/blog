import lume from "lume/mod.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import feed from "lume/plugins/feed.ts";
import favicon from "lume/plugins/favicon.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sourceMaps from "lume/plugins/source_maps.ts";

const site = lume({
    src: "./src",
    dest: "./dest",
    location: new URL("https://coderonfire.com/"),
    prettyUrls: false,
});

site.use(codeHighlight());
site.use(favicon())

// RSS feed
site.use(feed({
    output: "/feed.xml",
    query: "type=post",
    info: {
        title: "=site.title",
        description: "=site.description",
    },
}));

site.use(lightningCss());
site.use(sourceMaps());

// Copy site assets
site.copy("posts/images");
site.copy("posts/videos");

export default site;
