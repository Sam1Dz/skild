import { Avatar, Chip, Separator } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import type { Skill } from '@/data/dummy';

export default function SkillCard({ skill }: { skill: Skill }) {
	return (
		// TODO: wrap with <Link to="/skills/$slug"> once the skill detail route exists
		<article className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl motion-reduce:transition-none">
			<div>
				<div className="flex items-center justify-between border-border border-b bg-surface-secondary px-3.5 py-2">
					<div className="flex items-center gap-1.5">
						<span className="size-2.5 rounded-full bg-[oklch(0.6935_0.1965_26.69)]" />
						<span className="size-2.5 rounded-full bg-[oklch(0.8377_0.1618_81.06)]" />
						<span className="size-2.5 rounded-full bg-[oklch(0.7304_0.2193_144.63)]" />
					</div>
					<span className="font-mono text-[10px] text-muted uppercase tracking-wider">
						skilled.sh
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
								<p className="typography--body-xs font-mono font-semibold">{skill.author}</p>
								<p className="text-[11px] text-muted">{skill.publishedAt}</p>
							</div>
						</div>

						<div className="flex flex-row gap-1">
							<Chip className="font-mono font-semibold text-[10px] uppercase">
								#{skill.tags[0]}
							</Chip>
							{skill.tags.length > 1 && (
								<Chip className="font-mono font-semibold text-[10px]">
									+{skill.tags.length - 1}
								</Chip>
							)}
						</div>
					</div>

					<h3 className="typography--body mb-2 font-bold transition-colors group-hover:text-accent">
						{skill.title}
					</h3>
					{/* min-h reserves space for 3 lines: 12px (text-xs) * 1.625 (leading-relaxed) * 3 = 58.5px */}
					<p className="typography--body-xs mb-4 line-clamp-3 min-h-[58.5px] text-muted leading-relaxed">
						{skill.description}
					</p>
				</div>
			</div>

			<div>
				<Separator />
				<div className="typography--body-xs px-4 py-3">
					{/* TODO: wire upvote/bookmark counts to real data once the skills API exists */}
					<div className="flex items-center gap-3 font-mono text-[11px] text-muted">
						<span className="flex items-center gap-1">
							<Icon icon="gravity-ui:heart" width={14} height={14} />
							<span>{skill.upvotes}</span>
						</span>
						<span className="flex items-center gap-1">
							<Icon icon="gravity-ui:bookmark" width={14} height={14} />
							<span>{skill.bookmarks}</span>
						</span>
					</div>
				</div>
			</div>
		</article>
	);
}
