import { Organization, WebSite, WebApplication } from 'schema-dts';

export default function StructuredData() {
  const organization: Organization = {
    "@type": "Organization",
    "name": "AI-Chats.net",
    "url": "https://ai-chats.net",
    "logo": "https://ai-chats.net/logo.png",
    "sameAs": [
      "https://twitter.com/aichatsnet",
      "https://linkedin.com/company/ai-chats-net"
    ]
  };

  const website: WebSite = {
    "@type": "WebSite",
    "name": "AI-Chats.net",
    "url": "https://ai-chats.net",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ai-chats.net/search?q={search_term_string}",
      "query": "required name=search_term_string"
    }
  };

  const webApp: WebApplication = {
    "@type": "WebApplication",
    "name": "AI Chat Assistant",
    "url": "https://ai-chats.net/chat",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "description": "Looking for a free AI chat that actually understands you? Our online AI chat assistant delivers helpful, human-like conversations without signups, subscriptions, or complications.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "No signup required",
      "Completely free to use",
      "Human-like conversations",
      "Available 24/7",
      "Privacy-focused with no data storage",
      "Helpful for students, writers, professionals, and language learners"
    ]
  };

  // Add context to the JSON-LD output
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...organization
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...website
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...webApp
          })
        }}
      />
    </>
  );
} 