import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND } from '../../config/brand.js';

const absoluteUrl = (path = '/') => new URL(path, BRAND.baseUrl).toString();

const upsertMeta = (selector, createAttrs, valueAttr, value) => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(createAttrs).forEach(([key, attrValue]) => node.setAttribute(key, attrValue));
    document.head.appendChild(node);
  }
  node.setAttribute(valueAttr, value);
};

const RouteSEO = ({
  title,
  description,
  path = '/',
  image = '/assets/og-image.jpg',
  imageAlt = BRAND.siteName,
  robots = 'index, follow, max-image-preview:large',
  type = 'website',
  jsonLd,
}) => {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description' }, 'content', description);
    upsertMeta('meta[name="robots"]', { name: 'robots' }, 'content', robots);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'content', type);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'content', BRAND.siteName);
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'content', 'pt_BR');
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, 'content', canonical);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, 'content', title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, 'content', description);
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, 'content', imageUrl);
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, 'content', imageAlt);
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'content', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, 'content', title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, 'content', description);
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, 'content', imageUrl);

    let canonicalNode = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalNode) {
      canonicalNode = document.createElement('link');
      canonicalNode.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalNode);
    }
    canonicalNode.setAttribute('href', canonical);

    document.head.querySelectorAll('script[data-route-jsonld="true"]').forEach((node) => node.remove());
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.routeJsonld = 'true';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [canonical, description, imageAlt, imageUrl, jsonLd, robots, title, type]);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default RouteSEO;
