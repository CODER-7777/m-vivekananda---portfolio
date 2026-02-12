const GITHUB_USERNAME = 'CODER-7777';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface GitHubStats {
    contributions: any[];
    repos: number;
    stars: number;
    followers: number;
    totalCommits: number;
}

export const fetchGitHubStats = async (): Promise<GitHubStats> => {
    // Check cache
    const cached = localStorage.getItem('github-stats');
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }

    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();

        // Fetch all public repos
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate total stars across all repos
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        // Estimate commits (GitHub API doesn't easily provide total commit count without auth)
        // We'll calculate based on repos - this is an approximation
        const totalCommits = reposData.length * 20; // Rough estimate

        const stats: GitHubStats = {
            contributions: [],
            repos: userData.public_repos || 0,
            stars: totalStars,
            followers: userData.followers || 0,
            totalCommits: totalCommits,
        };

        // Cache the data
        localStorage.setItem(
            'github-stats',
            JSON.stringify({
                data: stats,
                timestamp: Date.now(),
            })
        );

        return stats;
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Return fallback data on error
        return {
            contributions: [],
            repos: 0,
            stars: 0,
            followers: 0,
            totalCommits: 0,
        };
    }
};
