<template>
    <div class="toc-wrapper toc-depth-4">
        <div class="toc-header header">
          <p class="contents-title" data-stringname="contentsString">Contents</p>
        </div>
        <ul id="table-of-contents" class="level-1">
          <li class="toc-level-1 active" onclick="showChildren(this)">
            <a href="#top">
              <div class="toctext" data-stringname="introductionString"><span class="tocnumb">0</span>Introduction</div>
            </a>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Early_life">
              <div class="toctext">
                <span class="tocnumb">1</span>Early life
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Middle_period">
              <div class="toctext">
                <span class="tocnumb">2</span>Middle period
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Later_life">
              <div class="toctext">
                <span class="tocnumb">3</span>Later life
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Selected_works">
              <div class="toctext">
                <span class="tocnumb">4</span>Selected works
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Influences_on_art_and_culture">
              <div class="toctext">
                <span class="tocnumb">5</span>Influences on art and culture
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Notes">
              <div class="toctext">
                <span class="tocnumb">6</span>Notes
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#References">
              <div class="toctext">
                <span class="tocnumb">7</span>References
              </div>
            </a>
            <ul class="level-2"></ul>
          </li>

          <li class="toc-level-1 parent" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#Further_reading">
              <div class="toctext">
                <span class="tocnumb">8</span>Further reading
              </div>
            </a>
            <ul class="level-2">
          <li class="toc-level-2">
          <a href="#General_biography">
          <div class="toctext">
          <span class="tocnumb">8.1</span>General biography
          </div>
          </a>
          <ul class="level-3"></ul>
          </li>

          <li class="toc-level-2">
          <a href="#Specific_works_of_art">
          <div class="toctext">
          <span class="tocnumb">8.2</span>Specific works of art
          </div>
          </a>
          <ul class="level-3"></ul>
          </li>

          <li class="toc-level-2">
          <a href="#Art_monographs">
          <div class="toctext">
          <span class="tocnumb">8.3</span>Art monographs
          </div>
          </a>
          <ul class="level-3"></ul>
          </li>
        </ul>
          </li>

          <li class="toc-level-1 parent" onclick="showChildren(this)">
            <span onclick="arrowToggle(this)"></span>
            <a href="#External_links">
              <div class="toctext">
                <span class="tocnumb">9</span>External links
              </div>
            </a>
            <ul class="level-2">
          <li class="toc-level-2">
          <a href="#Prints">
          <div class="toctext">
          <span class="tocnumb">9.1</span>Prints
          </div>
          </a>
          <ul class="level-3"></ul>
          </li>

          <li class="toc-level-2">
          <a href="#Biographies">
          <div class="toctext">
          <span class="tocnumb">9.2</span>Biographies
          </div>
          </a>
          <ul class="level-3"></ul>
          </li>
        </ul>
          </li>
        </ul>
      </div>
</template>

<style lang="scss">
// -------------------------------
// T A B L E  O F  C O N T E N T S
// -------------------------------

.page-container {
  // if the sidebar is showing hide the ToC
  // &.show-sidebar {
  //   .toc-wrapper { opacity: 0; }
  // }
  .toc-wrapper {
    min-width: 200px;
    max-width: 200px;
    height: fit-content;
    max-height: 90vh;
    margin: 50px 40px 0 10px;
    position: sticky;
    top: 22px;
    overflow: scroll;
    background: #F8F9FA;
    border-radius: 4px;
    padding: 5px 5px 16px 20px;
    transition: all 300ms;

    // make scrollbar always show
    &::-webkit-scrollbar { -webkit-appearance: none; }
    &::-webkit-scrollbar:vertical { width: 11px; }
    &::-webkit-scrollbar:horizontal { height: 11px; }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 2px solid white; /* should match background, can't be transparent */
      background-color: rgba(0, 0, 0, .40);
    }

    .toc-header {
      padding: 12px;
      justify-content: start;
      padding-left: 0;
      padding-left: 10px;

      .contents-title {

      }
      .contents-show { display: none; }
      .contents-hide { display: block; }

      .contents-title {
        font-weight: bold;
        font-size: 16px;
        margin: 0;
      }
      .contents-show, .contents-hide {
        color: #3366cc;
        cursor: pointer;
        margin: 0;
        padding: 0 0 2px 7px;
        font-size: 13px;
      }
      .contents-hide {
        display: none;
      }
    }

    ul {
      font-size: 14px;
      list-style-type: none;
      margin: 0;
      line-height: 18px;
      padding-right: 5px;

      li {

        &.active {
          font-weight: bold;
        }

        &.toc-level-1 {
          padding-left: 10px;
          a { color: #3366cc }
          li { display: none; }
          &.show-children li { display: block; }
          &.parent {
            span {
              position: absolute;
              content: "";
              width: 0;
              height: 0;
              border-bottom: 5px solid transparent;  /* left arrow slant */
              border-top: 5px solid transparent; /* right arrow slant */
              border-left: 5px solid #000000; /* bottom, add background color here */
              font-size: 0;
              line-height: 0;
              left: -2px;
              top: 4px;
              cursor: pointer;
            }
          }
          &.parent.show-children span {
            transform: rotate(90deg);
          }
          position: relative;
        }
        &.toc-level-2 {
          // margin-left: 5px;
          font-weight: normal;
          a {
            color: black !important;
          }
        }
        &.toc-level-3 { margin-left: 8px; }
        &.toc-level-4 { margin-left: 16px; }

        a {
          transition: all 300ms;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .tocnumb {
        display: none;
        margin-right: 5px;
        color: black;
        font-weight: normal;
      }
      .toctext { padding-bottom: 5px; }
    }
  }
}
</style>