// src/components/ProfileStats.js
import React, { useEffect, useState } from 'react';
import { getInstagramProfile } from '../services/instagramApi';

const ProfileStats = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getInstagramProfile();
        setProfile(data);
      } catch (err) {
        console.error("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (!profile) return <p>Error al cargar datos.</p>;

  return (
    <div className="instagram-card">
      <h3>@{profile.username}</h3>
      <div className="stats-row">
        <div><strong>{profile.followers_count}</strong> Seguidores</div>
        <div><strong>{profile.follows_count}</strong> Seguidos</div>
      </div>
    </div>
  );
};

export default ProfileStats;
