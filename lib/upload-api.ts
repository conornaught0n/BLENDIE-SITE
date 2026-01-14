export const UPLOAD_API_ENDPOINT = 'https://v2.blend.ie/api/upload.php';
export const UPLOAD_API_KEY = 'blendie-agent-secret-2026';

/**
 * Uploads a file or JSON data to the V2 PHP API.
 * @param data - File object or JSON object
 * @param filename - Optional filename for JSON data
 */
export async function uploadToV2(data: File | object, filename?: string) {
  const headers: HeadersInit = {
    'Authorization': `Bearer ${UPLOAD_API_KEY}`,
  };

  let body;

  if (data instanceof File) {
    const formData = new FormData();
    formData.append('file', data);
    body = formData;
  } else {
    // If it's JSON, we send it as a raw body, but the PHP script expects either Multipart or Raw.
    // Based on instructions: "JSON Body: (Raw JSON) -> Saves to /uploads/data_{timestamp}.json"
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(UPLOAD_API_ENDPOINT, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}
