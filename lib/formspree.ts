/**
 * Envoi d'un formulaire à Formspree (contact particulier, devis professionnel).
 * Sans identifiant configuré : succès simulé en dev (données loguées), échec en production.
 */
export async function submitToFormspree(data: Record<string, string>): Promise<boolean> {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  if (!formspreeId || formspreeId === 'your_formspree_id_here') {
    if (import.meta.env.DEV) {
      console.info('[Formspree] Not configured. Form data:', data);
      return true;
    }
    return false;
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    return false;
  }
}
