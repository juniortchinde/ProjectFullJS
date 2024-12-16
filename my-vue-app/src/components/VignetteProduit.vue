<script setup lang="ts">

defineProps({
    nom:{
        type:String,
        required:true
    },
    prix:{
        type:Number,
        required:true
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },

})

</script>

<template>
    <div class="product-card">
        <div class="product-img">
            <img :src="image"/>
        </div>
        <div class="product-info">
            <h3> {{ nom }}</h3>
            <p class="product-description"> {{description}}</p>
            <p class="product-price"> {{ prix }} € </p>
        </div>
    </div>
</template>

<style scoped>

.product-card {
    display: flex;
    flex-direction: column;
    max-width: 240px;
    background: var(--background);
    max-height: 350px;
    border-radius: 7px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    color: var(--blue);
}

.product-img {
    width: 100%;
    height:200px;
    border-bottom: 1px solid #ddd;
}

.product-img img {
    width: 100%;
    height: 100%;
    object-fit: contain ;
}



.product-info h3 {
    font-size: 1.2rem;
    margin: .7rem .5rem;
    font-weight: 600;

}

.product-description {
    font-size: 1.1rem;
    font-weight: 400;
    margin: .7rem .5rem;

}
.product-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--red);
    margin: .7rem .5rem;

}


</style>