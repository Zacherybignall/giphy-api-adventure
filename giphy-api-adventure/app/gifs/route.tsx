export async function GET() {
    console.log("GET /api/gifs reached; key loaded:", Boolean(process.env.GIPHY_API_KEY));

    return Response.json({
        keyLoaded: Boolean(process.env.GIPHY_API_KEY),
    });
}
