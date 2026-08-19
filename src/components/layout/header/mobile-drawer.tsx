import { Button, Chip, Drawer, useOverlayState } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import * as React from 'react';

const NAV_ITEMS = [
	{ href: '#explore', label: 'Explore Skills' },
	{ href: '#saved', label: 'Saved Skills' },
] as const;

export default function MobileDrawer() {
	const mobileMenu = useOverlayState();

	return (
		<React.Fragment>
			<Button variant="ghost" size="sm" isIconOnly className="md:hidden" onPress={mobileMenu.open}>
				<Icon icon="gravity-ui:bars" width={21} height={21} />
			</Button>

			<Drawer.Backdrop
				isOpen={mobileMenu.isOpen}
				onOpenChange={mobileMenu.setOpen}
				variant="blur"
				className="top-16 h-auto"
			>
				<Drawer.Content placement="top" className="h-auto overflow-hidden">
					<Drawer.Dialog>
						<Drawer.Body>
							<nav className="flex flex-col">
								{NAV_ITEMS.map((item, index) => (
									<a
										key={item.href}
										href={item.href}
										onClick={mobileMenu.close}
										className={`flex items-center justify-between py-2.5 font-medium text-foreground text-sm transition-colors hover:text-accent ${
											index > 0 ? 'border-separator border-t pt-4' : ''
										}`}
									>
										<span>{item.label}</span>
										{item.href === '#saved' && (
											<Chip className="font-mono" color="accent">
												3
											</Chip>
										)}
									</a>
								))}
							</nav>
						</Drawer.Body>
						<Drawer.Footer className="border-separator border-t pt-3">
							<Button fullWidth onPress={mobileMenu.close}>
								Log In
							</Button>
						</Drawer.Footer>
						<Drawer.Handle />
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</React.Fragment>
	);
}
