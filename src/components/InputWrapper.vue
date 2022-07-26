<template>
<div class="input-wrapper">
    <slot>

    </slot>
</div>
</template>
<style lang="scss">
.input-wrapper { 
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 25%;

    & > select { 
        width: 90%;
    }
}
</style>