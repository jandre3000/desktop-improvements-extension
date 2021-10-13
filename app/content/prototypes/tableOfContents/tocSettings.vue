<template>
    <div class="toc-settings">
        <Button variant="quiet" iconOnly @click.native="toggle">
            <Icon type="info" size="medium"></Icon>
        </Button>

        <div @click="toggle" :class="open ? 'toc-settings-overlay open' : 'toc-settings-overlay' "></div>

        <div v-show="open" class="toc-settings-modal">
            <div class="toc-settings-modal-header">
                <Button variant="quiet" iconOnly @click.native="toggle">
                    <Icon type="clear" color="inherit"></Icon>
                </Button>
                <h3>Table of Contents</h3>
                <Button variant="primary" type="progressive">Save</Button>
            </div>

            <div class="toc-settings-modal-content">
                <p>
                We are testing a new position for the table of contents.
                Please try out the diferent options below, and take a few days
                to sit with each. When you've formed an opinion about something
                please reach out to us via our talk page: <a href="#">link to talk page</a>.
                </p>
                <form action="">
                    <Checkbox label="Expand section when I scroll to it"></Checkbox>
                    <Checkbox label="Expand all sections by default"></Checkbox>
                    <Checkbox label="Number sections"></Checkbox>
                    <Checkbox label="Don't wrap section titles (use ellipses instead)"></Checkbox>
                    <Checkbox label="Show table of contents on Talk pages"></Checkbox>
                    <Checkbox label="Show table of contents in editing mode"></Checkbox>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Icon, Checkbox } from '@wmde/wikit-vue-components';

export default {
    name: "TocSettings",
    data() {
        return {
            open: false
        }
    },
    components: { Button, Icon, Checkbox },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    }
}
</script>

<style scoped>
@import '@wmde/wikit-vue-components/dist/wikit-vue-components.css';
.toc-settings {
    float: right;
    position: relative;
    z-index: 1;
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