<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { 
  margin:0; padding:0; 
} 
body:before {
  content: ' ';
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("/src/assets/musiclist/listbg.png") no-repeat;
  background-size: 100% auto;
  /* background: rgba(0, 0, 0, 0.9); */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
}
p,h1,h2,h3,h4,h5,h6 {
    font-size:100% !important;   
    font-weight:normal !important;
}

.clearfix::before {
    content: '\0020';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix::after {
    content: '\0020';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
</style>
