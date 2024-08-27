---
title: Trigger in View - A simple intersection observer helper
date: 2022-04-19
---

**TLDR;** [Trigger-in-view][trigger] is a little helper library I wrote that
triggers after scroll and runs a callback against only targeted elements visible
in a specified container.

---

Triggering actions when certain DOM elements comes into the view is a common
requirement in web development. A common usage is lazy-loading images, the
deferring of loading full resolution images until they'll be seen by the user.
But, there are many other uses and can form the foundation of a storytelling
narrative such as [A Year in Lockdown][lockdown], used to trigger video playing
and animations.

Recently, I needed to list numerous items in a scrollable view. Each item
contained an image and without any additional logic the app would load all 300+
images on start, even if the user never viewed them. Scrolling lists present a
unique challenge, especially on mobile, as the user is likely you quickly swipe
the list searching for the item they're looking for.

The usual solution is to use [`IntersectionObserver`][intersection] and trigger
the image load on the intersection event. The problem with this simple approach
is it triggers all items as they whizz by as the user flicks the scrolling list
with their thumb.

<figure>
<video
  controls
  playsinline
  muted
  preload="meta"
  poster="videos/firefox-intersection-scroll-demo-web.png">

  <source src="videos/firefox-intersection-scroll-demo-web.mp4" type="video/mp4">
</video>
<figcaption>
  Using `IntersectionObserver` on its own results in many image loads
</figcaption>
</figure>

You could wrap the `IntersectionObserver` callback in a `debounce` function, but
there's a problem with that. Intersection events happen one at a time as each
observed item comes into view. Debouncing the callback means only **one** item
will be processed with the callback.

What is needed is a way to delay triggering the `IntersectionObserver` callback
that will also recognize observed items currently in view. The answer is to take
advantage of a trait of the `IntersectionObserver.observe()` method that
triggers the callback immediately when used on an element.

By looping over all observed items and adding them to a new
`IntersectionObserver`, the currently visible items can be processed and removed
if desired. The `IntersectionObserver` can then `.disconnected()` ready for the
next go around.

The `creation -> loop -> disconnect` function is attached to the list's scroll
event using a simple `setTimeout` debounce function. Now, the list can be
scrolled as fast as the user wants without any unnecessary loads.

<figure>
<video
  controls
  playsinline
  muted
  preload="meta"
  poster="videos/firefox-lazy-scroll-demo-web.png">

  <source src="videos/firefox-lazy-scroll-demo-web.mp4" type="video/mp4">
</video>
<figcaption>
  Using `setTimeout` and `observer()` after scroll events prevents unnecessary loads 
</figcaption>
</figure>

One limitation to this approach is the intersection check only happens once the
`setTimeout` delay has passed, and that is dependant upon scroll events. The
browser's momentum scrolling behaviour can result in a fast flick of the list
taking a long time to slow down and stop. Reducing the delay length helps, but
increases the chance of unnecessary loads. A _smarter_ way would be to count the
frequency of the scroll events and trigger the check once it has passed a
certain threshold. Maybe I'll add that to a future version.

I wrote the library mainly for myself but I took the opportunity to learn how to
publish a namespaced package onto NPM. So, for anyone interested the code is
viewable on [github][trigger].

[trigger]: https://github.com/andymason/trigger-in-view
[lockdown]:
  https://www.telegraph.co.uk/news/0/coronavirus-lockdown-year-anniversary-photos/
[intersection]:
  https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
