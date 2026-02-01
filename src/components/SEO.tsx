import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  canonicalUrl?: string;
  jsonLd?: Record<string, any>;
}

const SEO = ({ 
  title, 
  description, 
  image = '/attached_assets/my_logo_ahmed_1768850090136.png', 
  type = 'website',
  keywords = [],
  canonicalUrl,
  jsonLd 
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = 'https://ahmedmokireldin.online'; // Replace with actual domain if different
  const currentUrl = canonicalUrl || `${siteUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const defaultKeywords = ['WhatsApp Marketing', 'SaaS', 'Digital Solutions', 'Ahmed Mo Kireldin', 'Chatbots', 'Business Automation'];
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ');

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | Ahmed Mo Kireldin</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Ahmed Mo Kireldin" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": jsonLd?.["@type"] || "WebSite",
          "name": title,
          "url": currentUrl,
          "description": description,
          "author": {
            "@type": "Person",
            "name": "Ahmed Mo Kireldin",
            "url": siteUrl
          },
          ...jsonLd
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
