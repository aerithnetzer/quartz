---
title: LibLog 2
date: 2025-01-15
draft: false
tags:
  - Liblog
  - Typst
  - Latex
  - Hugo
  - Digital Publishing
---

It has been a while since I have written on this blog. It has been a very busy fall-winter season here at Northwestern. In the months since I last wrote on this blog, I read *Anti-Oculus: A Philosophy of Escape* by Acid Horizon and *Science and Poetry* by Mary Midgley. I have also developed and released the [*Northwestern University Studies in Russian Philosophy, Literature, and Religious Thought*](https://www.rplrt.org/)(NURPLRT), released a new web-version issue of the [*Bulletin of Applied Transgender Studies*](https://bulletin.appliedtransstudies.org/) (BATS), got interviewed by [*The Daily Northwestern*](https://dailynorthwestern.com/2025/01/13/campus/nu-launches-russian-philosophy-literature-and-culture-research-journal/), and have re-started work on my Anthropocene project.

I will, at some point, write not quite a review, but retrospectives, of both *Science and Poetry* and *Anti-Oculus*, but this will focus on the development of the *NU Studies in Russian Philosophy, Literature, and Religious Thought*. This project was the brainchild of the directors of the NU Research Initiative in Philosophy, Literature, and Religious Thought. They came to me with a problem---they wanted a journal, but they could not pay much money for one. Brad Underwood---the associate director of the initiative---had been in contact with many other research organizations on campus, only to find out that they had managed solutions that ran in the tens of thousands of dollars.

Fuck that.

## Building this Project

We started with lifting much of my predecessor's hugo code written for BATS, making tweaks and adjustments to the styling. Then our Media and Design Studio got involved and made a beautiful template that really made it stand out.

Then came the typesetting. Now, I have written my fair share of LaTeX code before. But the design that was being asked for was a whole new ballgame. I agreed that I would write some very complex LaTeX code to get it done. Eventually, after dozens of revisions and edits, we had a finished product.


## Typst

Typst is a relatively new markup language that markets itself as the successor to LaTeX. While it is definitely easier to use automation and logic scripts to programmatically generate a PDF than LaTeX, it is still in its adolescence, and as someone who is perpetually and professionally worried about sustainability and reproducibility, such a young markup language makes me nervous in several ways.

But, alas, it took me weeks to build a document that looked good in LaTeX (even having some LaTeX experience), but building it in Typst took about 10 hours of hard work grinding through documentation. Drawing boxes and creating environments was easy enough, and I didn't have to worry as much about font environments and "smart" markup as I did in LaTeX. My one complaint is that editing outline entries is unintuitive and has sparse documentation. There is, of course, specific documentation about *styling* your outlines, but not outright changing them.

For example, we have an article titled "Momentous Intersections: A Comparative View on Russian and Jewish Spiritual Traditions", it is a splendid article, and a good read. My approach to designing the title, subtitle and author lines within the article were to use the `#heading` function in Typst for the title, and then create a custom subtitle and author function, respectively. 

```typst
#show outline.entry.where(
  level: 2,
  body: [Momentous Intersections]
): it => {
  v(1em)
  set par(leading: .5em)
  set text(font: "IBM Plex Sans", size: 12pt, stretch: 75%, weight: 500)
  link(it.element.location(), box(width: 100%)[
    Momentous Intersections: \
    A Comparative View on Russian and Jewish
    Spiritual Traditions
    #set text(font: "IBM Plex Sans", stretch: 75%, size: 10pt, weight: 300)
    \ _by_ 
    #set text(font: "IBM Plex Sans", stretch: 75%, size: 12pt, weight: 300)
    Mikhail Epstein
    #box(width: 1fr, repeat([.]))
    #it.page
  ])
}
```

I think that this is a rather unintuitive solution, I think that it would be better to introduce an argument to the heading function that would allow for customization of the content that goes into the outline.

Something like:

```typst
#heading(level: 2,
        outline: true, 
        outlineentry: [Momentous Intersections: \
                      A Comparative View on Russian and Jewish Spiritual Traditions\
                      _by_ Mikhail Epstein])[Momentous Intersections]
```

This would prevent some of the headache.

Given all these issues though, Typst, in my use-case, seems to be the better option. Perhaps I am just not used to the programming paradigms of LaTeX, or I somehow prefer the very elegant error messages and `synctex`-like compilers that allow for immediate view of the document being created.

I had been using some packages that prevented me from using a lot of synctex features, along with `tectonic` typesetting. This, along with very long compile times, and vimtex taking up a ton of memory, gives me the motivation I need to take the risk with Typst. The GitHub community seems to be active and the maintainers have yet to do anything super shady, so I will be using this for the time being.

If anyone is actually reading this, I would, though, like to have an "insert PDF" into my Typst so I can input a cover to my document easily.
