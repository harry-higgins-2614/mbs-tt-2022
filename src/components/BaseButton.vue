<template>
    <div class="button">
        <slot name="button-text"></slot>
    </div>
</template>
<style scoped lang="scss">
.button { 
    display: inline-flex; 
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    background-color: #ffffff; 
    color: #374151; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 500; 
    align-items: center; 
    border-radius: 0.375rem; 
    border-width: 1px; 
    border-color: #D1D5DB; 
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
    cursor: pointer;
    margin-top: 32px;

    &__error { 
        position: absolute;
    }

}
</style>