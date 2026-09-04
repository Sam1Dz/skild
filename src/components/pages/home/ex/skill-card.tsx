import { Avatar, Separator } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';

export interface Skill {
	slug: string;
	author: string;
	authorAvatar: string;
	publishedAt: string;
	category: 'CODE' | 'SECURITY' | 'RESEARCH' | 'OPERATIONS';
	title: string;
	description: string;
	upvotes: number;
	comments: number;
}

export default function SkillCard({ skill }: { skill: Skill }) {
	const [copied, setCopied] = useState(false);
	const command = `npx skilled add ${skill.slug}`;

	async function handleCopy() {
		await navigator.clipboard.writeText(`$ ${command}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<article className="group flex flex-col justify-between overflow-hidden rounded-md border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl">
			<div>
				<div className="flex items-center justify-between border-border border-b bg-surface-secondary px-3.5 py-2">
					<div className="flex items-center gap-1.5">
						<span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
						<span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
						<span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
					</div>
					<span className="font-mono text-[10px] text-muted uppercase tracking-wider">
						registry.sh
					</span>
				</div>

				<div className="p-4 sm:p-5">
					<div className="mb-3 flex items-start justify-between gap-3">
						<div className="flex items-center gap-2.5">
							<Avatar size="sm" className="border border-border">
								<Avatar.Image src={skill.authorAvatar} alt={skill.author} />
								<Avatar.Fallback>{skill.author.slice(0, 2).toUpperCase()}</Avatar.Fallback>
							</Avatar>
							<div>
								<p className="font-mono font-semibold text-foreground text-xs">{skill.author}</p>
								<p className="text-[11px] text-muted">{skill.publishedAt}</p>
							</div>
						</div>
						<span className="shrink-0 rounded-sm bg-default px-2 py-0.5 font-mono font-semibold text-[10px] text-default-foreground">
							{skill.category}
						</span>
					</div>

					<h3 className="mb-2 font-bold font-sans text-base text-foreground transition-colors group-hover:text-accent">
						{skill.title}
					</h3>
					<p className="mb-4 line-clamp-3 text-muted text-xs leading-relaxed">
						{skill.description}
					</p>

					<div className="flex items-center justify-between gap-2 rounded-field border border-border bg-surface-secondary p-2.5 font-mono text-xs">
						<span className="truncate text-foreground">$ {command}</span>
						<button
							type="button"
							onClick={handleCopy}
							className="shrink-0 p-1 text-muted transition-colors hover:text-foreground"
							aria-label="Copy install command"
						>
							<Icon icon={copied ? 'gravity-ui:check' : 'gravity-ui:copy'} width={14} height={14} />
						</button>
					</div>
				</div>
			</div>

			<div>
				<Separator />
				<div className="flex items-center justify-between px-4 py-3 text-xs">
					{/* TODO: wire upvote/comment counts to real data once the skills API exists */}
					<div className="flex items-center gap-3 font-mono text-[11px] text-muted">
						<span className="flex items-center gap-1">
							<Icon icon="gravity-ui:heart" width={14} height={14} />
							<span>{skill.upvotes}</span>
						</span>
						<span className="flex items-center gap-1">
							<Icon icon="gravity-ui:message" width={14} height={14} />
							<span>{skill.comments}</span>
						</span>
					</div>
					<div className="flex items-center gap-3 text-foreground">
						{/* TODO: link to the skill detail route once it exists */}
						<button
							type="button"
							className="flex items-center gap-1 font-medium text-xs transition-colors hover:text-accent"
						>
							<span>Open</span>
							<Icon icon="gravity-ui:arrow-up-right-from-square" width={12} height={12} />
						</button>
						{/* TODO: wire to bookmark/save mutation once auth is in place */}
						<button
							type="button"
							className="p-1 text-muted transition-colors hover:text-accent"
							aria-label="Save skill"
						>
							<Icon icon="gravity-ui:bookmark" width={14} height={14} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}
