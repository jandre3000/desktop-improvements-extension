<template>
  <div class="vector-user-links">
    <nav
      id="p-personal-more"
      class="
        mw-portlet mw-portlet-personal-more
        vector-menu vector-user-menu-more
      "
      aria-labelledby="p-personal-more-label"
      role="navigation"
    >
      <div class="vector-menu-content">
        <ul class="vector-menu-content-list">
          <li
            v-html="listItem.innerHTML"
            v-bind:class="listItem.className"
            v-bind:id="listItem.id"
            v-for="listItem in moreMenuListItems"
            v-bind:key="listItem.id"
          />
        </ul>
      </div>
    </nav>

    <nav
      id="p-personal"
      class="
        mw-portlet mw-portlet-personal
        vector-user-menu vector-menu vector-menu-dropdown
      "
      aria-labelledby="p-personal-label"
      role="navigation"
    >
      <input
        type="checkbox"
        class="vector-menu-checkbox"
        aria-labelledby="p-personal-label"
      />
      <h3
        id="p-personal-label"
        class="vector-menu-heading mw-ui-icon mw-ui-icon-element"
      >
        <span>Personal menu</span>
      </h3>
      <div class="vector-menu-content">
        <div
          class="vector-user-menu-login"
          v-html="loginLink.outerHTML"
          v-if="isAnon"
        ></div>
        <div class="vector-user-menu-anon-editor" v-if="isAnon">
          <p>
            Pages for logged out editors (<a href="/wiki/Help:Introduction"
              >learn more</a
            >):
          </p>
        </div>

        <ul class="vector-menu-content-list">
          <li
            v-for="listItem in dropdownListItems"
            v-bind:id="listItem.id"
            v-bind:key="listItem.length"
            v-html="listItem.outerHTML"
          />
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="less">
@import "./userLinks.less";
</style>

<script>
export default {
  props: {
    oldDom: {
      type: DocumentFragment,
      required: true,
    },
  },
  setup(props) {
    const isAnon = !!props.oldDom.querySelector("#pt-anonuserpage");
    const listItemsNodeList = props.oldDom.querySelectorAll("li");
    const [...listItems] = listItemsNodeList;
    const moreMenuListItems = [];
    const dropdownListItems = [];
    let userPageLink;
    let loginLink;

    function addToDropdownMenuWithIcon(linkEl, iconName) {
      linkEl.classList.add(
        "mw-ui-icon",
        "mw-ui-icon-before",
        `mw-ui-icon-wikimedia-${iconName}`
      );
      dropdownListItems.push(linkEl);
    }

    for (const listItem of listItems) {
      const id = listItem.id;
      const link = listItem.querySelector("a");

      switch (id) {
        case "pt-anontalk":
          addToDropdownMenuWithIcon(link, "userTalk");
          break;
        case "pt-anoncontribs":
          addToDropdownMenuWithIcon(link, "userContributions");
          break;
        case "pt-mytalk":
          addToDropdownMenuWithIcon(link, "userTalk");
          break;
        case "pt-preferences":
          addToDropdownMenuWithIcon(link, "settings");
          break;
        case "pt-betafeatures":
          addToDropdownMenuWithIcon(link, "unStar");
          break;
        case "pt-watchlist":
          addToDropdownMenuWithIcon(link, "unStar");
          break;
        case "pt-sandbox":
          // remove sandbocx from dropdown.
          break;
        case "pt-mycontris":
          addToDropdownMenuWithIcon(link, "userContributions");
          break;
        case "pt-logout":
          addToDropdownMenuWithIcon(link, "logOut");
          break;
        case "ca-talk-alert":
          moreMenuListItems.push(listItem);
          break;
        case "pt-notifications-alert":
          moreMenuListItems.push(listItem);
          break;
        case "pt-notifications-notice":
          moreMenuListItems.push(listItem);
          break;
        case "pt-userpage":
          userPageLink = link;
          break;
        case "pt-createaccount":
          listItem.classList.add("vector-user-links-createaccount");
          link.classList.add("mw-ui-button", "mw-ui-quiet");
          moreMenuListItems.push(listItem);
          break;

        case "pt-login":
          loginLink = link;
          break;

        default:
          if (link) {
            dropdownListItems.push(link);
          }
      }
    }

    return {
      props,
      isAnon,
      moreMenuListItems,
      loginLink,
      dropdownListItems,
      listItems,
    };
  },
};
</script>