---
id: devlog-3
aliases: []
tags:
  - Liblog
  - Typst
  - Latex
  - Hugo
  - Digital Publishing
date: "2025-02-5"
draft: False
title: "LibLog 3: Anti-Github Aktion(s)"
---

## Or, Why Nobody Knows Anything

### "Developer Experience" and Black Boxes

There is a current obsession with the "developer experience" when tech companies tout their products to customers. They promise easy CI/CD and "no-code machine learning." These nominal advances are necessarily enabled by abstractions in the codebase, i.e., one has to drill down further and further into codebases to actually solve problems.

While it is good and nice for people with little-to-no coding experience to get up and running on Github pages, when they do run into an issue, it becomes exceedingly difficult to actually solve the problem. They are used to only typing in `upload-artifact`, without actually knowing what that code does. This becomes a problem. Let us use the analogy of "model interpretability" from the machine learning field. It is very easy to understand how, say, a linear regression model predicted a certain value, it has high _interpretability_. But as we abstract away to CNNs, GNNs, etc., where there are more and more parts in each "whole" of the network, it becomes less interpretable. Something as abstract as a Large Language Model becomes what are known as "black boxes." Where one can only see the input and output, but not necessarily what happens in-between.

While it can be argued, of course, that a developer could always "RTFM", this bit of advice is useless when the manual is also useless. If one cannot figure out what is going on "behind the curtain," it becomes impossible for even talented programmers (of which I am not one, for those of you wondering), to figure out what the hell the problem is.

### What made me so frustrated today

Today, we encountered a very annoying breaking change in our Github actions workflow for an OER that we are working on. This OER uses [Jupyter-book](https://jupyterbook.org/en/stable/intro.html), a fantastic little document generator that we use often for OER texts at Northwestern. One of my colleagues came to me asking for help debugging/fixing the CI/CD pipeline that I put together from the documentation pages of `jupyter-book`. It seemed to be that the `upload-artifact` action had been deprecated and thus broke the CI/CD pipeline when it went to deploy.

_"Oh, no problem"_, I thought, we just need to update our upload-artifact action to v4 and we'll be good.

And then I looked at the error message.

`Error: Artifact could not be deployed. Please ensure the content does not contain any hard links, symlinks and total size is less than 10GB.`

This, I thought, was very strange. I did not have any links, nor was the artifact even close to 10GB. It turned out that the error message was just useless, sending me down rabbit holes investigating irrelevant issues, such as checking to see if I hadn't accidentally included symlinks or anything. It is actually embarrassing that this is in production software, which I assume this university pays thousands of dollars or more per year to manage. When I was satisfied that the error did not, in fact, have anything to do with links or size constraints, I went scouring Github issues to see if other people had [similar issues](https://github.com/orgs/community/discussions/40771#discussioncomment-7059166). It seems as though different people came up with different solutions. I also tried making everything [readable](https://github.com/actions/deploy-pages/issues/303). Nothing seemed to work. So, I just decided to do it all in Amplify, where their documentation is perhaps _too_ robust and deploying on Amplify worked perfectly on the second try.

All of this is to say, that Github pages and actions is a buggy and poorly documented. We should not be relying on perpetual abstraction, it makes errors less visible and more difficult to fix. I myself can be better about actually learning what is going on behind the curtain of the tools I use, specifically for data science work, because if you can't explain why it works, you can't explain why it doesn't.
