export interface Skill {
	slug: string;
	author: string;
	authorAvatar: string;
	publishedAt: string;
	tags: string[];
	title: string;
	description: string;
	upvotes: number;
	bookmarks: number;
}

export const featuredSkills: Skill[] = [
	{
		slug: 'code-refactor-pro',
		author: 'code_master',
		authorAvatar:
			'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 08, 2024',
		tags: ['code', 'refactoring', 'maintainability'],
		title: 'Code Refactoring Pro',
		description:
			'An AI skill specialized in identifying code smells, suggesting refactors, and improving maintainability.',
		upvotes: 128,
		bookmarks: 12,
	},
	{
		slug: 'security-auditor',
		author: 'sec_expert',
		authorAvatar:
			'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 01, 2024',
		tags: ['security', 'vulnerabilities', 'audit'],
		title: 'Security Auditor',
		description:
			'Scan your codebase for vulnerabilities, secrets, and security misconfigurations in seconds.',
		upvotes: 342,
		bookmarks: 29,
	},
	{
		slug: 'research-agent',
		author: 'alex_dev',
		authorAvatar:
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 12, 2024',
		tags: ['research', 'academic', 'synthesis'],
		title: 'Advanced Research Agent',
		description:
			'A procedural knowledge skill that allows agents to perform deep academic research and synthesis.',
		upvotes: 215,
		bookmarks: 18,
	},
	{
		slug: 'k8s-sentinel',
		author: 'ops_wizard',
		authorAvatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 15, 2024',
		tags: ['kubernetes', 'diagnostics', 'operations'],
		title: 'K8s Cluster Sentinel',
		description:
			'Automated cluster diagnostics, pod incident triage, and root-cause analysis for Kubernetes deployments.',
		upvotes: 189,
		bookmarks: 14,
	},
	{
		slug: 'sql-optimizer',
		author: 'data_flow',
		authorAvatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 18, 2024',
		tags: ['sql', 'query_optimization', 'performance'],
		title: 'SQL Query Optimizer',
		description:
			'Analyzes complex PostgreSQL and Snowflake queries, suggests indexing strategies, and rewrites AST for maximum performance.',
		upvotes: 94,
		bookmarks: 8,
	},
	{
		slug: 'openapi-tool-gen',
		author: 'agent_craft',
		authorAvatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
		publishedAt: 'Mar 20, 2024',
		tags: ['openapi', 'sdk_generation', 'tooling'],
		title: 'OpenAPI Tool Spec Synthesis',
		description:
			'Generates type-safe client SDKs and tool-calling schemas directly from OpenAPI 3.1 REST specifications.',
		upvotes: 163,
		bookmarks: 11,
	},
];
