import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-chats.net';
  
  // Add all your static pages here
  const routes = [
    '', // Home page
    '/chat', // Main chat interface
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/settings',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/chat' ? 'daily' : 'weekly' as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: route === '' ? 1 : route === '/chat' ? 0.9 : 0.8,
  }));

  return routes;
} 