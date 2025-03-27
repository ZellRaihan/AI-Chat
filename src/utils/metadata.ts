import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  image = '/android-chrome-512x512.png'
}: GenerateMetadataProps): Metadata {
  const url = `https://ai-chats.net${path}`;
  
  // Determine image dimensions based on filename
  const isWebpBanner = image.includes('Banner');
  const width = isWebpBanner ? 1100 : 512;
  const height = isWebpBanner ? 400 : 512;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: width,
          height: height,
          alt: 'AI Chat',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Helper function to generate dynamic metadata for chat pages
export function generateChatMetadata(modelName: string): Metadata {
  return generateMetadata({
    title: `Chat with ${modelName} - AI Chat`,
    description: `Experience intelligent conversations with ${modelName}. Get instant, accurate responses powered by advanced AI technology.`,
    path: `/chat?model=${modelName.toLowerCase()}`,
  });
}

// Helper function to generate dynamic metadata for feature pages
export function generateFeatureMetadata(featureName: string): Metadata {
  return generateMetadata({
    title: `${featureName} - AI Chat Features`,
    description: `Explore ${featureName} in our AI Chat platform. Learn how this feature enhances your AI conversation experience.`,
    path: `/features#${featureName.toLowerCase().replace(/\s+/g, '-')}`,
  });
} 