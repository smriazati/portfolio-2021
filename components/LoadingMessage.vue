<template>
    <div class="loading-page-wrapper">
        <span id="loading-page"></span>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            count: 0,
            countCycles: 0
        }
    }
}
</script>

<style lang="scss">

#loading-page {
    margin-top: 33px;
    display: block;
    position: relative;
    &::before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        animation: loading .5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
        font-size: 10rem;
        line-height: 10rem;
        display: block;
    }
}

@keyframes loading {
    0% {
        content: 'L';
        color: black;
    }
    15% {
        content: 'LO';
    }
    30% {
        content: 'LOA';
    }
    45% {
        content: 'LOAD';
    }
    60% {
        content: 'LOADI';
    }
    75% {
        content: 'LOADIN';
    }
    100% {
        content: 'LOADING';
        color: white;
    }
}


</style>