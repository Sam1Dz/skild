import { Button, Chip, Drawer, Separator, useOverlayState } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { navRoute } from '@/config/route';

export default function MobileDrawer() {
	const mobileMenu = useOverlayState();

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				isIconOnly
				className="md:hidden"
				onPress={mobileMenu.open}
				aria-label="Open menu"
			>
				<Icon icon="gravity-ui:bars" width={16} height={16} />
			</Button>

			<Drawer.Backdrop
				isOpen={mobileMenu.isOpen}
				onOpenChange={mobileMenu.setOpen}
				variant="blur"
				className="top-16 h-auto"
			>
				<Drawer.Content placement="top" className="h-auto overflow-hidden">
					<Drawer.Dialog className="bg-surface/85 p-4" aria-label="Menu">
						<Drawer.Body className="p-0">
							<nav aria-label="Mobile navigation" className="flex flex-col">
								{navRoute.map((item, index) => (
									<a
										key={item.href}
										href={item.href}
										onClick={mobileMenu.close}
										className={`typography--body-sm flex items-center justify-between py-1 font-medium transition-colors hover:text-accent ${
											index > 0 ? 'mt-4' : ''
										}`}
									>
										<span>{item.label.mobile}</span>
										{item.href === '#saved' && (
											// TODO: replace with live saved-skills count once auth/data is wired
											<Chip className="font-mono" color="accent">
												3
											</Chip>
										)}
									</a>
								))}
							</nav>
						</Drawer.Body>
						<Separator className="mt-3" />
						<Drawer.Footer className="pt-3">
							<Button fullWidth onPress={mobileMenu.close} size="sm">
								<Icon icon="gravity-ui:arrow-right-to-square" width={18} height={18} />
								Sign In
							</Button>
						</Drawer.Footer>
						<Drawer.Handle />
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</>
	);
}
