<script setup lang="ts">
import {onMounted, ref } from 'vue';
import {useAuthStore}from"@/stores/authStore"
const baseUrl = import.meta.env.VITE_BASE_URL



// Déclare les variables réactives
const categories = ref<Array<{_id: string, catName: string}>>([]);
const title = ref<string>('');  // Nom
const price = ref<number>(0);  // Email
const description = ref<string>('');
const quantity = ref<number>(0);
const category = ref<string>('');
const images = ref<File[]>([]); // Liste des fichiers
const previews = ref<string[]>([]); // pour prévisualiser les images à uploader
const successMessage = ref<string>(''); // Message de succès
const errorMessage = ref<string>(''); // Message d'erreur

// Gère le téléchargement des fichiers

//
const handleFileSelection = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    files.forEach(file => {
      // Vérifie si c'est une image
      if (file.type.startsWith('image/')) {
        images.value.push(file);
        // Génère une URL pour la prévisualisation
        const reader = new FileReader();
        reader.onload = (e) => {
          previews.value.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
  }
};

// Supprimer une image de la liste
const removeImage = (index: number) => {
  images.value.splice(index, 1);
  previews.value.splice(index, 1);
};



// recuperer les categories
async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/category/getAllCategories` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    if (!data.error) {
      categories.value = data.categories;
    }
  }
  catch (error) {
    console.error(error);
  }
}

// Soumet le formulaire
const submitForm = async () => {
  try {

    const authStore = useAuthStore()
    // Crée un FormData
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('price', price.value.toString());
    formData.append('description', description.value);
    formData.append('category', category.value);
    formData.append('quantity', quantity.value.toString());

    // Ajoute chaque fichier sélectionné à FormData

    images.value.forEach(image => {
      formData.append('images', image); // Le nom "files[]" est utilisé pour que le backend reconnaisse un tableau de fichiers
    });

    // rafraichir le token avant d'envoyer la requête
      await authStore.refreshToken();
    // Envoi de la requête via fetch
    const response = await fetch(`${baseUrl}/product/addProduct`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
      body: formData
    });
    const data = await response.json();
    if (data.error) {
      errorMessage.value = "non autorisé";
    }
    else {
        successMessage.value = "Produit ajouté avec succès";
    }

  } catch (error) {
    // Si une erreur se produit, on affiche un message d'erreur
    errorMessage.value = 'Erreur lors de l\'envoi du formulaire.';
    successMessage.value = '';
    console.error('Erreur :', error);
  }
};
onMounted(() =>{
  getCategories();
})

</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-item">
      <label for="name">Nom du produit :</label>
      <input type="text" id="title" v-model="title" required />
    </div>
   <div class="form-item">
    <label for="description">Description :</label>
    <input type="textarea" id="description" v-model="description" required />

   </div>

    <div class="form-item">
    <label for="price">Prix :</label>
    <input type="number" id="price" v-model="price" required />

    </div>

    <div class="form-item">

    <label for="quantity">Quantité :</label>
    <input type="number" id="quantity" v-model="quantity" required />
    </div>

    <div class="form-item">
      <label for="category">Catégorie :</label>
      <select v-model="category" id="category">
        <option v-for="category in categories":key="category._id" >{{ category.catName }}</option>
      </select>
    </div>

    <div class="form-image">
      <label for="images" class="upload-label"> Ajouter vos images</label>
      <input type="file" id="images" @change="handleFileSelection" multiple accept="image/"  hidden=""/>
    </div>

    <div v-if="previews.length" class="preview-container">
      <div v-for="(image, index) in previews" :key="index" class="preview">
        <img :src="image" :alt="'Preview ' + index" />
        <button @click="removeImage(index)">Supprimer</button>
      </div>
    </div>
    <button class="submit-button" type="submit">Envoyer</button>
  </form>

  <!-- Messages de statut -->
  <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
  <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
</template>



<style scoped>
.form-container {
  max-width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
}
.form-item input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 7px;
  border: solid 1px var(--border);
}
.form-item select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 7px;
  border: solid 1px var(--border);
}
.form-container button {
  align-self: center;
  padding: 0.7rem;
  margin-top: 1rem;
  border-radius: 7px;
  background: var(--blue);
  color: var(--white);
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}
.form-container .submit-button{
  width: 80%;
}
  .preview-container {
    display: flex;
    gap: 1rem;
  }
  .preview {
    width: 150px;
    height: 200px;
    position: relative;
    display: inline-block;
  }

  .preview img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    border: 2px solid #ccc;
    border-radius: 5px;
  }

.upload-label {
  display: flex;
  width: 25%;
  border-radius: 7px;
  padding: 10px;
  background-color: var(--border);
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.upload-label:hover {
  background-color: var(--icons);
}


</style>
