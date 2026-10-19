export const articleTool = {
  name: 'write_blog', description: 'Return the completed researched blog article.',
  input_schema: {
    type: 'object', required: ['title', 'slug', 'description', 'category', 'tags', 'content'],
    properties: {
      title: { type: 'string' }, slug: { type: 'string' }, description: { type: 'string' },
      category: { type: 'string', enum: ['AI Tools', 'App Dev', 'Content', 'Tech Trends'] },
      tags: { type: 'array', items: { type: 'string' } }, content: { type: 'string' },
    }, additionalProperties: false,
  },
};
export function extractArticle(response) {
  const block = response.content?.find(item => item.type === 'tool_use' && item.name === articleTool.name);
  if (response.stop_reason !== 'tool_use' || !block?.input) throw new Error('Incomplete structured article');
  return block.input;
}
