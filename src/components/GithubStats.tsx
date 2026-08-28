"use client";

import { useEffect, useState } from "react";

type GithubData = {
  login: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
};

export default function GithubStats() {
  const [data, setData] = useState<GithubData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !data) {
    return (
      <div>
        <strong>GitHub</strong>
        live stats via /api/github — set githubUsername in data.ts
      </div>
    );
  }

  return (
    <div>
      <strong>GitHub — @{data.login}</strong>
      {data.publicRepos} repos · {data.totalStars} stars · {data.followers} followers
    </div>
  );
}
