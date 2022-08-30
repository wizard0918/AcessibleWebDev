import Head from "next/head"
import Link from "next/link"
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5"
import { BsCircleHalf, BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "./Header.module.css"
import { useState, useRef } from "react";

interface ThemeSwitcherProps {
	setShowThemeSwitcher: (value: boolean) => void
}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
	const { setShowThemeSwitcher } = props;

	const setTheme = (theme: string) => {
		document.documentElement.className = theme
		localStorage.setItem("theme", theme)
		setShowThemeSwitcher(false)
	};

	const setThemeFromOS = () => {
		window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.className = "dark" : document.documentElement.className = "light"
		setShowThemeSwitcher(false)
		localStorage.removeItem("theme")
	};

	const theme = localStorage.getItem("theme")

	return (

		<ul className={styles.themeSwitcher} role="menu" id="themeSwitcherMenu" aria-labelledby="themeSwitcherBtn">
			<li role="menuitemradio" aria-checked={!theme} onClick={setThemeFromOS} onKeyDown={(e) => e.key === " " && setThemeFromOS()} tabIndex={0} className={!theme ? styles.activeBtn : ""}>
				<BsCircleHalf size="0.7rem" aria-hidden="true" className={styles.themeIcon} />Device settings</li>
			<li role="menuitemradio" aria-checked={theme === "light"} onClick={() => setTheme("light")} onKeyDown={(e) => e.key === " " && setTheme("light")} tabIndex={0} className={theme === "light" ? styles.activeBtn : ""}>
				<BsFillSunFill size="0.7rem" aria-hidden="true" className={styles.themeIcon} />Light mode</li>
			<li role="menuitemradio" aria-checked={theme === "dark"} onClick={() => setTheme("dark")} onKeyDown={(e) => e.key === " " && setTheme("dark")} tabIndex={0} className={theme === "dark" ? styles.activeBtn : ""} >
				<BsFillMoonFill size="0.7rem" aria-hidden="true" className={styles.themeIcon} />Dark mode</li>

		</ul>
	)
}

interface HeaderProps {
	pageTitle: string
	headerTitle: string
	handleNavClick: () => void
	showNavMobile: boolean
}

const Header = (props: HeaderProps) => {
	const { pageTitle, headerTitle, handleNavClick, showNavMobile } = props
	const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)

	const handleThemeSwitcher = () => {
		setShowThemeSwitcher(prevState => !prevState)
	}

	const handleThemeSwitcherKB = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === "ArrowDown" || e.key === "Down") {
			setShowThemeSwitcher(true)
		}
		if (e.key === "Esc" || e.key === "Escape") {
			setShowThemeSwitcher(false)
		}
	}

	const buttonRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Head>
				<title>{`${pageTitle} - Accessible Web Dev`}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<div className={styles.topBanner}>
					<Link href="/">Accessible Web Dev</Link>
					<div className={styles.buttonsContainer}>
						<button className={styles.themeBtn} ref={buttonRef} onClick={handleThemeSwitcher} onKeyDown={handleThemeSwitcherKB} type="button" id="themeSwitcherBtn" aria-haspopup="true" aria-controls="themeSwitcherMenu" aria-expanded={showThemeSwitcher}>
							<BsCircleHalf color="white" size="1rem" aria-hidden="true" />
							Theme
						</button>
						{showThemeSwitcher && <ThemeSwitcher setShowThemeSwitcher={setShowThemeSwitcher} />}
						<button className={styles.hamburgerBtn} onClick={handleNavClick} aria-label="Navigation menu" aria-expanded={showNavMobile} >
							{!showNavMobile && <IoMenuSharp color="white" size="2.5rem" aria-hidden="true" />}
							{showNavMobile && <IoCloseSharp color="white" size="2.5rem" aria-hidden="true" />}
						</button>
					</div>

				</div>
				<h1 className={styles.headerTitle}>Accessible {headerTitle}</h1>
			</header>
		</>
	)
}

export default Header
