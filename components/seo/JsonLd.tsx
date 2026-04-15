import React, { useEffect } from 'react';

interface JsonLdProps {
  id: string;
  schema: Record<string, unknown>;
}

/**
 * Injects a JSON-LD <script> tag into <head>.
 * Uses a stable `id` to avoid duplicates on re-render / navigation.
 */
const JsonLd: React.FC<JsonLdProps> = ({ id, schema }) => {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) document.head.removeChild(el);
    };
  }, [id, schema]);

  return null;
};

export default JsonLd;
