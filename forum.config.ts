import { defineForumConfig } from './src/lib/config/schema';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Discussion Kit configuration
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every option is optional — anything you omit falls back to a sensible
 *  default (see src/lib/config/schema.ts for the full schema and defaults).
 *
 *  Quick start for your own forum:
 *    1. Enable Discussions on your repository and create some categories.
 *    2. Set `site` to your branding.
 *    3. Either set `repo.owner` / `repo.name`, or delete them — when built by
 *       the included GitHub Actions workflow they are auto-detected, so a fork
 *       can deploy without touching any code.
 *    4. Optionally list admin logins below.
 */
export default defineForumConfig({
	site: {
		name: 'Форум NobarskRP',
		description: 'Официальный форум Нобарска',
		logo: '📗',                        // emoji shown instead of the default icon
		footer: '© 2025 NobarskRP. Все права защищены.'
	},

	repo: {
		// Omit owner/name to auto-detect when building in GitHub Actions.
		owner: 'hotabchik',
		name: 'discussion-kit'
	},

	// Extra header links
	nav: [
	{ label: 'Правила', href: '' },
    { label: 'Донат', href: '', external: true },
    { label: 'Discord', href: 'https://discord.gg/qCtG3zvagm', external: true },
    { label: 'Игровой сервер', href: '', external: true }
	],

	auth: {
		allowToken: true,
		oauth: {
			// Fill both to enable the "Continue with GitHub" button (see README):
			clientId: 'Ov23li1QctsLGHqbcIwq',
			proxyUrl: 'https://discussion-kit-oauth.reeceharris.workers.dev'
		}
	},

	admins: {
		logins: ['hotabchik'], // GitHub logins that get the admin badge
		badgeLabel: 'Руководство'  // label shown next to admin usernames
	},

	// Custom badges shown next to usernames: label → GitHub logins
	badges: {
    'Гл. Администратор': ['', ''],
    'Заместитель Гл.Администратора': ['', '', ''],
	'Главный Куратор Гос.Структур': ['', '', ''],
	'Помощник ГК.Гос.Структур': ['', '', ''],
	'Главный Куратор Крайм.Структур': ['', '', ''],
	'Помощник ГК.Крайм.Структур': ['', '', ''],
    'Администратор Форума':         ['', ''],
    'Администратор':    [''],
    'Тестировщик':       ['', '']
		
	},

	content: {
		pageSize: 25,
		sort: 'CREATED_AT',         // or 'UPDATED_AT'
		articles: { enabled: true },
		topics: {
			include: [],              // only these category slugs (empty = all)
			exclude: [],              // hide these category slugs
			restricted: ['announcements'] // announcement-format slugs: only maintainers can post
		}
	},

	features: {
		search: true,
		reactions: true,
		upvotes: true
	},

	// Optional reputation system: users earn rep for activity, topics can
	// require a minimum rep to post. The rep.yml workflow maintains the
	// ledger (rep-data branch) and reactively moderates posts made directly
	// on github.com. Uncomment to enable:
	rep: {
		enabled: true,
		gains: { post: 5, comment: 2, answerAccepted: 15 },
		dailyCaps: { post: 25, comment: 10 },      // rep per UTC day, 0 = uncapped
		topics: { showcase: 50 },                  // slug → min rep to post
		onViolation: 'move',                       // 'move' | 'lock' | 'delete'
		fallbackTopic: 'general'                   // where moved posts land
	},

	// Cold-store archive: the data-sync workflow snapshots the forum to the
	// `data` branch, and signed-out visitors browse it read-only instead of
	// hitting the (auth-only) GitHub API. Public repositories only.
	archive: {
		enabled: true
	},

	// Override any CSS token per scheme, e.g. a blue primary:
	theme: {
		light: {
			// primary: 'hsl(221 83% 53%)',
			// primaryForeground: 'hsl(0 0% 100%)'
		},
		dark: {
			// primary: 'hsl(217 91% 60%)'
		}
	}
});
