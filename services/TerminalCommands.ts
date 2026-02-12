import { PORTFOLIO_DATA } from '../constants';

export interface CommandResult {
    output: string;
    isError?: boolean;
}

export const commands: Record<string, (args: string[]) => CommandResult> = {
    help: () => ({
        output: `Available commands:
  help              - Show this help message
  ls [section]      - List items (projects, skills, education, leadership)
  cat [file]        - Display content (about, contact, skills.txt)
  clear             - Clear terminal screen
  theme [name]      - Switch theme (dark, light, neon, cyberpunk, retro)
  game [name]       - Launch mini-game (snake, breakout)
  whoami            - Display profile information
  github            - Open GitHub profile
  linkedin          - Open LinkedIn profile
  contact           - Display contact information
  
Type any command to get started!`,
    }),

    ls: (args) => {
        const section = args[0]?.toLowerCase();

        if (!section) {
            return {
                output: `Available sections:
  projects      - List all projects
  skills        - List all skills
  education     - List education history
  leadership    - List leadership positions
  
Usage: ls [section]`,
            };
        }

        switch (section) {
            case 'projects':
                return {
                    output: PORTFOLIO_DATA.projects
                        .map((p, i) => `${i + 1}. ${p.title}\n   ${p.subtitle}`)
                        .join('\n\n'),
                };

            case 'skills':
                const categories = Array.from(new Set(PORTFOLIO_DATA.skills.map(s => s.category)));
                return {
                    output: categories
                        .map(cat => {
                            const skills = PORTFOLIO_DATA.skills
                                .filter(s => s.category === cat)
                                .map(s => s.name)
                                .join(', ');
                            return `[${cat}]\n  ${skills}`;
                        })
                        .join('\n\n'),
                };

            case 'education':
                return {
                    output: PORTFOLIO_DATA.education
                        .map(
                            (e, i) =>
                                `${i + 1}. ${e.degree}\n   ${e.institution}\n   ${e.period}${e.score ? `\n   Score: ${e.score}` : ''}`
                        )
                        .join('\n\n'),
                };

            case 'leadership':
                return {
                    output: PORTFOLIO_DATA.leadership
                        .map((l, i) => `${i + 1}. ${l.role}\n   ${l.organization}\n   ${l.period}`)
                        .join('\n\n'),
                };

            default:
                return {
                    output: `Unknown section: ${section}\nTry: ls projects, ls skills, ls education, or ls leadership`,
                    isError: true,
                };
        }
    },

    cat: (args) => {
        const file = args[0]?.toLowerCase();

        if (!file) {
            return {
                output: `Usage: cat [file]\nAvailable files: about, contact, skills.txt`,
                isError: true,
            };
        }

        switch (file) {
            case 'about':
            case 'about.txt':
                return {
                    output: `${PORTFOLIO_DATA.name}
${PORTFOLIO_DATA.title}

${PORTFOLIO_DATA.about}`,
                };

            case 'contact':
            case 'contact.txt':
                return {
                    output: `Contact Information:
Email: ${Array.isArray(PORTFOLIO_DATA.socials.email) ? PORTFOLIO_DATA.socials.email.join(', ') : PORTFOLIO_DATA.socials.email}
Phone: ${PORTFOLIO_DATA.socials.phone}
LinkedIn: ${PORTFOLIO_DATA.socials.linkedin}
GitHub: ${PORTFOLIO_DATA.socials.github}`,
                };

            case 'skills.txt':
                return commands.ls(['skills']);

            default:
                return {
                    output: `File not found: ${file}`,
                    isError: true,
                };
        }
    },

    clear: () => ({
        output: '__CLEAR__',
    }),

    theme: (args) => {
        const theme = args[0]?.toLowerCase();
        const validThemes = ['dark', 'light', 'neon', 'cyberpunk', 'retro'];

        if (!theme) {
            return {
                output: `Usage: theme [name]\nAvailable themes: ${validThemes.join(', ')}`,
            };
        }

        if (!validThemes.includes(theme)) {
            return {
                output: `Invalid theme: ${theme}\nAvailable themes: ${validThemes.join(', ')}`,
                isError: true,
            };
        }

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        return {
            output: `Theme switched to: ${theme}`,
        };
    },

    game: (args) => {
        const game = args[0]?.toLowerCase();

        if (!game) {
            return {
                output: `Available games:\n  snake - Classic snake game\n  breakout - Breakout arcade game\n\nUsage: game [name]`,
            };
        }

        // Trigger game launch event
        window.dispatchEvent(new CustomEvent('launch-game', { detail: game }));

        return {
            output: `Launching ${game}...`,
        };
    },

    whoami: () => ({
        output: `${PORTFOLIO_DATA.name}
${PORTFOLIO_DATA.title}
${PORTFOLIO_DATA.tagline}`,
    }),

    github: () => {
        window.open(PORTFOLIO_DATA.socials.github, '_blank');
        return {
            output: `Opening GitHub profile...`,
        };
    },

    linkedin: () => {
        window.open(PORTFOLIO_DATA.socials.linkedin, '_blank');
        return {
            output: `Opening LinkedIn profile...`,
        };
    },

    contact: () => commands.cat(['contact']),
};

export const executeCommand = (input: string): CommandResult => {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (!cmd) {
        return { output: '' };
    }

    const command = commands[cmd];

    if (!command) {
        return {
            output: `Command not found: ${cmd}\nType 'help' for available commands.`,
            isError: true,
        };
    }

    return command(args);
};
