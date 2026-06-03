import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/auth.js
var USERS_KEY = "blackjack_users";
var TOKEN_KEY = "token";
var EMAIL_KEY = "userEmail";
var USERNAME_KEY = "userName";
function safeStorage() {
	if (typeof window === "undefined" || !window.localStorage) return null;
	return window.localStorage;
}
function isValidEmail(email) {
	return /^\S+@\S+\.\S+$/.test(email);
}
function getUsers() {
	const ls = safeStorage();
	if (!ls) return [];
	try {
		const raw = ls.getItem(USERS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveUsers(users) {
	const ls = safeStorage();
	if (!ls) return;
	ls.setItem(USERS_KEY, JSON.stringify(users));
}
function registerUser({ username, email, password, confirmPassword }) {
	const errors = {};
	const cleanUsername = String(username || "").trim();
	const cleanEmail = String(email || "").trim().toLowerCase();
	if (!cleanUsername) errors.username = "Please enter a username.";
	if (!cleanEmail) errors.email = "Please enter your email.";
	else if (!isValidEmail(cleanEmail)) errors.email = "Please enter a valid email address.";
	if (!password || String(password).length < 8) errors.password = "Password must be at least 8 characters.";
	if (confirmPassword !== void 0 && password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
	if (Object.keys(errors).length > 0) return {
		ok: false,
		errors
	};
	const users = getUsers();
	if (users.some((u) => u.email === cleanEmail)) return {
		ok: false,
		errors: { email: "email already exists" }
	};
	if (users.some((u) => String(u.username).toLowerCase() === cleanUsername.toLowerCase())) return {
		ok: false,
		errors: { username: "username already exists" }
	};
	const newUser = {
		username: cleanUsername,
		email: cleanEmail,
		password: String(password)
	};
	saveUsers([...users, newUser]);
	return {
		ok: true,
		user: {
			username: cleanUsername,
			email: cleanEmail
		}
	};
}
function loginUser({ email, password }) {
	const errors = {};
	const cleanEmail = String(email || "").trim().toLowerCase();
	if (!cleanEmail) errors.email = "Please enter your email.";
	if (!password || String(password).trim() === "") errors.password = "Please enter your password.";
	if (Object.keys(errors).length > 0) return {
		ok: false,
		errors
	};
	const user = getUsers().find((u) => u.email === cleanEmail);
	if (!user) return {
		ok: false,
		errors: { email: "No account found with that email." }
	};
	if (user.password !== String(password)) return {
		ok: false,
		errors: { password: "Incorrect password." }
	};
	return {
		ok: true,
		user: {
			username: user.username,
			email: user.email
		}
	};
}
function setSession(user) {
	const ls = safeStorage();
	if (!ls) return;
	ls.setItem(TOKEN_KEY, `${user.username}:${Date.now()}`);
	ls.setItem(EMAIL_KEY, user.email || "");
	ls.setItem(USERNAME_KEY, user.username || "");
}
function logout() {
	const ls = safeStorage();
	if (!ls) return;
	ls.removeItem(TOKEN_KEY);
	ls.removeItem(EMAIL_KEY);
	ls.removeItem(USERNAME_KEY);
}
function getCurrentUser() {
	const ls = safeStorage();
	if (!ls) return null;
	if (!ls.getItem(TOKEN_KEY)) return null;
	return { username: ls.getItem(USERNAME_KEY) || "" };
}
function isLoggedIn() {
	return !!getCurrentUser();
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var loggedIn = isLoggedIn();
getCurrentUser();
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("nav", {
		className: "siteNav",
		"aria-label": "Primary navigation",
		children: [
			/* @__PURE__ */ jsx(NavLink, {
				to: "/",
				end: true,
				children: "Blackjack"
			}),
			/* @__PURE__ */ jsx(NavLink, {
				to: "/leaderboard",
				children: "Leaderboard"
			}),
			/* @__PURE__ */ jsx(NavLink, {
				to: "/search",
				id: "searchLink",
				children: "Search"
			}),
			loggedIn ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("button", {
				onClick: () => {
					logout();
					window.location.reload();
				},
				className: "uiButtonSecondary",
				type: "button",
				children: "Logout"
			}) }) : /* @__PURE__ */ jsx(NavLink, {
				to: "/auth/login",
				children: "Login"
			})
		]
	}), /* @__PURE__ */ jsx(Outlet, {})] });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/PlayingCard.jsx
var suitMap = {
	h: "Hearts",
	d: "Diamonds",
	c: "Clubs",
	s: "Spades"
};
var suitCodeMap = {
	h: "H",
	d: "D",
	c: "C",
	s: "S"
};
var rankCodeMap = {
	1: "A",
	10: "0",
	11: "J",
	12: "Q",
	13: "K"
};
var getRankDisplayNameFromNumber = (input) => {
	if (input >= 2 && input <= 10) return input;
	if (input == 1) return "Ace";
	if (input == 11) return "Jack";
	if (input == 12) return "Queen";
	if (input == 13) return "King";
};
var getCardCode = (suit, rank) => {
	return `${rankCodeMap[rank] || rank}${suitCodeMap[suit]}`;
};
function PlayingCard({ suit, rank, faceup }) {
	const cardName = `${getRankDisplayNameFromNumber(rank)} of ${suitMap[suit]}`;
	return /* @__PURE__ */ jsx("div", {
		className: "playingCard",
		children: /* @__PURE__ */ jsx("img", {
			className: "playingCardImage",
			src: faceup === true ? `https://deckofcardsapi.com/static/img/${getCardCode(suit, rank)}.png` : "https://deckofcardsapi.com/static/img/back.png",
			alt: faceup === true ? cardName : "Face-down playing card"
		})
	});
}
//#endregion
//#region app/PlayingCardHand.jsx
function PlayingCardHand({ cards }) {
	return /* @__PURE__ */ jsx("div", {
		className: "playingCardHand",
		children: cards.map((card, index) => /* @__PURE__ */ jsx(PlayingCard, {
			suit: card.suit,
			rank: card.rank,
			faceup: card.faceup
		}, index))
	});
}
//#endregion
//#region app/BlackjackInterface.jsx
function BlackjackInterface({ handleClick, dealerCards, playerCards, handWinner, playerScore, highScore, betScore, playerName, onPlayerNameChange, playerPin, onPlayerPinChange, onLogin, onLogout, isAuthenticated, authMessage, scoreSubmitMessage, dealButtonDisabled, addBetButtonDisabled, clearBetButtonDisabled, hitButtonDisabled, standButtonDisabled, resetButtonDisabled, doneLevel, inLevels }) {
	return /* @__PURE__ */ jsx("div", {
		className: "tableLayout",
		children: /* @__PURE__ */ jsxs("div", {
			className: "uiCard",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "tableTitle",
					children: "Blackjack"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "buttonRow",
					children: [
						/* @__PURE__ */ jsx("button", {
							className: "uiButtonSecondary",
							onClick: () => handleClick("Random"),
							children: "Random"
						}),
						!inLevels && /* @__PURE__ */ jsx("button", {
							className: "uiButtonSecondary",
							id: "levelsButton",
							onClick: () => handleClick("Levels"),
							children: "Levels"
						}),
						inLevels && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level1"),
								children: "Level 1"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level2"),
								children: "Level 2"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level3"),
								children: "Level 3"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level4"),
								children: "Level 4"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level5"),
								children: "Level 5"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level6"),
								children: "Level 6"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level7"),
								children: "Level 7"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level8"),
								children: "Level 8"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								onClick: () => handleClick("Level9"),
								children: "Level 9"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "uiButtonSecondary",
								id: "level10Button",
								onClick: () => handleClick("Level10"),
								children: "Level 10"
							})
						] })
					]
				}),
				/* @__PURE__ */ jsx("hr", { className: "feltDivider" }),
				/* @__PURE__ */ jsxs("div", {
					className: "authPanel",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "playerNameField",
							children: [/* @__PURE__ */ jsx("span", {
								className: "statLabel",
								children: "Player Name"
							}), /* @__PURE__ */ jsx("input", {
								className: "playerNameInput",
								type: "text",
								value: playerName,
								onChange: (event) => onPlayerNameChange(event.target.value),
								maxLength: 24,
								disabled: isAuthenticated,
								id: "playerNameInput"
							})]
						}),
						!isAuthenticated && /* @__PURE__ */ jsxs("label", {
							className: "playerNameField",
							children: [/* @__PURE__ */ jsx("span", {
								className: "statLabel",
								children: "PIN"
							}), /* @__PURE__ */ jsx("input", {
								className: "playerNameInput pinInput",
								type: "password",
								value: playerPin,
								onChange: (event) => onPlayerPinChange(event.target.value),
								maxLength: 24,
								id: "pinInput"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							className: "uiButtonSecondary",
							type: "button",
							onClick: isAuthenticated ? onLogout : onLogin,
							id: "logInButton",
							children: isAuthenticated ? "Log Out" : "Log In"
						}),
						authMessage && /* @__PURE__ */ jsx("div", {
							className: "authMessage",
							children: authMessage
						})
					]
				}),
				/* @__PURE__ */ jsx("hr", { className: "feltDivider" }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "sectionLabel",
					children: "Dealer"
				}), /* @__PURE__ */ jsx(PlayingCardHand, { cards: dealerCards })] }),
				/* @__PURE__ */ jsx("hr", { className: "feltDivider" }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "sectionLabel",
					children: "Player"
				}), /* @__PURE__ */ jsx(PlayingCardHand, { cards: playerCards })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "buttonRow",
					children: [
						/* @__PURE__ */ jsx("button", {
							disabled: dealButtonDisabled,
							className: "uiButton",
							id: "dealButton",
							onClick: () => handleClick("Deal"),
							children: "Deal"
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: addBetButtonDisabled,
							className: "uiButton",
							id: "addBetButton",
							onClick: () => handleClick("Add Bet"),
							children: "Add Bet"
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: clearBetButtonDisabled,
							className: "uiButton",
							onClick: () => handleClick("Clear Bet"),
							children: "Clear Bet"
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: hitButtonDisabled,
							className: "uiButton",
							onClick: () => handleClick("Hit"),
							children: "Hit"
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: standButtonDisabled,
							className: "uiButton",
							id: "standButton",
							onClick: () => handleClick("Stand"),
							children: "Stand"
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: resetButtonDisabled,
							className: "uiButton",
							id: "resetButton",
							onClick: () => handleClick("Reset"),
							children: "Reset"
						})
					]
				}),
				/* @__PURE__ */ jsx("hr", { className: "feltDivider" }),
				/* @__PURE__ */ jsxs("div", {
					className: "statsRow",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "statChip",
							children: [/* @__PURE__ */ jsx("span", {
								className: "statLabel",
								children: "Current Bet"
							}), /* @__PURE__ */ jsx("span", {
								className: "statValue",
								children: betScore
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "statChip",
							children: [/* @__PURE__ */ jsx("span", {
								className: "statLabel",
								children: "Score"
							}), /* @__PURE__ */ jsx("span", {
								className: "statValue",
								children: playerScore
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "statChip",
							children: [/* @__PURE__ */ jsx("span", {
								className: "statLabel",
								children: "Best Run"
							}), /* @__PURE__ */ jsx("span", {
								className: "statValue",
								children: highScore
							})]
						})
					]
				}),
				handWinner && /* @__PURE__ */ jsx("div", {
					className: "winnerBanner",
					children: handWinner === "Draw" ? "- Draw -" : `${handWinner} Wins!`
				}),
				doneLevel && /* @__PURE__ */ jsx("div", {
					className: "levelBanner",
					children: "Your 10 hands are up. Press Reset to retry."
				}),
				scoreSubmitMessage && /* @__PURE__ */ jsx("div", {
					className: "levelBanner",
					children: scoreSubmitMessage
				})
			]
		})
	});
}
//#endregion
//#region app/BlackjackGame.jsx
var suits = [
	"h",
	"d",
	"c",
	"s"
];
var PlayingCardObject = class {
	constructor(suit, rank, faceup) {
		this.suit = suit;
		this.rank = rank;
		this.faceup = faceup;
	}
};
var deck1 = [
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("s", 11, true)
];
var deck2 = [
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("c", 3, true)
];
var deck3 = [
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("s", 5, true)
];
var deck4 = [
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("d", 3, true)
];
var deck5 = [
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("s", 2, true)
];
var deck6 = [
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("d", 12, true)
];
var deck7 = [
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("h", 6, true)
];
var deck8 = [
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("c", 4, true)
];
var deck9 = [
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("c", 8, true),
	new PlayingCardObject("c", 7, true)
];
var deck10 = [
	new PlayingCardObject("s", 2, true),
	new PlayingCardObject("d", 10, true),
	new PlayingCardObject("h", 2, true),
	new PlayingCardObject("h", 4, true),
	new PlayingCardObject("h", 12, true),
	new PlayingCardObject("d", 13, true),
	new PlayingCardObject("h", 5, true),
	new PlayingCardObject("d", 4, true),
	new PlayingCardObject("s", 4, true),
	new PlayingCardObject("c", 2, true),
	new PlayingCardObject("h", 13, true),
	new PlayingCardObject("h", 1, true),
	new PlayingCardObject("c", 1, true),
	new PlayingCardObject("d", 11, true),
	new PlayingCardObject("c", 11, true),
	new PlayingCardObject("h", 7, true),
	new PlayingCardObject("c", 12, true),
	new PlayingCardObject("s", 9, true),
	new PlayingCardObject("d", 12, true),
	new PlayingCardObject("h", 10, true),
	new PlayingCardObject("s", 3, true),
	new PlayingCardObject("c", 10, true),
	new PlayingCardObject("s", 6, true),
	new PlayingCardObject("d", 6, true),
	new PlayingCardObject("d", 1, true),
	new PlayingCardObject("s", 13, true),
	new PlayingCardObject("s", 11, true),
	new PlayingCardObject("s", 5, true),
	new PlayingCardObject("d", 5, true),
	new PlayingCardObject("c", 4, true),
	new PlayingCardObject("d", 2, true),
	new PlayingCardObject("d", 3, true),
	new PlayingCardObject("d", 7, true),
	new PlayingCardObject("c", 5, true),
	new PlayingCardObject("c", 9, true),
	new PlayingCardObject("s", 1, true),
	new PlayingCardObject("c", 6, true),
	new PlayingCardObject("s", 12, true),
	new PlayingCardObject("c", 7, true),
	new PlayingCardObject("s", 7, true),
	new PlayingCardObject("h", 9, true),
	new PlayingCardObject("h", 6, true),
	new PlayingCardObject("c", 3, true),
	new PlayingCardObject("h", 11, true),
	new PlayingCardObject("d", 9, true),
	new PlayingCardObject("d", 8, true),
	new PlayingCardObject("s", 10, true),
	new PlayingCardObject("h", 8, true),
	new PlayingCardObject("s", 8, true),
	new PlayingCardObject("h", 3, true),
	new PlayingCardObject("c", 13, true),
	new PlayingCardObject("c", 8, true)
];
function BlackjackGame() {
	const getInitialPlayerName = () => {
		if (typeof window === "undefined") return "Player";
		return window.localStorage.getItem("blackjackPlayerName") || "Player";
	};
	const getInitialAuthToken = () => {
		if (typeof window === "undefined") return "";
		return window.localStorage.getItem("blackjackAuthToken") || "";
	};
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};
	const [deck, setDeck] = useState([]);
	const resetDeck = () => {
		let result = [];
		for (let i = 1; i <= 13; i++) for (const s of suits) result.push(new PlayingCardObject(s, i, true));
		shuffle(result);
		setDeck(result);
	};
	useEffect(() => {
		resetDeck();
	}, []);
	const pullCard = (count = 1) => {
		if (deck.length === 0) return;
		let result = deck.slice(0, count);
		setDeck((prev) => prev.slice(count));
		return result;
	};
	const [mode, setMode] = useState("Random");
	const [level, setLevel] = useState(0);
	const [playerName, setPlayerName] = useState(getInitialPlayerName);
	const [playerPin, setPlayerPin] = useState("");
	const [authToken, setAuthToken] = useState(getInitialAuthToken);
	const [authMessage, setAuthMessage] = useState(getInitialAuthToken() ? "Logged in." : "");
	const [scoreSubmitMessage, setScoreSubmitMessage] = useState("");
	const [handWinner, setHandWinner] = useState("");
	const [handsPlayed, setHandsPlayed] = useState(0);
	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [clickableButtons, setClickableButtons] = useState([
		"Deal",
		"Add Bet",
		"Clear Bet",
		"Reset",
		"Random",
		"Levels"
	]);
	const [bet, setBet] = useState(0);
	function handlePlayerNameChange(nextName) {
		setPlayerName(nextName);
		if (typeof window !== "undefined") window.localStorage.setItem("blackjackPlayerName", nextName);
	}
	async function handleLogin() {
		const username = playerName.trim();
		if (username.length === 0) {
			setAuthMessage("Enter a player name to log in.");
			return;
		}
		if (playerPin.trim().length < 4) {
			setAuthMessage("Enter a PIN with at least 4 characters.");
			return;
		}
		setAuthMessage("Logging in...");
		try {
			const response = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					pin: playerPin
				})
			});
			if (!response.ok) throw new Error("Login failed.");
			const data = await response.json();
			setAuthToken(data.token);
			setPlayerName(data.username);
			setPlayerPin("");
			setAuthMessage(`Logged in as ${data.username}.`);
			if (typeof window !== "undefined") {
				window.localStorage.setItem("blackjackAuthToken", data.token);
				window.localStorage.setItem("blackjackPlayerName", data.username);
			}
		} catch (err) {
			console.error("Login failed:", err);
			setAuthMessage("Could not log in. Is the server running?");
		}
	}
	async function handleLogout() {
		const token = authToken;
		setAuthToken("");
		setAuthMessage("Logged out.");
		if (typeof window !== "undefined") window.localStorage.removeItem("blackjackAuthToken");
		if (!token) return;
		try {
			await fetch("http://localhost:5000/auth/logout", {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch (err) {
			console.error("Logout failed:", err);
		}
	}
	async function submitScore(finalScore, scoreLevel) {
		if (!authToken) {
			setScoreSubmitMessage("Log in before submitting a score.");
			return;
		}
		setScoreSubmitMessage("Submitting score...");
		try {
			const response = await fetch("http://localhost:5000/postScore", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`
				},
				body: JSON.stringify({
					score: finalScore,
					level: scoreLevel
				})
			});
			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				if (response.status === 401) {
					setAuthToken("");
					if (typeof window !== "undefined") window.localStorage.removeItem("blackjackAuthToken");
					setAuthMessage("Log in again before submitting scores.");
				}
				throw new Error(data.error ?? "Score submission failed.");
			}
			setScoreSubmitMessage("Score submitted.");
		} catch (err) {
			console.error("Score submission failed:", err);
			setScoreSubmitMessage(err.message);
		}
	}
	function handleClick(type) {
		if (!clickableButtons.includes(type)) return;
		if (type == "Deal") {
			const cards = pullCard(4);
			const nextPlayerCards = [cards[0], cards[2]];
			const nextDealerCards = [cards[1], cards[3]];
			setPlayerCards(nextPlayerCards);
			setDealerCards(nextDealerCards);
			setHandWinner("");
			setClickableButtons([
				"Hit",
				"Stand",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			checkGameState("Deal", nextDealerCards, nextPlayerCards);
		} else if (type == "Add Bet") {
			if (score >= 50) {
				setBet((prev) => prev + 50);
				setScore((prev) => prev - 50);
			}
		} else if (type == "Clear Bet") {
			setScore((prev) => prev + bet);
			setBet(0);
		} else if (type == "Hit") {
			const nextPlayerCards = playerCards.concat(pullCard());
			setPlayerCards(nextPlayerCards);
			setClickableButtons([
				"Hit",
				"Stand",
				"Reset",
				"Random",
				"Levels"
			]);
			checkGameState("Hit", dealerCards, nextPlayerCards);
		} else if (type == "Stand") checkGameState("Stand");
		else if (type == "Reset") {
			setPlayerCards([]);
			setDealerCards([]);
			if (level == 0) resetDeck();
			else if (level == 1) setDeck(deck1);
			else if (level == 2) setDeck(deck2);
			else if (level == 3) setDeck(deck3);
			else if (level == 4) setDeck(deck4);
			else if (level == 5) setDeck(deck5);
			else if (level == 6) setDeck(deck6);
			else if (level == 7) setDeck(deck7);
			else if (level == 8) setDeck(deck8);
			else if (level == 9) setDeck(deck9);
			else if (level == 10) setDeck(deck10);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setScoreSubmitMessage("");
		} else if (type == "Random") {
			setMode("Random");
			setPlayerCards([]);
			setDealerCards([]);
			resetDeck();
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(0);
			setScoreSubmitMessage("");
		} else if (type == "Levels") {
			setMode("Levels");
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
		} else if (type == "Level1") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck1);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(1);
			setScoreSubmitMessage("");
		} else if (type == "Level2") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck2);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(2);
			setScoreSubmitMessage("");
		} else if (type == "Level3") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck3);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(3);
			setScoreSubmitMessage("");
		} else if (type == "Level4") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck4);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(4);
			setScoreSubmitMessage("");
		} else if (type == "Level5") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck5);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(5);
			setScoreSubmitMessage("");
		} else if (type == "Level6") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck6);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(6);
			setScoreSubmitMessage("");
		} else if (type == "Level7") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck7);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(7);
			setScoreSubmitMessage("");
		} else if (type == "Level8") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck8);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(8);
			setScoreSubmitMessage("");
		} else if (type == "Level9") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck9);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(9);
			setScoreSubmitMessage("");
		} else if (type == "Level10") {
			setPlayerCards([]);
			setDealerCards([]);
			setDeck(deck10);
			setClickableButtons([
				"Deal",
				"Add Bet",
				"Clear Bet",
				"Reset",
				"Random",
				"Levels",
				"Level1",
				"Level2",
				"Level3",
				"Level4",
				"Level5",
				"Level6",
				"Level7",
				"Level8",
				"Level9",
				"Level10"
			]);
			setScore(100);
			setHandWinner("");
			setHandsPlayed(0);
			setLevel(10);
			setScoreSubmitMessage("");
		}
	}
	function getHandValue(cards) {
		let total = cards.reduce((sum, card) => {
			return sum + (card.rank > 10 ? 10 : card.rank);
		}, 0);
		const aces = cards.filter((card) => card.rank === 1);
		for (let i = 0; i < aces.length; i++) if (total + 10 <= 21) total += 10;
		return total;
	}
	function checkGameState(caller, dealerHand = dealerCards, playerHand = playerCards) {
		const playerTotal = getHandValue(playerHand);
		let dealerCardsLocal = dealerHand.slice();
		let dealerTotal = getHandValue(dealerCardsLocal);
		if (playerTotal > 21) {
			setHandWinner("Dealer");
			endRound(0);
		} else if (dealerTotal > 21) {
			setHandWinner("Player");
			endRound(100);
		} else if (caller == "Stand") {
			if (dealerTotal >= 17 || dealerTotal > playerTotal) {
				if (dealerTotal > 21 || playerTotal > dealerTotal) {
					setHandWinner("Player");
					endRound(100);
				} else if (dealerTotal > playerTotal) {
					setHandWinner("Dealer");
					endRound(0);
				} else {
					setHandWinner("Draw");
					endRound(50);
				}
				return;
			}
			const newCard = {
				suit: suits[Math.floor(Math.random() * suits.length)],
				rank: Math.floor(Math.random() * 10) + 1,
				faceup: true
			};
			dealerCardsLocal = dealerCardsLocal.concat(newCard);
			dealerTotal = getHandValue(dealerCardsLocal);
			setDealerCards(dealerCardsLocal);
			setTimeout(() => {
				checkGameState("Stand", dealerCardsLocal);
			}, 100);
		}
	}
	const [score, setScore] = useState(100);
	const [highScore, setHighScore] = useState(0);
	const [highScoreL1, setHighScoreL1] = useState(0);
	const [highScoreL2, setHighScoreL2] = useState(0);
	const [highScoreL3, setHighScoreL3] = useState(0);
	const [highScoreL4, setHighScoreL4] = useState(0);
	const [highScoreL5, setHighScoreL5] = useState(0);
	const [highScoreL6, setHighScoreL6] = useState(0);
	const [highScoreL7, setHighScoreL7] = useState(0);
	const [highScoreL8, setHighScoreL8] = useState(0);
	const [highScoreL9, setHighScoreL9] = useState(0);
	const [highScoreL10, setHighScoreL10] = useState(0);
	function endRound(tScore) {
		setClickableButtons([
			"Deal",
			"Add Bet",
			"Clear Bet",
			"Reset",
			"Random",
			"Levels",
			"Level1",
			"Level2",
			"Level3",
			"Level4",
			"Level5",
			"Level6",
			"Level7",
			"Level8",
			"Level9",
			"Level10"
		]);
		let nextScore = score;
		if (tScore == 0) setBet(0);
		else if (tScore == 50) {
			nextScore = score + bet;
			setScore(nextScore);
			setBet(0);
		} else if (tScore == 100) {
			nextScore = score + bet * 2;
			setScore(nextScore);
			setBet(0);
		}
		const amount = handsPlayed + 1;
		setHandsPlayed((prev) => prev + 1);
		if (amount >= 10) {
			if (level == 0) {
				if (nextScore > highScore) setHighScore(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 1) {
				if (nextScore > highScoreL1) setHighScoreL1(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 2) {
				if (nextScore > highScoreL2) setHighScoreL2(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 3) {
				if (nextScore > highScoreL3) setHighScoreL3(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 4) {
				if (nextScore > highScoreL4) setHighScoreL4(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 5) {
				if (nextScore > highScoreL5) setHighScoreL5(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 6) {
				if (nextScore > highScoreL6) setHighScoreL6(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 7) {
				if (nextScore > highScoreL7) setHighScoreL7(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 8) {
				if (nextScore > highScoreL8) setHighScoreL8(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 9) {
				if (nextScore > highScoreL9) setHighScoreL9(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			} else if (level == 10) {
				if (nextScore > highScoreL10) setHighScoreL10(nextScore);
				setClickableButtons([
					"Reset",
					"Random",
					"Levels",
					"Level1",
					"Level2",
					"Level3",
					"Level4",
					"Level5",
					"Level6",
					"Level7",
					"Level8",
					"Level9",
					"Level10"
				]);
			}
			submitScore(nextScore, level);
		}
	}
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(BlackjackInterface, {
		handleClick,
		dealerCards,
		playerCards,
		handWinner,
		playerScore: score,
		highScore: (level == 0 && highScore) + (level == 1 && highScoreL1) + (level == 2 && highScoreL2) + (level == 3 && highScoreL3) + (level == 4 && highScoreL4) + (level == 5 && highScoreL5) + (level == 6 && highScoreL6) + (level == 7 && highScoreL7) + (level == 8 && highScoreL8) + (level == 9 && highScoreL9) + (level == 10 && highScoreL10),
		betScore: bet,
		playerName,
		onPlayerNameChange: handlePlayerNameChange,
		playerPin,
		onPlayerPinChange: setPlayerPin,
		onLogin: handleLogin,
		onLogout: handleLogout,
		isAuthenticated: Boolean(authToken),
		authMessage,
		scoreSubmitMessage,
		dealButtonDisabled: clickableButtons.findIndex((a) => a == "Deal") == -1,
		addBetButtonDisabled: clickableButtons.findIndex((a) => a == "Add Bet") == -1,
		clearBetButtonDisabled: clickableButtons.findIndex((a) => a == "Clear Bet") == -1,
		hitButtonDisabled: clickableButtons.findIndex((a) => a == "Hit") == -1,
		standButtonDisabled: clickableButtons.findIndex((a) => a == "Stand") == -1,
		resetButtonDisabled: clickableButtons.findIndex((a) => a == "Reset") == -1,
		doneLevel: handsPlayed >= 10,
		inLevels: mode != "Random"
	}) });
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$2
});
function meta$2({}) {
	return [{ title: "Blackjack" }, {
		name: "description",
		content: "Play Blackjack!"
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", {
		className: "gamePage",
		children: /* @__PURE__ */ jsx(BlackjackGame, {})
	}) });
});
//#endregion
//#region app/routes/leaderboard.tsx
var leaderboard_exports = /* @__PURE__ */ __exportAll({ default: () => leaderboard_default });
var leaderboard_default = UNSAFE_withComponentProps(function Leaderboard() {
	const [scores, setScores] = useState([]);
	const [level, setLevel] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
		const controller = new AbortController();
		setIsLoading(true);
		setErrorMessage("");
		fetch(`http://localhost:5000/scores/top?level=${level}&limit=10`, { signal: controller.signal }).then(async (res) => {
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error ?? "Unable to load leaderboard");
			}
			return res.json();
		}).then((data) => {
			setScores(data.scores ?? []);
		}).catch((err) => {
			if (err.name !== "AbortError") setErrorMessage(err.message);
		}).finally(() => {
			if (!controller.signal.aborted) setIsLoading(false);
		});
		return () => controller.abort();
	}, [level]);
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen bg-green-950 text-white",
		children: /* @__PURE__ */ jsxs("section", {
			className: "mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold uppercase tracking-wide text-green-200",
					children: "CS35L Team Project"
				}), /* @__PURE__ */ jsx("h1", {
					className: "mt-3 text-4xl font-bold",
					children: "Leaderboard"
				})] }),
				/* @__PURE__ */ jsxs("label", {
					className: "flex w-fit flex-col gap-2 text-sm font-semibold text-green-100",
					children: ["Level", /* @__PURE__ */ jsxs("select", {
						className: "rounded border border-green-700 bg-green-900 px-3 py-2 text-white",
						value: level,
						onChange: (event) => setLevel(Number(event.target.value)),
						children: [/* @__PURE__ */ jsx("option", {
							value: 0,
							children: "Random"
						}), Array.from({ length: 10 }, (_, index) => /* @__PURE__ */ jsxs("option", {
							value: index + 1,
							children: ["Level ", index + 1]
						}, index + 1))]
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-lg text-green-100",
					children: "Top 10 Players"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-2 flex flex-col gap-3",
					children: [
						isLoading && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-green-700 bg-green-900 p-3 text-green-100",
							children: "Loading scores..."
						}),
						!isLoading && errorMessage && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-red-400 bg-red-950 p-3 text-red-100",
							children: errorMessage
						}),
						!isLoading && !errorMessage && scores.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-green-700 bg-green-900 p-3 text-green-100",
							children: "No scores have been submitted for this level yet."
						}),
						!isLoading && !errorMessage && scores.map((player, index) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between rounded border border-green-700 bg-green-900 p-3",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "font-semibold text-green-200",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "inline-block w-12",
									children: ["#", index + 1]
								}), player.username]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-green-100",
								children: ["$", player.score]
							})]
						}, player._id))
					]
				})] })
			]
		})
	});
});
//#endregion
//#region app/routes/search.tsx
var search_exports = /* @__PURE__ */ __exportAll({ default: () => search_default });
var search_default = UNSAFE_withComponentProps(function Search() {
	const [search, setSearch] = useState("");
	const [scores, setScores] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
		const query = search.trim();
		if (query.length === 0) {
			setScores([]);
			setErrorMessage("");
			setIsLoading(false);
			return;
		}
		const controller = new AbortController();
		const timeoutId = window.setTimeout(() => {
			setIsLoading(true);
			setErrorMessage("");
			fetch(`http://localhost:5000/scores/search?username=${encodeURIComponent(query)}&limit=20`, { signal: controller.signal }).then(async (res) => {
				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.error ?? "Unable to search players");
				}
				return res.json();
			}).then((data) => {
				setScores(data.scores ?? []);
			}).catch((err) => {
				if (err.name !== "AbortError") setErrorMessage(err.message);
			}).finally(() => {
				if (!controller.signal.aborted) setIsLoading(false);
			});
		}, 250);
		return () => {
			window.clearTimeout(timeoutId);
			controller.abort();
		};
	}, [search]);
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen bg-green-950 text-white",
		children: /* @__PURE__ */ jsxs("section", {
			className: "mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold uppercase tracking-wide text-green-200",
					children: "CS35L Team Project"
				}), /* @__PURE__ */ jsx("h1", {
					className: "mt-3 text-4xl font-bold",
					children: "Search Players"
				})] }),
				/* @__PURE__ */ jsx("input", {
					type: "text",
					placeholder: "Enter username here to search.",
					value: search,
					onChange: (event) => setSearch(event.target.value),
					className: "rounded border border-green-700 bg-green-900 px-4 py-2 text-white placeholder-green-400",
					id: "playerSearchInput"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3",
					children: [
						search.trim().length === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-green-700 bg-green-900 p-3 text-green-100",
							children: "Enter a username to search submitted scores."
						}),
						isLoading && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-green-700 bg-green-900 p-3 text-green-100",
							children: "Searching players..."
						}),
						!isLoading && errorMessage && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-red-400 bg-red-950 p-3 text-red-100",
							children: errorMessage
						}),
						!isLoading && !errorMessage && search.trim().length > 0 && scores.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded border border-green-700 bg-green-900 p-3 text-green-100",
							children: "No submitted scores match that username."
						}),
						!isLoading && !errorMessage && scores.map((player) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between rounded border border-green-700 bg-green-900 p-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-green-200",
								children: player.username
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-green-100",
								children: player.level === 0 ? "Random" : `Level ${player.level}`
							})] }), /* @__PURE__ */ jsxs("p", {
								className: "font-semibold text-green-100",
								children: ["$", player.score]
							})]
						}, player._id))
					]
				})
			]
		})
	});
});
//#endregion
//#region app/login.jsx
function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		setErrors({});
		const result = loginUser({
			email,
			password
		});
		if (!result.ok) {
			setErrors(result.errors);
			return;
		}
		setSession(result.user);
		navigate("/");
	};
	return /* @__PURE__ */ jsx("div", {
		className: "tableLayout",
		children: /* @__PURE__ */ jsxs("div", {
			className: "uiCard",
			children: [/* @__PURE__ */ jsx("div", {
				className: "tableTitle",
				children: "Blackjack Login"
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleLogin,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Email"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "uiInput",
								placeholder: "Enter your email"
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.email
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Password"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "passwordWrapper",
								children: [/* @__PURE__ */ jsx("input", {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "uiInput",
									placeholder: "Enter your password"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "uiButtonSecondary",
									onClick: () => setShowPassword(!showPassword),
									children: showPassword ? "Hide" : "Show"
								})]
							}),
							errors.password && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.password
							})
						]
					}),
					errors.general && /* @__PURE__ */ jsx("div", {
						className: "winnerBanner",
						children: errors.general
					}),
					/* @__PURE__ */ jsx("div", {
						className: "buttonRow",
						children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "uiButton",
							children: "Login"
						})
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "authSwitch",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/auth/register",
								children: "Register"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
//#region app/routes/login.tsx
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => login_default,
	meta: () => meta$1
});
function meta$1() {
	return [{ title: "Login | Blackjack" }, {
		name: "description",
		content: "Log in to play Blackjack."
	}];
}
var login_default = UNSAFE_withComponentProps(function Login() {
	return /* @__PURE__ */ jsx(LoginPage, {});
});
//#endregion
//#region app/register.jsx
function RegisterPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmed, setShowConfirmed] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const handleRegister = (e) => {
		e.preventDefault();
		setErrors({});
		const result = registerUser({
			username,
			email,
			password,
			confirmPassword
		});
		if (!result.ok) {
			setErrors(result.errors);
			return;
		}
		setSession(result.user);
		navigate("/");
	};
	return /* @__PURE__ */ jsx("div", {
		className: "tableLayout",
		children: /* @__PURE__ */ jsxs("div", {
			className: "uiCard",
			children: [/* @__PURE__ */ jsx("div", {
				className: "tableTitle",
				children: "Blackjack Register"
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleRegister,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Username"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								value: username,
								onChange: (e) => setUsername(e.target.value),
								className: "uiInput",
								placeholder: "Choose a username"
							}),
							errors.username && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.username
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Email"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "uiInput",
								placeholder: "Enter your email"
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.email
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Password"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "passwordWrapper",
								children: [/* @__PURE__ */ jsx("input", {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "uiInput",
									placeholder: "At least 8 characters"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "uiButtonSecondary",
									onClick: () => setShowPassword(!showPassword),
									children: showPassword ? "Hide" : "Show"
								})]
							}),
							errors.password && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.password
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "inputSection",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "sectionLabel",
								children: "Confirm Password"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "passwordWrapper",
								children: [/* @__PURE__ */ jsx("input", {
									type: showConfirmed ? "text" : "password",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									className: "uiInput",
									placeholder: "Re-enter your password"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "uiButtonSecondary",
									onClick: () => setShowConfirmed(!showConfirmed),
									children: showConfirmed ? "Hide" : "Show"
								})]
							}),
							errors.confirmPassword && /* @__PURE__ */ jsx("p", {
								className: "errorText",
								children: errors.confirmPassword
							})
						]
					}),
					errors.general && /* @__PURE__ */ jsx("div", {
						className: "winnerBanner",
						children: errors.general
					}),
					/* @__PURE__ */ jsx("div", {
						className: "buttonRow",
						children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "uiButton",
							children: "Register"
						})
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "authSwitch",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/auth/login",
								children: "Login"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
//#region app/routes/register.tsx
var register_exports = /* @__PURE__ */ __exportAll({
	default: () => register_default,
	meta: () => meta
});
function meta() {
	return [{ title: "Register | Blackjack" }, {
		name: "description",
		content: "Create an account to play Blackjack."
	}];
}
var register_default = UNSAFE_withComponentProps(function Register() {
	return /* @__PURE__ */ jsx(RegisterPage, {});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-XEWlIQoU.js",
		"imports": ["/assets/jsx-runtime-DLpQItts.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-DZU35c2v.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js", "/assets/auth-BJr-PYFV.js"],
			"css": ["/assets/root-DTmsTa1v.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-CSm1kekb.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/leaderboard": {
			"id": "routes/leaderboard",
			"parentId": "root",
			"path": "leaderboard",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/leaderboard-CHsgZx4N.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/search": {
			"id": "routes/search",
			"parentId": "root",
			"path": "search",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/search-UamKONm4.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/login": {
			"id": "routes/login",
			"parentId": "root",
			"path": "/auth/login",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/login-CAbSLPIz.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js", "/assets/auth-BJr-PYFV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/register": {
			"id": "routes/register",
			"parentId": "root",
			"path": "/auth/register",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/register-B-0FtK7i.js",
			"imports": ["/assets/jsx-runtime-DLpQItts.js", "/assets/auth-BJr-PYFV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-9fc971d2.js",
	"version": "9fc971d2",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/leaderboard": {
		id: "routes/leaderboard",
		parentId: "root",
		path: "leaderboard",
		index: void 0,
		caseSensitive: void 0,
		module: leaderboard_exports
	},
	"routes/search": {
		id: "routes/search",
		parentId: "root",
		path: "search",
		index: void 0,
		caseSensitive: void 0,
		module: search_exports
	},
	"routes/login": {
		id: "routes/login",
		parentId: "root",
		path: "/auth/login",
		index: void 0,
		caseSensitive: void 0,
		module: login_exports
	},
	"routes/register": {
		id: "routes/register",
		parentId: "root",
		path: "/auth/register",
		index: void 0,
		caseSensitive: void 0,
		module: register_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
