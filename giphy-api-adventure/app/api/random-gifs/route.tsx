export  async function GET(
) {
    const apiKey = process.env.GIPHY_API_KEY;
    const ramnumber: number = 5;
    if (!apiKey) {
        return Response.json(
            { error: "GIPHY_API_KEY is not configured" },
            { status: 500}
        );
    }


    const params = new URLSearchParams({
        api_key: apiKey,
        rating: "G",
        lang: "en",
    });

    // This is a way for each request to make there own task.
    const results = await Promise.all(
        Array.from({ length: ramnumber }, async () => {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/random?${params}`
            );
            if (response.status == 429) {
                return Response.json(
                    { error: "Too many requests. Please wait a moment and try again." },
                    { status: 429 }
                );
            }
            if (!response.ok) {
                return Response.json(response);
            }

            const result = await response.json();
            // Only need the data , each fetch is one item
            return result.data;
        })
    );
    return Response.json(results);


}
