// ✅ File: app/api/submit/route.js

export async function POST(req) {
  const body = await req.json();
  const { name, email, token } = body;

  try {
    const res = await fetch('https://rest.leadconnectorhq.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();
    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ success: false, error: err });
  }
}
