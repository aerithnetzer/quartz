---
title: LibLog 1 
date: 2024-09-26
draft: false 
tags:
  - Liblog
  - Papis
  - Neovim
  - Zettelkasten
---

I have decided that I will be doing a sort of dev log for librarians. I would not be so bold as to call myself a developer *per se,* but I would call myself at least a dabbler in programming for the web and some applications.

## Implementing new Functionality in Papis.Nvim

[papis.nvim](github.com/jghauser/papis.nvim) is a super neat neovim plugin that allows you to browse, edit, and insert your papis library into your academic articles. I do think Zotero is super great for people who are less neurotic, but since I prefer to live within the terminal, papis is a great choice for me. When I write, I tend to write the article as I read papers. I have never been a good note taker (although I am trying out some zettelkasten neovim plugins like vim-wiki), and so being able to quickly add articles to my library as I write is a great feature for me.

I am using the form functionality in the neovim API to catch a DOI or other link and escape to a shell process for creating the record in the papis database. This is essentially a wrapper around the papis CLI that allows for interaction with the CLI from within neovim using neovim commands. I am hoping to get this functionality merged and have test coverage over the next couple of months.

## Building a small Flask App for Zettelkasten

I have been working on [zktn](https://github.com/aerithnetzer/ztkn), a small flask app that creates a graph view of any directory containing one or more markdown documents. It uses the `pyviz` library and `networkx` to create a web server where the user can view and interact with nodes (notes) and edges of the graph. I have yet to test it at a very large scale, as I do not have that many notes. There are certainly optimizations and features that can be added to the tool, but now it is functional by just using `python ./ztkn/src.py /path/to/notes`. 

I use neovim to take notes, write academic articles, and do data science. My entire workflow is in neovim. I have tried a lot of zettelkasten neovim plugins, but I have always found that the way I find most ergonomic *for me* is to simply `touch note.md` and start writing. Luckily, LazyVim's "lang.markdown" plugin helps in making creating the actual links between documents ergonomic, allowing me to simply use the note syntax and then use `ztkn` to build a graph.

## Accelerating Digital Humanities Research with CUDA on Northwestern's Supercomputer

My home university, Northwestern, has an amazing supercomputer resource that I am lucky enough to be able to access for free as faculty. However, as upgrading enterprise infrastructure is a pain in the ass, we are running out of date versions of CUDA and libc. I am currently using [BERTopic](https://github.com/MaartenGr/BERTopic) to run topic modelling and similarity analysis on hundreds of thousands of academic articles, newspapers, visual arts, and novels to understand how the language of the anthropocene propogates through different media types and within different people who use the same medium of communication. 

Using BERTopic with CUDA was quite a pain. Actually, more specifically, using conda on a supercomputer is a pain. Depending on the order that you would install packages, different versions would be installed and some modules of PyTorch would outright not be found. Luckily, on Northwestern's HPC, we can use Torch 2.0 to be compatible with the relatively outdated glib version that Quest is running.

After topic modelling, I am using networkx to analyze inter-topic interactions and influence, for example, answering the question "Do newspapers about climate change influence scientists to study the climate?" Or vice versa. BERTopic generated thousands of topics with the very large corpus I fed it, and so creating a network of all of these nodes and calculating the cosine similarity between these nodes took hours of embedding documents, creating a graph, and then calculating the cosine similarity between nodes. Using the RAPIDSAI library, specifically the cuGraph module, I was able to speed up the networkx backend by several times, allowing me to decrease our time-to-insight, debug, and find new results or ideas faster.

## Some other thoughts

I have been wanting to create more resources for neovim. Many of my friends love VSCode, for good reason too. A slick looking UI, great remote development features, and a huge ecosystem of plugins justifies its' market dominance in programmers. The tools above, especially new functionality papis.nvim and the ztkn application, will hopefully ease the transition into neovim, and allow for easy integration with other tools.

Be on the lookout on my next post to talk about how I am using LLMs to generate metadata to decrease author burden and increase the publishing efficiency of libraries by using GPT-3.5 to convert plaintext citations into a biblatex format.
