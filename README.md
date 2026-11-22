# giphy-api-adventure A GIF Browser Portfolio Project Plan/README

## Summary
This project is a personal portfolio website built with Next.js, React, TypeScript, and DaisyUI. It has three pages: an About Me page, a GIF browser powered by the Giphy API, and a GitHub page showing selected public repositories. The GIF browser is the main feature. It shows three random GIFs before any search, lets users search from a search box or a URL query parameter, and results appear shortly after typing stops. Users can page through many results for each query and copy a GIF's URL , with a toast confirming the copy. Users can also save favorites. Previous search results are saved in local storage, so they remain available when the Giphy API limit is reached. The app runs entirely in the browser.

## Tech Stack
- Next.js (frontend only)
- React
- TypeScript
- DaisyUI


## Pages

| Page | Build in the Frontend | Notes |
|---|---|---|
| 1. About Me | Static page with tools and reasons, plus optional adventure photos and stories | Mostly static. Build first. |
| 2. GIF Browser | Random GIFs on load, search box and URL search, cycling through results, copy and toast, favorites, API limit handling | Main feature and most of the work. |
| 3. GitHub Items | Hardcoded list of selected repos, or a fetch from GitHub's public API | Hardcoding is simplest and avoids rate limits. |

## Page 2: GIF Browser Details
- **Random default view:** Show three random GIFs when the page opens and no query is present
- **Search box:** A DaisyUI input where users type a query. Searching starts after three characters.
- **URL search:** Reading and updating a `q` query parameter (for example, `/gifs?q=cats`). Visiting a URL with `q` runs that search automatically, and each search updates the URL so it can be shared or bookmarked.
- **Fast results:** Wait about 300 milliseconds after the user stops typing before calling Giphy. Ignore responses from earlier queries so results always match the latest search.
- **Cycling through results:** Request results in pages using Giphy's `limit` and `offset` parameters, with Previous and Next buttons. Show how many results have been loaded.
- **Copy for chat:** Each GIF has a copy button that writes the direct GIF URL to the clipboard, which chat programs usually turn into an inline preview. Use `navigator.clipboard.writeText()`.
- **Copy alert:** Show a DaisyUI toast with an alert after a successful copy.
- **API limit handling:** When Giphy returns a rate limit or quota error (HTTP 429 or similar), show a warning alert explaining that the limit has been reached and try again later.
- **Previous results after the limit:** Save the most recent results for each query in local storage, so users can still see them when the limit is reached. Show a notice that these results may be out of date. Keep only a set number of recent queries to stay within local storage limits.
- **Favorites:** Save favorites in local storage so they remain after a refresh. Store only the GIF ID, title, and preview URL.

## TypeScript Notes
- Define types for the Giphy response, GIF objects, and favorites.
- Use `.tsx` for components and `.ts` for helper functions.
- Keep the Giphy API key in one typed config file.

## DaisyUI Components
- navbar: links between the three pages
- join or tabs: switching sections
- input input-bordered: search bar
- card with skeleton: GIF display while loading
- join with btn: Previous and Next buttons for cycling through results
- btn with badge or filled heart: save and copy actions
- toast with alert: copy confirmation
- alert with alert-warning: API limit message

## Build Order
1. Set up the Next.js and TypeScript project with DaisyUI and page navigation.
2. Build the About Me page with placeholder content.
3. Build the GIF browser default view with three random GIFs.
4. Add the search box and the three-character minimum.
5. Add URL search with the `q` query parameter.
6. Add fast results with debouncing and ignore outdated responses.
7. Add cycling through results with Previous and Next buttons.
8. Add the copy button and toast alert.
9. Add favorites with local storage.
10. Add API limit handling and saved previous results.
11. Build the GitHub items page with a hardcoded list of selected repos.
12. Polish the design and test on a phone-sized screen.

## Build Order Breakdown

## Notes and choices made
1 No routes , using tabs . (going to fix , jsut had to get the ball rolling)

### 1. Set up the Next.js and TypeScript project with DaisyUI and page navigation
1. (X)Create the Next.js project with TypeScript enabled.
2. (X)Install and configure DaisyUI with Tailwind CSS.
3. (X)Create three page routes: about, GIF browser, and GitHub items.
4. (X) Build a shared navbar with links to all three pages.
5. (X)Confirm navigation works between pages.

### 2. Build the About Me page with placeholder content
1. (X)Create the about route and link it from the navbar.
2. (X) Plan the page sections: header, tools, and adventures.
3. (X) Add the tools section with placeholder tools and reasons.
4. (X) Add the adventures section with three placeholder cards (photo, title, story).
5. Add the header with a placeholder name, intro line, and profile image.
6. (X) Check that the sections stack cleanly on a phone-sized screen.

### 3. Build the GIF browser default view with three random GIFs
1. (X) Create a Giphy API key and store it in a typed config file.
2. (X) Define TypeScript types for Giphy GIF objects and responses.
3. (X) Build a function that calls the Giphy random endpoint three times.
4. (x)Display each GIF in a DaisyUI card with a skeleton while loading.
5. (x)Show a simple error message if the request fails.

### 4. Add the search box and the three-character minimum
1. (X)Add a search input to the GIF browser page.
2. (X)Show the random GIFs until the user has typed at least three characters.
3. (X)Clear the search and return to the random view when the box is emptied.

### 5. Add URL search with the q query parameter
1. (X)Read the `q` parameter from the URL when the page loads.
2. Run the search automatically if `q` is present.
3. Update the URL with `q` as the user searches, without reloading the page.
4. (X)Test that a shared link such as `/gifs?q=cats` shows the right results.

### 6. Add fast results with debouncing and ignore outdated responses
1. (x)Debounce the input by about 300 milliseconds before calling the Giphy search endpoint.
2. (x)Track the latest query and discard responses for older queries.
3. (x)Test by typing quickly and confirming only the final query's results appear.

### 7. Add cycling through results with Previous and Next buttons
1. (x)Request results in pages using the `limit` and `offset` parameters.
2. (x)Add Previous and Next buttons using a DaisyUI join with btn.
3. Disable Previous on the first page and Next when no more results are available.
4. (x)Show the current range of results, such as "Showing 1 to 12."

### 8. Add the copy button and toast alert
1. (X)Add a copy button to each GIF card.
2. (X)Copy the direct GIF URL with `navigator.clipboard.writeText()`.
3. (X)Show a DaisyUI toast with an alert that confirms the copy.
4. (X)Test pasting the link into a chat program to confirm the preview appears.

### (droped)9. Add favorites with local storage
1. Add a save button to each GIF card.
2. Store the GIF ID, title, and preview URL in local storage when saved.
3. Load saved favorites on page load and show them in a favorites section.
4. Allow removing favorites.

### 10. Add API limit handling and saved previous results
1. Detect rate limit responses from Giphy.
2. Show a warning alert explaining that the limit has been reached.
3. Save the latest results for each query in local storage.
4. Limit how many queries are saved so local storage does not fill up.
5. When the limit is reached, show saved results for the current query with a note that they may be out of date.

### (droped)11. Build the GitHub items page with a hardcoded list of selected repos
1. Choose the repositories to feature.
2. Store their names, descriptions, languages, and links in a typed local data file.
3. Display each repo in a DaisyUI card.
4. Add links that open each repo on GitHub in a new tab.
5. Optionally add a fetch from GitHub's public API later, if you want live data.

### 12. Polish the design and test on a phone-sized screen
1. Review spacing, colors, and typography across all three pages.
2. Test each page at common phone and tablet widths.
3. Check that buttons and inputs are easy to tap.
4. Test the copy and toast behavior on mobile browsers.
5. Test that favorites and saved results still appear after a page refresh.
6. Fix any layout or performance issues you find.
