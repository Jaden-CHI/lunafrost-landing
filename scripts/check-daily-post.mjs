import fs from 'node:fs';
import { alreadyPublishedToday, existingPosts } from './blog-content.mjs';

const skip = alreadyPublishedToday(existingPosts('content/blog'));
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `skip=${skip}\n`);
console.log(skip ? 'An automated post is already published for today (KST).' : 'Daily publication slot is available.');
