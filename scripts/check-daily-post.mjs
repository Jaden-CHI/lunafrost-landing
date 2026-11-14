import fs from 'node:fs';
import { existingPosts } from './blog-content.mjs';
import { publicationDates, missingDates } from './blog-dates.mjs';

const dates = publicationDates(process.env.BLOG_START_DATE, process.env.BLOG_END_DATE);
const skip = missingDates(dates, existingPosts('content/blog')).length === 0;
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `skip=${skip}\n`);
console.log(skip ? 'All requested publication dates are already occupied.' : `Available publication slots: ${missingDates(dates, existingPosts('content/blog')).join(', ')}`);
