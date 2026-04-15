import React from 'react';

interface JsonLdProps {
  schema: Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
);

export default JsonLd;
