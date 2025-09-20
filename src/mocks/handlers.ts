import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://hn.algolia.com/api/v1/search", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    return HttpResponse.json({
      hits: [
        {
          objectID: "1",
          title: query === "React" ? "React Story" : "Generic Story",
          url: "https://reactjs.org",
          author: "Jordan",
          num_comments: 3,
          points: 5,
        },
        {
          objectID: "2",
          title: "Redux Story",
          url: "https://redux.js.org",
          author: "Dan",
          num_comments: 2,
          points: 4,
        },
      ],
    });
  }),
];
