export async function POST(request) {
    try{

        const formData = await request.formData();
        const screenshot = formData.get('file');

        const uploadData = new FormData();
        uploadData.append('file', screenshot);

        const response = await fetch('https://cdn.hackclub.com/api/v4/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CDN_API_KEY}`,
            },
            body: uploadData,
        });

        const url = await response.json();

        console.log("CDN Status", response.status, "Response:", url);

        if (!response.ok) {
            throw new Error(`Error uploading file: ${url}`);
        }

        if (!url || !url.url) {
            throw new Error("Invalid response from CDN API");
        }

        return Response.json(url, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
            }
        });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        return Response.json({ error: "Failed to upload file to CDN", details: error.message }, { status: 500 });
    }
}