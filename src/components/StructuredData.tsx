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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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