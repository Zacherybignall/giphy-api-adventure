export async function GET(request: Request)
{
    const sp = new URL(request.url);
    const offset = Number(sp.searchParams.get("offset") ?? 0);
    const q = sp.searchParams.get("q") ?? "";
    const limit = Number(sp.searchParams.get("limit") ?? 0);
    const apiKey = process.env.GIPHY_API_KEY;
    if (!apiKey) {
        return Response.json(
            { error: "GIPHY_API_KEY is not configured" },
            { status: 500 }
        );
    }

    const params = new URLSearchParams({
        api_key: apiKey,
        q: q,
        limit: limit.toString(),
        offset: offset.toString(),
        rating: "G",
        lang: "en",
    });
    // TODO: make this a .env item 
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?${params}`
    );

    if (response.status === 429) {
        return Response.json(
            { error: "Too many requests. Please wait a moment and try again." },
            { status: 429 }
        );
    }
    if (!response.ok) {
        return  Response.json(response);
    }
    const result = await response.json();
    //This is returning a list and I need the count , split data on what calls it
    return Response.json(result);

}