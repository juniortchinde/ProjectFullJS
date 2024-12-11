<script setup lang="ts">
import logo from'@/assets/logo.png'
import { AkFacebookFill } from '@kalimahapps/vue-icons';
import { FaBandsSquareXTwitter } from '@kalimahapps/vue-icons';
import { BsInstagram } from '@kalimahapps/vue-icons';
import { AkLinkedinBoxFill } from '@kalimahapps/vue-icons';
import pay1 from "@/assets/pay-01.png"
import pay2 from "@/assets/pay-02.png"
import pay3 from "@/assets/pay-03.png"
import pay4 from "@/assets/pay-04.png"
</script>

<template>
  <footer>
    <div class="footer-box">
      <img :src="logo" alt="">
      <div class="social">
        <AkLinkedinBoxFill></AkLinkedinBoxFill>
        <AkFacebookFill></AkFacebookFill>
        <BsInstagram />
        <FaBandsSquareXTwitter></FaBandsSquareXTwitter>
      </div>
    </div>

    <div class="footer-box">
      <h2>Nos services </h2>
      <li>
        <a href="#">Programme de fidélité</a>
      </li>
      <li>
        <a href="#">Livraison express</a>
      </li>
      <li>
        <a href="#">Services client</a>
      </li>
      <li>
        <a href="#">Conseils personnalisés</a>
      </li>
      <li>
        <a href="#">Suivi de Commande</a>
      </li>
    </div>
    <div class="footer-box">
      <h2>Decouvrer nous</h2>
      <li>
        <a href="#">Qui sommes nous?</a>
      </li>
      <li>
        <a href="#">Nous rejoindre</a>
      </li>
      <li>
        <a href="#">Blog</a>
      </li>
      <li>
        <a href="#">Nos engagements</a>
      </li>
    </div>
    <div class="footer-box">
      <h2>Nos produits</h2>
      <li>
        <a href="#">Carte de fidélité</a>
      </li>
      <li>
        <a href="#">Communauté en ligne</a>
      </li>
      <li>
        <a href="#">Boutique</a>
      </li>
      <li>
        <a href="#">Toutes nos marques</a>
      </li>
    </div>

    <div class="footer-box">
      <h2>Mentions légales </h2>
      <li>
        <a href="#">Conditions d'utilisation</a>
      </li>
      <li>
        <a href="#">Conditions générales de vente</a>
      </li>
      <li>
        <a href="#">Reférencement</a>
      </li>
      <li>
        <a href="#">Accéssibilité</a>
      </li>
    </div>
    <div class="footer-box">
      <h3>Payements</h3>
      <div class="payement">
        <img :src="pay1" alt="">
        <img :src="pay2" alt="">
        <img :src="pay3" alt="">
        <img :src="pay4" alt="">
      </div>
    </div>

  </footer>
</template>

<style scoped>


footer {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px, auto));
  gap: 1.5rem;
  padding: 50px 20px;
  color: var(--white);
  background: var(--blue2);
}

footer .social{
  display: flex;
  gap: 1.5rem;
  background: var(--blue2);
  color: var(--white);
  cursor: pointer;
  transition: background .2s ease-in-out;
  border-radius: 50%;
}
footer .social svg{
  width: 30px;
  height: 30px;
}


footer h2 {
  margin-bottom: 1rem;
  font-weight: 600;
}

footer a {
  color: var(--white);
}

footer a:hover {
  color: var(--blue)
}

footer img {
  width: 6rem;
  margin-bottom: 1rem;
}

</style>