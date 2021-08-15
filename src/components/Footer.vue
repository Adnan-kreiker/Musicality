<template>

<footer class="footer grid gap-2">
  <div class="footer__addr col-span-2">
    <h1 class="footer__logo">Musicality</h1>
  </div>

  <ul class="footer__nav block col-span-10">
    <li class="nav__item">
      <h2 class="nav__title">Media</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Online</a>
        </li>

        <li>
          <a href="#">Print</a>
        </li>

        <li>
          <a href="#">Alternative Ads</a>
        </li>
      </ul>
    </li>

    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Company</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">What is Musicality?</a>
        </li>

        <li>
          <a href="#">Partners</a>
        </li>

        <li>
          <a href="#">Careers</a>
        </li>

        <li>
          <a href="#">Press</a>
        </li>
      </ul>
    </li>

    <li class="nav__item">
      <h2 class="nav__title">Account</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Sign Up</a>
        </li>

        <li>
          <a href="#">Redeem Voucher</a>
        </li>

        <li>
          <a href="#">Redeem Giftcard</a>
        </li>
      </ul>
    </li>
  </ul>

  <div class="legal col-span-12 text-center">
    <p>&copy; 2021. All rights reserved.</p>
  </div>
</footer>
</template>

<script>
export default {

};
</script>

<style scoped>
*, *:before, *:after {
  box-sizing: border-box;
}

.footer {
  /* display: flex;
  flex-flow: row wrap; */
  padding: 30px 30px 20px 30px;
  color: white;
  background-color: black;
}

/* .footer > * {
  flex:  1 100%;
} */

.footer__logo {
  font-weight: 500;
  font-size: 2rem;
}

.nav__title {
  font-weight: 400;
  font-size: 15px;
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer li {
  line-height: 2em;
}

.footer a {
  text-decoration: none;
}

.footer a:hover{
  color: #20d862;
}
.footer__nav {
  display: flex;
  margin-top: 4rem;
  margin-left: 1rem;
  margin-bottom: 2.5rem;
  justify-content: center;
}

.nav__ul a {
  color: #999;
}

@media screen and (min-width: 40.375em) {
  .footer__nav > * {
    flex: 1;
  }

  .footer__nav {
    flex: 2 0px;
  }
}

</style>
