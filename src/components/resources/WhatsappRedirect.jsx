import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const WhatsappRedirect = () => {
  const { phone } = useParams();
  const [searchParams] = useSearchParams();
  const text = searchParams.get('text');

  useEffect(() => {
    let deepLink = `whatsapp://send?phone=${phone}`;
    if (text) {
      deepLink += `&text=${encodeURIComponent(text)}`;
    }
    // Attempt direct deep link
    window.location.href = deepLink;

    // Fallback to official web API if deep link fails
    setTimeout(() => {
      window.location.href = `https://api.whatsapp.com/send/?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ''}`;
    }, 2000);
  }, [phone, text]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: 48, height: 48, border: '4px solid #16A34A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      <h2 style={{ marginTop: 24, color: '#0F172A' }}>Opening WhatsApp...</h2>
      <p style={{ color: '#64748B', marginTop: 8 }}>If nothing happens, <a href={`https://api.whatsapp.com/send/?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ''}`} style={{ color: '#16A34A', fontWeight: 600 }}>click here</a>.</p>
    </div>
  );
};

export default WhatsappRedirect;
