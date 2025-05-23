

declare global {
	/**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
	interface 	RoutesType {
		// required props
		name: string;
		path: string;
		// optional props
		icon?: JSX.Element;
		secondary?: boolean;
		layout?: string;
		component?: JSX.Element;
		pro?: boolean;
		demo?: boolean;
		disabled?: boolean;
		collapse?: boolean;
		items?: {
			// required props
			name: string;
			path: string;
			// optional props
			secondary?: boolean;
			layout?: string;
			component?: JSX.Element;
			collapse?: boolean;
			items?: {
				// required props
				name: string;
				layout: string;
				path: string;
				component: JSX.Element;
				// optional props
				secondary?: boolean;
			}[];
		}[];
	}
	interface NavbarCollapseType {
		// required props
		name: string;
		path: string;
		// optional props
		secondary?: boolean;
		layout?: string;
		component?: () => JSX.Element;
		collapse?: boolean;
		items?: {
			// required props
			name: string;
			layout: string;
			path: string;
			component: () => JSX.Element;
			// optional props
			secondary?: boolean;
		}[];
	}
	interface NavbarLinksType {
		// required props
		name: string;
		layout: string;
		path: string;
		component: () => JSX.Element;
		// optional props
		secondary?: boolean;
	}
}

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  desc?: string;
  image?: string;
  title?: string,
  status?: string,
  members?: any[],
  attachements?:string|number
};
