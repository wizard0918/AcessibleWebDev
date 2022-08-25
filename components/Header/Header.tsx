import Head from "next/head"
import Link from "next/link"
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5"
import { BsCircleHalf, BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "./Header.module.css"
import { useState } from "react";

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

	return (
		<div className={styles.themeSwitcher} id="themeSwitcherMenu" role="menu" aria-labelledby="themeSwitcherBtn">
			<button role="menuitem" onClick={setThemeFromOS}><BsCircleHalf size="0.8rem" aria-hidden="true" />OS settings</button>
			<button role="menuitem" onClick={() => setTheme("light")}><BsFillSunFill size="0.8rem" aria-hidden="true" />Light</button>
			<button role="menuitem" onClick={() => setTheme("dark")} ><BsFillMoonFill size="0.8rem" aria-hidden="true" />Dark</button>
		</div>
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
						<button className={styles.themeBtn} onClick={handleThemeSwitcher} onKeyDown={handleThemeSwitcherKB} type="button" id="themeSwitcherBtn" aria-haspopup="true" aria-controls="themeSwitcherMenu" aria-expanded={showThemeSwitcher}>
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
