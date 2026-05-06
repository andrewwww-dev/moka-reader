export interface AniListMetadata {
  title: string;
  description: string | null;
  coverImage: string | null;
  genres: string[];
  author: string | null;
  anilistId: number | null;
}

export async function fetchAniListMetadata(title: string): Promise<AniListMetadata | null> {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query SearchManga($search: String) {
          Media(search: $search, type: MANGA) {
            id
            title { romaji english native }
            description(asHtml: false)
            genres
            coverImage { extraLarge large }
            staff(perPage: 1) { nodes { name { full } } }
          }
        }
      `,
      variables: { search: title },
    }),
    next: { revalidate: 86400 },
  });

  if (!response.ok) return null;
  const json = (await response.json()) as {
    data?: {
      Media?: {
        id: number;
        title: { romaji?: string; english?: string; native?: string };
        description?: string | null;
        genres?: string[];
        coverImage?: { extraLarge?: string; large?: string };
        staff?: { nodes?: Array<{ name?: { full?: string } }> };
      };
    };
  };
  const media = json.data?.Media;
  if (!media) return null;

  return {
    title: media.title.english ?? media.title.romaji ?? media.title.native ?? title,
    description: media.description ?? null,
    coverImage: media.coverImage?.extraLarge ?? media.coverImage?.large ?? null,
    genres: media.genres ?? [],
    author: media.staff?.nodes?.[0]?.name?.full ?? null,
    anilistId: media.id,
  };
}
