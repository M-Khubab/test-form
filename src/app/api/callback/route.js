export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  const res = await fetch('https://services.leadconnectorhq.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    })
  });

  const data = await res.json();

  if (data.access_token) {
    return Response.redirect(`/?token=${data.access_token}`);
  }

  return Response.json({ error: 'Token fetch failed', data }, { status: 500 });
}
