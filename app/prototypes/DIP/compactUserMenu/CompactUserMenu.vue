<template>
	<div class="user-links-container logged-out visible">
		<a class="button gray" :href="loginButton.link">
			<span data-stringname="signUpString"> {{ loginButton.text }} </span>
		</a>
		<a id="loggedOutUserMenuButton"
			class="button"
			@click="toggleUserMenu">
			<img src="@app/images/user.svg">
			<img src="@app/images/down.svg">
		</a>
		<ul v-if="userMenuActive" class="floating-menu logged-out">
			<li>
				<a :href="anonTalk.link">{{ anonTalk.text }}</a>
			</li>
			<li>
				<a :href="anonContribs.link">{{ anonContribs.text }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		oldDom: {}
	},
	data() {
		return {
			userMenuActive: false,
			loginButton: {
				text: '',
				link: ''
			},
			anonTalk: {
				text: '',
				link: ''
			},
			anonContribs: {
				text: '',
				link: ''
			},
			dropdownMenuItems: []
		};
	},
	methods: {
		generateItemsFromDom( domList ) {
			this.loginButton = {
				text: domList.querySelector( '#pt-createaccount' ).textContent + ' / ' + domList.querySelector( '#pt-login' ).textContent,
				link: domList.querySelector( '#pt-login a' ).href
			};
			this.anonTalk = {
				text: domList.querySelector( '#pt-anontalk' ).textContent,
				link: domList.querySelector( '#pt-anontalk a' ).href
			};
			this.anonContribs = {
				text: domList.querySelector( '#pt-anoncontribs' ).textContent,
				link: domList.querySelector( '#pt-anoncontribs a' ).href
			};
		},
		toggleUserMenu() {
			this.userMenuActive = !this.userMenuActive;
		}
	},
	mounted() {
		this.generateItemsFromDom( this.oldDom );
	}
};
</script>

<style>
#p-personal ul.vector-menu-content-list {
    display: none;
}
</style>

<style scoped>
@import "../stickyHeader/base.css";

div.site-header .header-right {
  margin: 0 0 0 40px;
  align-items: flex-start;
}
.user-links-container {
  display: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}
.user-links-container a:first-child,
.user-links-container a:nth-child(2) {
  margin-right: 5px;
}
.user-links-container.visible {
  display: flex;
}
.user-links-container ul.logged-out {
  top: 55px;
  right: 4px;
}
.user-links-container ul.logged-in {
  top: 55px;
  right: 7px;
  width: 135px;
}
.user-links-container ul.logged-in li:first-child {
  padding-top: 10px;
}
.user-links-container ul.logged-in li:last-child {
  border-top: 1px solid #cccccc;
  padding: 10px 15px 8px 15px;
}
</style>
