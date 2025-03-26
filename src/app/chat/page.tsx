'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ChatPageComponent from '@/components/chat/ChatPage';
import { generateDynamicMetadata } from './metadata';

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const message = searchParams.get('message');
  const prompt = searchParams.get('prompt');
  const model = searchParams.get('model');
  const [initialMessage, setInitialMessage] = useState<string | null>(null);
  const [messageProcessed, setMessageProcessed] = useState(false);
  
  useEffect(() => {
    // Set the initial message from URL parameters if they exist
    // and hasn't been processed yet
    if ((message || prompt) && !messageProcessed) {
      setInitialMessage(prompt || message);
      setMessageProcessed(true);
      
      // Remove the parameters from URL to prevent
      // reprocessing on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete('message');
      url.searchParams.delete('prompt');
      
      // Replace the current URL without the parameters
      // This prevents the message from being reprocessed on refresh
      window.history.replaceState({}, '', url.toString());
    }
  }, [message, prompt, messageProcessed]);

  // Update metadata when model changes
  useEffect(() => {
    if (model) {
      const title = `Chat with ${model} - AI Chat`;
      document.title = title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Experience intelligent conversations with ${model}. Get instant, accurate responses powered by advanced AI technology.`);
      }
      
      // Update OpenGraph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      
      if (ogTitle) ogTitle.setAttribute('content', title);
      if (ogDescription) ogDescription.setAttribute('content', `Experience intelligent conversations with ${model}. Get instant, accurate responses powered by advanced AI technology.`);
      if (ogUrl) ogUrl.setAttribute('content', `https://ai-chats.net${pathname}?model=${model}`);
    }
  }, [model, pathname]);

  return <ChatPageComponent initialMessage={initialMessage} />;
} 