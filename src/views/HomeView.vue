<template>
  <div class="containerPage">
    <header class="header">
      <nav class="navbar">
        <img src="../assets/images/logo-frenet.png" alt="" />
        <div>
          <router-link to="/">Simule seu Frete</router-link>
          <router-link to="/about">Parceiros</router-link>
        </div>
      </nav>
      <h1 class="title-header">Simular Frete</h1>
    </header>
    <main class="freight-main">
      <section class="freight-card">
        <h2 class="card-subtitle">Calculadora de Fretes Simplificada</h2>
        <p class="card-description">Faça sua cotação nas principais transportadoras do país</p>

        <div class="freight-content">
          <FreightForm class="form-freight" />
          <div class="image-box">
            <boxImage />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import boxImage from "../assets/images/box.vue";
import FreightForm from "@/components/FreightForm.vue";
</script>
<style lang="scss" scoped>
.containerPage {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16rem 1fr;
  height: 100%;
  overflow-y: auto;
  opacity: 0;
  animation: fadeIn 1s forwards;
  will-change: opacity, transform;

  .header {
    position: relative;
    grid-area: 1 / 1 / 2 / 2;
    height: 100%;
    background: url("../assets/images/background.jpeg") no-repeat center center;
    background-size: cover;
    animation: slideDown 1s ease-out forwards;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(1px);
      z-index: 1;
    }

    .navbar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6rem;
      display: flex;
      align-items: center;
      padding: 0.5rem 20px;
      z-index: 10;
      background-color: rgba(17, 17, 17, 0.1);

      img {
        width: 75px;
        height: auto;
      }

      a {
        color: white;
        text-decoration: none;
        padding: 10px;
        transition: background-color 0.3s ease, width 0.3s ease;
      }

      a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        width: 5rem;
        border-bottom: 1px solid orange;
      }
    }

    .title-header {
      position: absolute;
      bottom: 4rem;
      left: 10%;
      color: white;
      font-size: 2.5rem;
      z-index: 2;
    }
  }

  .freight-main {
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
    opacity: 0;
    animation: fadeInMain 1s 1s forwards;

    .freight-card {
      z-index: 100;
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.23);
      padding: 15px;
      width: 80%;
      max-width: 1140px;
      min-height: 25rem;
      margin-top: 2rem;

      .card-description,
      .card-subtitle {
        display: flex;
        justify-content: center;
      }

      .freight-content {
        display: grid;
        grid-template-columns: 1fr repeat(auto-fit, minmax(20rem, 1fr));
        grid-column-gap: 0;

        .form-freight {
          grid-area: 1 / 1 / 2 / 2;
        }

        .image-box {
          grid-area: 1 / 2 / 2 / 3;
          width: 75%;
          margin-left: auto;
        }
      }
    }
  }

  .p-floatlabel {
    height: 2.3rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeInMain {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 799px) {
  .containerPage .freight-main .freight-card .freight-content {
    grid-template-columns: 1fr;
  }

  .containerPage .freight-main .title-header {
    bottom: 6rem;
  }

  .containerPage .freight-main .freight-card {
    margin-top: -3.2rem;
    width: 95%;
  }

  .containerPage .freight-main .freight-form {
    width: 100%;
    flex-wrap: wrap;
  }

  .containerPage .freight-main .image-box {
    display: none;
  }

  .containerPage .freight-main .cep-address,
  .containerPage .freight-main .dimensions,
  .containerPage .freight-main .freight-form {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
