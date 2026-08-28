import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

export const revalidate = 3600;

type GithubUser = {
  login: string;
  public_repos: number;
  followers: number;
};

type GithubRepo = { stargazers_count: number };

export async function GET() {
  const username = profile.githubUsername;
  if (!username || username === "your-handle") {
    return NextResponse.json({ error: "Set profile.githubUsername in src/lib/data.ts" }, { status: 400 });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "pavani-portfolio",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok) return NextResponse.json({ error: "GitHub user not found." }, { status: 404 });

    const user: GithubUser = await userRes.json();
    const repos: GithubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    return NextResponse.json({
      login: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach GitHub." }, { status: 502 });
  }
}
