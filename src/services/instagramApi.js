
const ACCESS_TOKEN = "EAAX0gkuDJZAcBQjdzqIVHmhcOzuPgHCyDEqN3boHI57ZCEVObzInOZAjJFB3mWmCkqwGRlETdOHcs3ZBNeea00U0ghpa2kE9YQZAsaH0Btzjyi1fsxMUZB8KwyiXYHcZBV0thr9xi4OxJYDYeTgbT1WkcBwRaDzWn5EqY6FP4dXwHLIEieP4ZCgrtEfnoNeI6XvO";
const BASE_URL = "https://graph.facebook.com";
// const MY_IG_ID = "951644464705650";
const MY_IG_ID ="17841480566976310";

export const searchInstagramProfile = async (username) => {
  const fields = `business_discovery.username(${username}){id,username,name,biography,followers_count,follows_count,profile_picture_url}`;

  const url = `${BASE_URL}/v19.0/${MY_IG_ID}?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Error buscando perfil");
  }

  return data.business_discovery;
};