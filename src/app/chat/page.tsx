'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatPage from '@/components/chat/ChatPage';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message');
  const prompt = searchParams.get('prompt');
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

  return <ChatPage initialMessage={initialMessage} />;
} 