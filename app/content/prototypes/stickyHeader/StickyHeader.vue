<template>
	<header ref="header">
		<div class="header">
			<!-- l o g g e d  o u t -->
			<div class="header-left logged-out">
				<a class="button logo-icon">
					<img src="@app/images/w.svg">
				</a>
				<a class="button search-icon" onclick="toggleStickySearch()">
					<img src="@app/images/search.svg">
				</a>
				<div class="subheader">
					<p class="article-title-subheader">
						{{ title }}
					</p>
				</div>
			</div>
			<div class="header-right logged-out">
				<div class="subheader">
					<a class="button">
						<img src="@app/images/edit.svg">
						<span>Edit</span>
					</a>
					<div class="languages-container">
						<a class="button gray" @click="toggleLanguageMenu">
							<img src="@app/images/languages.svg">
							<span data-stringname="languagebuttonString">
								{{ langLength }} Languages
							</span>
							<img src="@app/images/down.svg">
						</a>
						<ul v-show="languageMenuExpanded"
							ref="langMenu"
							class="floating-menu">
							<li>Español</li>
							<a href="https://di-language-switcher.web.app/Pain.html"><li class="french">Français</li></a>
							<li>한국어</li>
							<li>Bahasa Indonesia</li>
							<li>Italiano</li>
							<li>Português</li>
							<li>Русский</li>
							<li>Tiếng Việt</li>
							<li>中文</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- l o g g e d  i n -->
			<div class="header-left logged-in">
				<a class="button logo-icon">
					<img src="@app/images/w.svg">
				</a>
				<a class="button search-icon" onclick="toggleStickySearch()">
					<img src="@app/images/search.svg">
				</a>
				<p class="article-title-subheader">
					Romania
				</p>
				<div class="link-group page-tool-links">
					[ <a href="">Talk</a> |
					<a href="">History</a> |
					<a href="">Watch</a> ]
				</div>
			</div>
			<div class="header-right logged-in">
				<div class="link-group edit-tool-links">
					[ <a href="">Edit</a> |
					<a href="">Edit source</a> ]
				</div>
				<a class="button">
					<span>Page tools</span>
					<img src="@app/images/down.svg">
				</a>
				<div>
					<a class="button" :click="toggleLanguageMenu">
						<img src="@app/images/languages.svg">
						<span>95 languages</span>
						<img src="@app/images/down.svg">
					</a>
					<ul v-show="languageMenuExpanded"
						class="floating-menu">
						<li>Español</li>
						<a href="https://di-language-switcher.web.app/Pain.html"><li class="french">Français</li></a>
						<li>한국어</li>
						<li>Bahasa Indonesia</li>
						<li>Italiano</li>
						<li>Português</li>
						<li>Русский</li>
						<li>Tiếng Việt</li>
						<li>中文</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import Headroom from 'headroom.js';
export default {
	data: function () {
		return {
			languageMenuExpanded: false,
			title: '',
			langLength: 0
		};
	},
	methods: {
		toggleLanguageMenu() {
			this.languageMenuExpanded = !this.languageMenuExpanded;
		}
	},
	mounted: function () {
		const headroom = new Headroom( this.$refs.header );
		headroom.init();

		const langList = document.querySelectorAll( '#p-lang .vector-menu-content-list li' );
		const tmpList = document.createDocumentFragment();
		langList.forEach( ( i ) => tmpList.appendChild( i ) );
		this.$refs.langMenu.innerHTML = '';
		this.$refs.langMenu.appendChild( tmpList );
		this.langLength = langList.length;

		this.title = document.querySelector( '#firstHeading' ).textContent;

	}
};
</script>

<style scoped>
@import './base.css';
@import './usermenu.css';
@import './search.css';

header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 250ms linear;
}
header .header {
  padding: 10px 25px;
}
header .header .header-left .search-icon {
  margin: 0 6px;
  cursor: pointer;
}
header .header .header-left .article-title-subheader {
  margin: 0px 5px;
  padding-left: 20px;
  border-left: 1px solid #cccccc;
  font-size: 18px;
  font-weight: bold;
}
header .header .header-left .page-tool-links {
  margin: 3px 0 0 10px;
}
header .header .subheader {
  display: flex;
  align-items: center;
  opacity: 0;
  transition: all 150ms linear;
}
header .header .logged-in {
  display: none;
}
header:hover .header {
  background-color: #fffffff7;
  border-bottom: 1px solid #eeeeee;
}
header:hover .subheader {
  opacity: 1;
}
header.headroom--top {
  opacity: 0;
  transform: translateY(-100%);
}
header.headroom--not-top.headroom--unpinned {
  opacity: 1;
  transform: translateY(0%);
}
header.headroom--not-top.headroom--pinned {
  opacity: 1;
  transform: translateY(0%);
}
header.headroom--not-top.headroom--pinned .header {
  background-color: #fffffff7;
  border-bottom: 1px solid #eeeeee;
}
header.headroom--not-top.headroom--pinned .subheader {
  opacity: 1;
}
header.logged-in {
  background-color: #fffffff7;
  border-bottom: 1px solid #EAECF0;
}
header.logged-in .header {
  padding: 5px 25px;
}
header.logged-in .header .logged-in {
  display: flex;
}
header.logged-in .header .logged-out {
  display: none;
}
</style>
