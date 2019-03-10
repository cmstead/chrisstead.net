'use strict';

const fs = require('fs');
const xml2js = require('xml2js');
const moment = require('moment');
const importConfig = require('./postImporterConfig.json');

const { xmlPath, oldDomain, newDomain, wpContentLocation } = importConfig;

const postXML = fs.readFileSync(xmlPath, { encoding: 'utf8' });

function buildTitleSlug(postTitle) {
    return postTitle.toLowerCase().replace(/\s/g, '-').replace(/[\\\/:;.,]/g, '');
}

function buildPostSlug(postTitle, shortDate) {
    const titleSlug = buildTitleSlug(postTitle);

    return `${shortDate}-${titleSlug}`;
}

function buildPostFileContent(postData) {
    return `---
layout: post
title:  "${postData.postTitle}"
date:   ${postData.fullDate}
categories: ${postData.categories.join(', ')}
---
{% raw %}
${postData.postContent}
{% endraw %}
    `
}

function buildCategories(categoryData) {
    return categoryData.map(function (categoryRecord) {
        return categoryRecord._;
    });
}

const domainPattern = new RegExp(oldDomain, 'ig');
const codePreTagPattern = /<pre class="language\:([^"]+)">/ig;
const closePreTagPattern = /<\/pre>/ig;
const wpContentPattern = /wp-content/ig;

function cleanPostContent(postContent) {
    return postContent
        .replace(domainPattern, newDomain)
        .replace(codePreTagPattern, '```$1')
        .replace(closePreTagPattern, '```')
        .replace(wpContentPattern, wpContentLocation);
}

function buildPostStuff(postRecord) {
    const postMomentInstance = moment(postRecord.pubDate[0]);

    const fullDate = postMomentInstance.format('YYYY-MM-DD HH:mm:ss ZZ');
    const shortDate = postMomentInstance.format('YYYY-MM-DD');
    const postTitle = postRecord.title[0];
    const postSlug = buildPostSlug(postTitle, shortDate);
    const postContent = cleanPostContent(postRecord['content:encoded'][0]);
    const categories = buildCategories(postRecord.category);

    return {
        categories: categories,
        fullDate: fullDate,
        shortDate: shortDate,
        postTitle: postTitle,
        postSlug: postSlug,
        postContent: postContent
    };
}

xml2js.parseString(postXML, function (error, xmlTree) {
    const posts = xmlTree.rss.channel[0].item;

    posts
        .map(buildPostStuff)
        .filter(function (postData) {
            return !postData.shortDate.toLowerCase().includes('invalid');
        })
        .forEach(function (postData) {

            const fileContent = buildPostFileContent(postData);

            fs.writeFileSync(`./_posts/${postData.postSlug}.md`, fileContent, { encoding: 'utf8' });
        });
});