<template>
    <div class="toc-settings">
        <Button variant="quiet" iconOnly @click.native="toggle">
            <span class="wikit wikit-Icon wikit-Icon--medium wikit-Icon--base">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><title>settings</title><g transform="translate(10 10)"><path id="a" d="M1.5-10h-3l-1 6.5h5m0 7h-5l1 6.5h3"/><use transform="rotate(45)" xlink:href="#a"/><use transform="rotate(90)" xlink:href="#a"/><use transform="rotate(135)" xlink:href="#a"/></g><path d="M10 2.5a7.5 7.5 0 000 15 7.5 7.5 0 000-15v4a3.5 3.5 0 010 7 3.5 3.5 0 010-7"/></svg>
            </span>
        </Button>

        <div @click="toggle" :class="open ? 'toc-settings-overlay open' : 'toc-settings-overlay' "></div>

        <div v-show="open" class="toc-settings-modal">
            <div class="toc-settings-modal-header">
                <Button variant="quiet" iconOnly @click.native="toggle">
                    <Icon type="clear" color="inherit"></Icon>
                </Button>
                <h3>Table of Contents</h3>
                <Button @click.native="reload" variant="primary" type="progressive">Save</Button>
            </div>

            <div class="toc-settings-modal-content">
                <p>
                We are testing a new position for the table of contents.
                Please try out the diferent options below, and take a few days
                to sit with each. When you've formed an opinion about something
                please reach out to us via our talk page.
                </p>
                <form action="">
                    <Checkbox :checked.sync="tocStyles.tocExpandOnScroll" label="Expand section when I scroll to it"></Checkbox>
                    <Checkbox :checked.sync="tocStyles.tocExpandAll" label="Expand all sections by default"></Checkbox>
                    <Checkbox :checked.sync="tocStyles.tocNumbered" label="Number sections"></Checkbox>
                    <Checkbox :checked.sync="tocStyles.tocEllipses" label="Don't wrap section titles (use ellipses instead)"></Checkbox>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Icon, Checkbox } from '@wmde/wikit-vue-components';

const defaultTocStyles = {
    tocExpandOnScroll: false,
    tocExpandAll: false,
    tocNumbered: false,
    tocEllipses: false,
    tocDepth: 6
};

export default {
    name: "TocSettings",
    data() {
        const storedPreferences = window.localStorage.getItem( 'tocStyles' );
        return {
            open: false,
            tocStyles: JSON.parse( storedPreferences ) || defaultTocStyles
        }
    },
    components: { Button, Icon, Checkbox },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        reload() {
            location.reload();
        }
    },
    watch: {
        tocStyles: {
            deep: true,
            handler: function( updatedTocStyles ) {
                window.localStorage.setItem( 'tocStyles', JSON.stringify( updatedTocStyles ) );
            }
        },
    }
}
</script>

<style scoped>
@import '@wmde/wikit-vue-components/dist/wikit-vue-components.css';
.toc-settings {
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 3;
}

.toc-settings-overlay.open {
    background-color: rgb(255 255 255 / 82%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

}

.toc-settings-modal {
    position: fixed;
    top: 100px;
    left: calc( 50vw - 250px );
    width: 500px;
    min-height: 300px;
    background-color: white;
    border: 1px solid #a2a9b1;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 25%);
}

.toc-settings-modal-header {
    display: flex;
    padding: 6px;
    border-bottom: 1px solid rgb(162, 169, 177);
    text-align: center;
}

.toc-settings-modal-header h3 {
    flex-grow: 1;
}

.toc-settings-modal-content {
    font-size: 14px;
    padding: 12px 42px;
}

.wikit-checkbox {
    margin: 18px 0;
}

</style>