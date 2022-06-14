<template>
    <div class="">
        <h1>Oops!</h1>
        <h2 class="">La {{ resource }} que vous cherchez n'existe pas :/</h2>
        <router-link to="/welcome" class="text-green-500">
        Retournez à l'accueil
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        resource: {
            type: String,
            required: true,
            default: 'page'
        }
    }
}
</script>